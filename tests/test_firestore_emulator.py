import os
import unittest
import uuid
from concurrent.futures import ThreadPoolExecutor

from backend.store import FirestoreStore


@unittest.skipUnless(os.getenv("FIRESTORE_EMULATOR_HOST"), "Firestore Emulator is not running")
class FirestoreEmulatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if os.getenv("GOOGLE_CLOUD_PROJECT") != "demo-aero":
            raise RuntimeError("Integration tests only run against GOOGLE_CLOUD_PROJECT=demo-aero")
        cls.store = FirestoreStore("demo-aero")
        cls.run_id = uuid.uuid4().hex

    def participant(self, index):
        return f"test-{self.run_id}-{index}"

    def test_01_same_participant_keeps_assignment(self):
        participant = self.participant("same")
        first = self.store.assign(participant)
        second = self.store.assign(participant)
        self.assertEqual(first["assignment_number"], second["assignment_number"])
        self.assertEqual(first["remainder_group"], second["remainder_group"])

    def test_02_twenty_concurrent_assignments_are_unique_and_balanced(self):
        participants = [self.participant(index) for index in range(20)]
        with ThreadPoolExecutor(max_workers=10) as pool:
            assignments = list(pool.map(self.store.assign, participants))
        numbers = [item["assignment_number"] for item in assignments]
        self.assertEqual(20, len(set(numbers)))
        counts = [sum(item["remainder_group"] == group for item in assignments) for group in range(4)]
        self.assertLessEqual(max(counts) - min(counts), 1)

    def test_03_record_round_trip(self):
        participant = self.participant("record")
        assignment = self.store.assign(participant)
        record = {"participant_id": participant, "remainder_group": assignment["remainder_group"], "answer": 5}
        self.store.put_record(participant, record)
        matches = [item for item in self.store.list_records() if item.get("participant_id") == participant]
        self.assertEqual([record], matches)
