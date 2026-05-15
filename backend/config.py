import os
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_DIR = os.path.join(BASE_DIR, "database")
os.makedirs(DB_DIR, exist_ok=True)


class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(DB_DIR, "db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "CHANGE_ME")
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=24)