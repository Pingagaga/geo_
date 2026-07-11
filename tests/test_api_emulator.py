import os
import unittest
import uuid


@unittest.skipUnless(os.getenv("FIRESTORE_EMULATOR_HOST"), "Firestore Emulator is not running")
class ApiEmulatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if os.getenv("GOOGLE_CLOUD_PROJECT") != "demo-aero":
            raise RuntimeError("API integration tests only run against demo-aero")
        from fastapi.testclient import TestClient
        from backend.app import app
        cls.client = TestClient(app)

    def test_full_participant_and_admin_flow(self):
        participant = f"api-test-{uuid.uuid4().hex}"
        health = self.client.get("/health")
        self.assertEqual(200, health.status_code)

        assigned = self.client.post("/api/assign", json={"participant_id": participant})
        self.assertEqual(200, assigned.status_code)
        assignment = assigned.json()

        record = {
            "currentSessionLog": {"participant_id": participant},
            "remainderGroup": assignment["remainder_group"],
            "sequence": assignment["sequence"],
            "progressStage": "test",
        }
        saved = self.client.put("/api/records", json=record)
        self.assertEqual(200, saved.status_code)
        self.assertTrue(saved.json()["ok"])

        self.assertEqual(401, self.client.get("/api/admin/records").status_code)
        admin = self.client.get("/api/admin/records", headers={"X-Admin-Token": "test-admin-token"})
        self.assertEqual(200, admin.status_code)
        self.assertTrue(any(item.get("currentSessionLog", {}).get("participant_id") == participant for item in admin.json()["records"]))
        self.assertEqual(200, self.client.get("/AERO.html").status_code)

    def test_rejects_oversized_record(self):
        response = self.client.put("/api/records", content=b"x" * 1_000_001, headers={"Content-Type": "application/json"})
        self.assertEqual(413, response.status_code)
