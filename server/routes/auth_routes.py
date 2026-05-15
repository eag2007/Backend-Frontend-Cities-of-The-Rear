import bcrypt

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from middleware.auth_middleware import admin_required
from models import db
from models.admin import Admin

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/auth/login', methods=['POST'])
def login_admin():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    admin = Admin.query.filter_by(email=email).first()

    if not admin:
        return jsonify({"message": "Invalid credentials"}), 401

    is_valid = bcrypt.checkpw(
        password.encode('utf-8'),
        admin.password_hash.encode('utf-8')
    )

    if not is_valid:
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=str(admin.id))

    return jsonify({
        "username": admin.username,
        "email": admin.email,
        "role": admin.role,
        "token": token
    })


@auth_bp.route('/auth/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()

    admin = Admin.query.get(int(user_id))

    if not admin:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "id": admin.id,
        "username": admin.username,
        "email": admin.email,
        "role": admin.role
    })


@auth_bp.route('/auth/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_account(id):
    current_user_id = int(get_jwt_identity())

    current_user = Admin.query.get(current_user_id)

    if not current_user:
        return jsonify({"message": "User not found"}), 404

    # только супер-админ или сам себя может удалить
    if current_user.role != "SUPERADMIN" and current_user_id != id:
        return jsonify({"message": "Forbidden"}), 403

    admin = Admin.query.get(id)

    if not admin:
        return jsonify({"message": "Admin not found"}), 404

    db.session.delete(admin)
    db.session.commit()

    return jsonify({"message": "Account deleted"})


@auth_bp.route('/admin/create', methods=['POST'])
@admin_required(superadmin_only=True)
def create_admin():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    existing = Admin.query.filter_by(email=email).first()
    if existing:
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    admin = Admin(
        username=username,
        email=email,
        password_hash=hashed_password.decode('utf-8'),
        role="ADMIN"
    )

    db.session.add(admin)
    db.session.commit()

    return jsonify({
        "message": "Admin created",
        "id": admin.id
    })