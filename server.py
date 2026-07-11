"""AERO research server: static files, balanced assignment, and real record storage."""
from __future__ import annotations

import argparse
import csv
import io
import json
import os
import secrets
import threading
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent / "geo_"
DATA_DIR = Path(__file__).resolve().parent / "research_data"
DATA_FILE = DATA_DIR / "records.json"
LOCK = threading.RLock()
SEQUENCES = [list("abcd"), list("bcda"), list("cdab"), list("dabc")]
ADMIN_TOKEN = os.environ.get("AERO_ADMIN_TOKEN", "").strip()


def load_store() -> dict:
    if not DATA_FILE.exists():
        return {"next_assignment": 0, "assignments": {}, "records": {}}
    with DATA_FILE.open("r", encoding="utf-8") as stream:
        data = json.load(stream)
    return {
        "next_assignment": int(data.get("next_assignment", 0)),
        "assignments": dict(data.get("assignments", {})),
        "records": dict(data.get("records", {})),
    }


def save_store(store: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temp = DATA_FILE.with_suffix(".tmp")
    with temp.open("w", encoding="utf-8") as stream:
        json.dump(store, stream, ensure_ascii=False, indent=2)
        stream.flush()
        os.fsync(stream.fileno())
    temp.replace(DATA_FILE)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def json_body(self) -> dict:
        length = min(int(self.headers.get("Content-Length", "0")), 2_000_000)
        return json.loads(self.rfile.read(length).decode("utf-8")) if length else {}

    def send_json(self, value, status=HTTPStatus.OK):
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def is_admin(self) -> bool:
        # A researcher opening the dashboard on the server computer can use it
        # without a password. Remote access still requires an explicit token.
        if self.client_address[0] in {"127.0.0.1", "::1"}:
            return True
        supplied = self.headers.get("X-Admin-Token", "")
        return bool(ADMIN_TOKEN) and secrets.compare_digest(supplied, ADMIN_TOKEN)

    def do_POST(self):
        if urlparse(self.path).path != "/api/assign":
            return self.send_error(HTTPStatus.NOT_FOUND)
        try:
            participant_id = str(self.json_body().get("participant_id", "")).strip()
            if not participant_id or len(participant_id) > 100:
                return self.send_json({"error": "invalid participant_id"}, HTTPStatus.BAD_REQUEST)
            with LOCK:
                store = load_store()
                assignment = store["assignments"].get(participant_id)
                if assignment is None:
                    number = store["next_assignment"]
                    remainder = number % 4
                    assignment = {
                        "assignment_number": number,
                        "remainder_group": remainder,
                        "sequence": SEQUENCES[remainder],
                        "assigned_at": datetime.now(timezone.utc).isoformat(),
                    }
                    store["assignments"][participant_id] = assignment
                    store["next_assignment"] = number + 1
                    save_store(store)
            self.send_json(assignment)
        except (ValueError, json.JSONDecodeError):
            self.send_json({"error": "invalid request"}, HTTPStatus.BAD_REQUEST)

    def do_PUT(self):
        if urlparse(self.path).path != "/api/records":
            return self.send_error(HTTPStatus.NOT_FOUND)
        try:
            record = self.json_body()
            participant_id = str(record.get("currentSessionLog", {}).get("participant_id", "")).strip()
            if not participant_id:
                return self.send_json({"error": "missing participant_id"}, HTTPStatus.BAD_REQUEST)
            with LOCK:
                store = load_store()
                if participant_id not in store["assignments"]:
                    return self.send_json({"error": "participant has no server assignment"}, HTTPStatus.CONFLICT)
                expected = store["assignments"][participant_id]
                if int(record.get("remainderGroup", -1)) != expected["remainder_group"]:
                    return self.send_json({"error": "assignment mismatch"}, HTTPStatus.CONFLICT)
                record["server_received_at"] = datetime.now(timezone.utc).isoformat()
                record["assignment_verified"] = True
                store["records"][participant_id] = record
                save_store(store)
            self.send_json({"ok": True})
        except (ValueError, TypeError, json.JSONDecodeError):
            self.send_json({"error": "invalid record"}, HTTPStatus.BAD_REQUEST)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/admin/records":
            if not self.is_admin():
                return self.send_json({"error": "unauthorized"}, HTTPStatus.UNAUTHORIZED)
            with LOCK:
                store = load_store()
                records = list(store["records"].values())
                assignments = list(store["assignments"].values())
            assignment_counts = [0, 0, 0, 0]
            for assignment in assignments:
                remainder = int(assignment.get("remainder_group", -1))
                if 0 <= remainder < 4:
                    assignment_counts[remainder] += 1
            return self.send_json({
                "records": records,
                "summary": {
                    "assigned_participants": len(assignments),
                    "recorded_participants": len(records),
                    "assignment_counts": assignment_counts,
                },
            })
        if path == "/api/admin/export.csv":
            if not self.is_admin():
                return self.send_json({"error": "unauthorized"}, HTTPStatus.UNAUTHORIZED)
            with LOCK:
                records = list(load_store()["records"].values())
            fields = ["participant_id", "remainder_group", "sequence", "progress", "received_at", "record_json"]
            output = io.StringIO()
            writer = csv.DictWriter(output, fieldnames=fields)
            writer.writeheader()
            for record in records:
                writer.writerow({
                    "participant_id": record.get("currentSessionLog", {}).get("participant_id", ""),
                    "remainder_group": record.get("remainderGroup", ""),
                    "sequence": "→".join(record.get("sequence", [])),
                    "progress": record.get("progressStage", ""),
                    "received_at": record.get("server_received_at", ""),
                    "record_json": json.dumps(record, ensure_ascii=False),
                })
            body = ("\ufeff" + output.getvalue()).encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", "attachment; filename=aero-research-data.csv")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return self.wfile.write(body)
        return super().do_GET()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    print(f"Participant: http://{args.host}:{args.port}/AERO.html")
    print(f"Researcher:  http://{args.host}:{args.port}/research-admin.html")
    ThreadingHTTPServer((args.host, args.port), Handler).serve_forever()
