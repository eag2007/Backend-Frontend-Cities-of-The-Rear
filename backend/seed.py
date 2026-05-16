import os
import bcrypt
from models import db
from models.admin import Admin


def create_superadmin():
    existing = Admin.query.filter_by(role='SUPERADMIN').first()

    if existing:
        return

    username = os.getenv("SUPERADMIN_USERNAME", "superadmin")
    email = os.getenv("SUPERADMIN_EMAIL", "admin@system.local")
    password = os.getenv("SUPERADMIN_PASSWORD", "SuperSecret123!")

    hashed = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    admin = Admin(
        username=username,
        email=email,
        password_hash=hashed.decode('utf-8'),
        role="SUPERADMIN"
    )

    db.session.add(admin)
    db.session.commit()

    print("SUPERADMIN CREATED")
    print("EMAIL:", email)