import os
import tempfile
import unittest
from unittest.mock import patch

from backend.settings import load_settings


class ProductionSettingsTests(unittest.TestCase):
    def production_env(self, credential_path):
        return {
            "AERO_ENV": "production",
            "AERO_STORAGE": "firestore",
            "AERO_SERVE_FRONTEND": "false",
            "GOOGLE_CLOUD_PROJECT": "aero-research-prod",
            "GOOGLE_APPLICATION_CREDENTIALS": credential_path,
            "AERO_ADMIN_TOKEN": "x" * 40,
            "AERO_ALLOWED_ORIGINS": "https://aero.example.org",
            "AERO_MAX_BODY_BYTES": "1000000",
            "AERO_RATE_LIMIT_PER_MINUTE": "60",
        }

    def test_valid_production_environment(self):
        with tempfile.NamedTemporaryFile() as credential:
            with patch.dict(os.environ, self.production_env(credential.name), clear=True):
                settings = load_settings()
        self.assertTrue(settings.production)
        self.assertFalse(settings.serve_frontend)

    def test_production_rejects_emulator(self):
        with tempfile.NamedTemporaryFile() as credential:
            values = self.production_env(credential.name)
            values["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080"
            with patch.dict(os.environ, values, clear=True):
                with self.assertRaisesRegex(RuntimeError, "must not define FIRESTORE_EMULATOR_HOST"):
                    load_settings()

    def test_production_rejects_weak_admin_token(self):
        with tempfile.NamedTemporaryFile() as credential:
            values = self.production_env(credential.name)
            values["AERO_ADMIN_TOKEN"] = "short"
            with patch.dict(os.environ, values, clear=True):
                with self.assertRaisesRegex(RuntimeError, "at least 32"):
                    load_settings()
