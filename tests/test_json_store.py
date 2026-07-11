import tempfile
import unittest
from pathlib import Path

from backend.store import JsonStore


class JsonStoreTests(unittest.TestCase):
    def test_assignment_is_idempotent_and_balanced(self):
        with tempfile.TemporaryDirectory() as directory:
            store = JsonStore(Path(directory) / "records.json")
            first = store.assign("participant-0")
            self.assertEqual(first, store.assign("participant-0"))
            for index in range(1, 8):
                store.assign(f"participant-{index}")
            self.assertEqual((8, [2, 2, 2, 2]), store.assignment_counts())

    def test_record_round_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            store = JsonStore(Path(directory) / "records.json")
            store.put_record("participant", {"answer": 1})
            store.put_record("participant", {"answer": 2})
            self.assertEqual([{"answer": 2}], store.list_records())
