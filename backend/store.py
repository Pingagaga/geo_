from __future__ import annotations

import json
import os
import threading
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Protocol

SEQUENCES = [list("abcd"), list("bcda"), list("cdab"), list("dabc")]

class Store(Protocol):
    def assign(self, participant_id: str) -> dict[str, Any]: ...
    def put_record(self, participant_id: str, record: dict[str, Any]) -> None: ...
    def get_assignment(self, participant_id: str) -> dict[str, Any] | None: ...
    def list_records(self) -> list[dict[str, Any]]: ...
    def assignment_counts(self) -> tuple[int, list[int]]: ...

class JsonStore:
    """Development-only storage compatible with the original server."""
    def __init__(self, path: Path):
        self.path, self.lock = path, threading.RLock()

    def _load(self) -> dict[str, Any]:
        if not self.path.exists():
            return {"next_assignment": 0, "assignments": {}, "records": {}}
        return json.loads(self.path.read_text(encoding="utf-8"))

    def _save(self, data: dict[str, Any]) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temp = self.path.with_suffix(".tmp")
        temp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        temp.replace(self.path)

    def assign(self, participant_id: str) -> dict[str, Any]:
        with self.lock:
            data = self._load()
            existing = data["assignments"].get(participant_id)
            if existing:
                return existing
            number = int(data.get("next_assignment", 0))
            remainder = number % 4
            assignment = {"assignment_number": number, "remainder_group": remainder, "sequence": SEQUENCES[remainder], "assigned_at": datetime.now(timezone.utc).isoformat()}
            data["assignments"][participant_id] = assignment
            data["next_assignment"] = number + 1
            self._save(data)
            return assignment

    def put_record(self, participant_id: str, record: dict[str, Any]) -> None:
        with self.lock:
            data = self._load(); data["records"][participant_id] = record; self._save(data)

    def get_assignment(self, participant_id: str) -> dict[str, Any] | None:
        with self.lock: return self._load()["assignments"].get(participant_id)

    def list_records(self) -> list[dict[str, Any]]:
        with self.lock: return list(self._load()["records"].values())

    def assignment_counts(self) -> tuple[int, list[int]]:
        with self.lock: assignments = list(self._load()["assignments"].values())
        counts = [0, 0, 0, 0]
        for item in assignments:
            remainder = int(item.get("remainder_group", -1))
            if 0 <= remainder < 4: counts[remainder] += 1
        return len(assignments), counts

class FirestoreStore:
    def __init__(self, project: str):
        from google.cloud import firestore
        self.firestore, self.client = firestore, firestore.Client(project=project)
        # Avoid a local request burst hammering the same counter document. The
        # Firestore transaction below remains the cross-process safety layer.
        self.assignment_lock = threading.Lock()

    def assign(self, participant_id: str) -> dict[str, Any]:
        with self.assignment_lock:
            return self._assign_transaction(participant_id)

    def _assign_transaction(self, participant_id: str) -> dict[str, Any]:
        counter_ref = self.client.collection("system").document("assignment_counter")
        assignment_ref = self.client.collection("assignments").document(participant_id)
        # The assignment counter is intentionally a single serialization point.
        # A study invitation can create short bursts, so allow more contention
        # retries than the client library's default of five attempts.
        transaction = self.client.transaction(max_attempts=20)
        @self.firestore.transactional
        def allocate(txn):
            current = assignment_ref.get(transaction=txn)
            if current.exists: return current.to_dict()
            counter = counter_ref.get(transaction=txn)
            number = int((counter.to_dict() or {}).get("next_assignment", 0)) if counter.exists else 0
            remainder = number % 4
            assignment = {"assignment_number": number, "remainder_group": remainder, "sequence": SEQUENCES[remainder], "assigned_at": self.firestore.SERVER_TIMESTAMP}
            txn.set(assignment_ref, assignment); txn.set(counter_ref, {"next_assignment": number + 1}, merge=True)
            return {**assignment, "assigned_at": None}
        result = allocate(transaction)
        if result.get("assigned_at") is not None: result["assigned_at"] = result["assigned_at"].isoformat()
        return result

    def put_record(self, participant_id: str, record: dict[str, Any]) -> None:
        self.client.collection("records").document(participant_id).set(record)

    def get_assignment(self, participant_id: str) -> dict[str, Any] | None:
        item = self.client.collection("assignments").document(participant_id).get()
        return item.to_dict() if item.exists else None

    def list_records(self) -> list[dict[str, Any]]:
        return [item.to_dict() for item in self.client.collection("records").stream()]

    def assignment_counts(self) -> tuple[int, list[int]]:
        counts, total = [0, 0, 0, 0], 0
        for item in self.client.collection("assignments").stream():
            total += 1; remainder = int(item.to_dict().get("remainder_group", -1))
            if 0 <= remainder < 4: counts[remainder] += 1
        return total, counts

def create_store() -> Store:
    backend = os.getenv("AERO_STORAGE", "json").lower()
    if backend == "firestore":
        project = os.getenv("GOOGLE_CLOUD_PROJECT", "").strip()
        if not project: raise RuntimeError("GOOGLE_CLOUD_PROJECT is required with AERO_STORAGE=firestore")
        return FirestoreStore(project)
    root = Path(__file__).resolve().parents[1]
    return JsonStore(Path(os.getenv("AERO_JSON_PATH", root / "research_data" / "records.json")))
