from __future__ import annotations

import csv
import io
import json
import secrets
import threading
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .settings import load_settings
from .store import create_store

settings = load_settings()
app = FastAPI(title="AERO Research API", version="1.1.0", docs_url=None if settings.production else "/docs", redoc_url=None)
store = create_store()
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.allowed_origins),
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "OPTIONS"],
    allow_headers=["Content-Type", "X-Admin-Token"],
)


class MinuteRateLimiter:
    def __init__(self, limit: int):
        self.limit = limit
        self.requests: dict[str, deque[float]] = defaultdict(deque)
        self.lock = threading.Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self.lock:
            bucket = self.requests[key]
            while bucket and bucket[0] <= now - 60:
                bucket.popleft()
            if len(bucket) >= self.limit:
                return False
            bucket.append(now)
            return True


limiter = MinuteRateLimiter(settings.rate_limit_per_minute)


@app.middleware("http")
async def security_middleware(request: Request, call_next):
    if request.url.path in {"/api/assign", "/api/records"}:
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                if int(content_length) > settings.max_body_bytes:
                    return JSONResponse({"detail": "request body too large"}, status_code=413)
            except ValueError:
                return JSONResponse({"detail": "invalid content-length"}, status_code=400)
        client_key = request.client.host if request.client else "unknown"
        if not limiter.allow(f"{client_key}:{request.url.path}"):
            return JSONResponse({"detail": "rate limit exceeded"}, status_code=429, headers={"Retry-After": "60"})
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store" if request.url.path.startswith("/api/") else response.headers.get("Cache-Control", "no-cache")
    return response


class AssignmentRequest(BaseModel):
    participant_id: str


def checked_participant_id(value: str) -> str:
    value = value.strip()
    if not value or len(value) > 100:
        raise HTTPException(400, "invalid participant_id")
    return value


def require_admin(token: str) -> None:
    if not settings.admin_token or not secrets.compare_digest(token, settings.admin_token):
        raise HTTPException(401, "unauthorized")


def validate_record(record: dict[str, Any]) -> None:
    encoded = json.dumps(record, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    if len(encoded) > settings.max_body_bytes:
        raise HTTPException(413, "record too large")
    if len(record) > 100:
        raise HTTPException(400, "too many record fields")


@app.get("/health")
def health():
    return {"ok": True, "environment": settings.environment, "storage": settings.storage}


@app.post("/api/assign")
def assign(payload: AssignmentRequest):
    return store.assign(checked_participant_id(payload.participant_id))


@app.put("/api/records")
def put_record(record: dict[str, Any]):
    validate_record(record)
    pid = checked_participant_id(str(record.get("currentSessionLog", {}).get("participant_id", "")))
    expected = store.get_assignment(pid)
    if expected is None:
        raise HTTPException(409, "participant has no server assignment")
    if int(record.get("remainderGroup", -1)) != int(expected["remainder_group"]):
        raise HTTPException(409, "assignment mismatch")
    record.update(server_received_at=datetime.now(timezone.utc).isoformat(), assignment_verified=True)
    store.put_record(pid, record)
    return {"ok": True}


@app.get("/api/admin/records")
def admin_records(x_admin_token: str = Header(default="")):
    require_admin(x_admin_token)
    records = store.list_records()
    assigned, counts = store.assignment_counts()
    return {"records": records, "summary": {"assigned_participants": assigned, "recorded_participants": len(records), "assignment_counts": counts}}


@app.get("/api/admin/export.csv")
def export_csv(x_admin_token: str = Header(default="")):
    require_admin(x_admin_token)
    output = io.StringIO()
    fields = ["participant_id", "remainder_group", "sequence", "progress", "received_at", "record_json"]
    writer = csv.DictWriter(output, fieldnames=fields)
    writer.writeheader()
    for record in store.list_records():
        writer.writerow({"participant_id": record.get("currentSessionLog", {}).get("participant_id", ""), "remainder_group": record.get("remainderGroup", ""), "sequence": ">".join(record.get("sequence", [])), "progress": record.get("progressStage", ""), "received_at": record.get("server_received_at", ""), "record_json": json.dumps(record, ensure_ascii=False)})
    return Response("\ufeff" + output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=aero-research-data.csv"})


frontend = Path(__file__).resolve().parents[1] / "geo_"
if settings.serve_frontend:
    app.mount("/", StaticFiles(directory=frontend, html=True), name="frontend")
