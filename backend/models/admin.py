from datetime import datetime
from models import db


class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(50), default='ADMIN')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def is_superadmin(self):
        return self.role == 'SUPERADMIN'