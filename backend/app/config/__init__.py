import os
from pathlib import Path


def _database_path():
    raw_path = os.getenv("DATABASE_PATH", "/app/data/bolao.db")
    path = Path(raw_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-key-with-at-least-32-characters")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-jwt-secret-key-with-at-least-32-characters")
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{_database_path().as_posix()}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost,http://localhost:80,http://localhost:3000").split(",") if origin.strip()]
