from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse


def _csv(name: str, default: str = "") -> tuple[str, ...]:
    return tuple(value.strip().rstrip("/") for value in os.getenv(name, default).split(",") if value.strip())


@dataclass(frozen=True)
class Settings:
    environment: str
    storage: str
    project: str
    emulator_host: str
    admin_token: str
    allowed_origins: tuple[str, ...]
    max_body_bytes: int
    rate_limit_per_minute: int
    serve_frontend: bool

    @property
    def production(self) -> bool:
        return self.environment == "production"


def load_settings() -> Settings:
    environment = os.getenv("AERO_ENV", "development").strip().lower()
    settings = Settings(
        environment=environment,
        storage=os.getenv("AERO_STORAGE", "json").strip().lower(),
        project=os.getenv("GOOGLE_CLOUD_PROJECT", "").strip(),
        emulator_host=os.getenv("FIRESTORE_EMULATOR_HOST", "").strip(),
        admin_token=os.getenv("AERO_ADMIN_TOKEN", "").strip(),
        allowed_origins=_csv("AERO_ALLOWED_ORIGINS", "http://localhost:8000,http://127.0.0.1:8000"),
        max_body_bytes=int(os.getenv("AERO_MAX_BODY_BYTES", "1000000")),
        rate_limit_per_minute=int(os.getenv("AERO_RATE_LIMIT_PER_MINUTE", "60")),
        serve_frontend=os.getenv("AERO_SERVE_FRONTEND", "true").strip().lower() in {"1", "true", "yes"},
    )
    validate_settings(settings)
    return settings


def validate_settings(settings: Settings) -> None:
    if settings.environment not in {"development", "test", "production"}:
        raise RuntimeError("AERO_ENV must be development, test, or production")
    if not 10_000 <= settings.max_body_bytes <= 2_000_000:
        raise RuntimeError("AERO_MAX_BODY_BYTES must be between 10000 and 2000000")
    if not 1 <= settings.rate_limit_per_minute <= 600:
        raise RuntimeError("AERO_RATE_LIMIT_PER_MINUTE must be between 1 and 600")
    if not settings.production:
        return
    if settings.storage != "firestore":
        raise RuntimeError("Production requires AERO_STORAGE=firestore")
    if settings.emulator_host:
        raise RuntimeError("Production must not define FIRESTORE_EMULATOR_HOST")
    if not settings.project or settings.project.startswith("demo-"):
        raise RuntimeError("Production requires a non-demo GOOGLE_CLOUD_PROJECT")
    if len(settings.admin_token) < 32:
        raise RuntimeError("Production AERO_ADMIN_TOKEN must contain at least 32 characters")
    if not settings.allowed_origins:
        raise RuntimeError("Production requires AERO_ALLOWED_ORIGINS")
    for origin in settings.allowed_origins:
        parsed = urlparse(origin)
        if parsed.scheme != "https" or not parsed.netloc or parsed.path not in {"", "/"}:
            raise RuntimeError("Production origins must be exact HTTPS origins without paths")
        if parsed.hostname in {"localhost", "127.0.0.1"}:
            raise RuntimeError("Production origins must not contain localhost")
    credential_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "").strip()
    if not credential_path:
        raise RuntimeError("Production requires GOOGLE_APPLICATION_CREDENTIALS")
    if not Path(credential_path).is_file():
        raise RuntimeError("GOOGLE_APPLICATION_CREDENTIALS does not point to a readable secret file")
