import bcrypt

from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token

from models import db
from models.admin import Admin

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/auth/register', methods=['POST'])
def register_admin():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    existing_user = Admin.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            'message': 'Email already exists'
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    admin = Admin(
        username=username,
        email=email,
        password_hash=hashed_password.decode('utf-8')
    )

    db.session.add(admin)
    db.session.commit()

    token = create_access_token(identity=admin.id)

    return jsonify({
        'username': admin.username,
        'email': admin.email,
        'role': admin.role,
        'token': token
    })


@auth_bp.route('/auth/login', methods=['POST'])
def login_admin():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    admin = Admin.query.filter_by(email=email).first()

    if not admin:
        return jsonify({
            'message': 'Invalid credentials'
        }), 401

    is_valid = bcrypt.checkpw(
        password.encode('utf-8'),
        admin.password_hash.encode('utf-8')
    )

    if not is_valid:
        return jsonify({
            'message': 'Invalid credentials'
        }), 401

    token = create_access_token(identity=admin.id)

    return jsonify({
        'username': admin.username,
        'email': admin.email,
        'role': admin.role,
        'token': token
    })


@auth_bp.route('/auth/delete/<int:id>', methods=['DELETE'])
def delete_account(id):
    admin = Admin.query.get(id)

    if not admin:
        return jsonify({
            'message': 'Admin not found'
        }), 404

        db.session.delete(admin)
        db.session.commit()

        return jsonify({
            'message': 'Account deleted'
        })
    return None
