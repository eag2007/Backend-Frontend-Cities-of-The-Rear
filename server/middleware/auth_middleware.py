from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models.admin import Admin


def admin_required(superadmin_only=False):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            try:
                verify_jwt_in_request()
            except Exception:
                return jsonify({'message': 'Unauthorized'}), 401

            user_id = get_jwt_identity()
            admin = Admin.query.get(user_id)

            if not admin:
                return jsonify({'message': 'User not found'}), 404

            if superadmin_only and admin.role != 'SUPERADMIN':
                return jsonify({'message': 'Forbidden'}), 403

            return fn(*args, **kwargs)

        return decorator
    return wrapper