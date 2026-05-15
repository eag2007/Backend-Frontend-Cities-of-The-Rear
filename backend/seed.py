import bcrypt
from models import db
from models.admin import Admin

def create_superadmin():
    existing = Admin.query.filter_by(role='SUPERADMIN').first()

    if existing:
        return

    password = "SuperSecret123!"  # потом можешь убрать в ENV

    hashed = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    admin = Admin(
        username="superadmin",
        email="admin@system.local",
        password_hash=hashed.decode('utf-8'),
        role="SUPERADMIN"
    )

    db.session.add(admin)
    db.session.commit()

    print("SUPERADMIN CREATED")
    print("EMAIL: admin@system.local")
    print("PASSWORD: SuperSecret123!")