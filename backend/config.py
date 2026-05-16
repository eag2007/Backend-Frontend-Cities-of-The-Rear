import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "sslmode": "require"
        }
    }

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "CHANGE_ME"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)