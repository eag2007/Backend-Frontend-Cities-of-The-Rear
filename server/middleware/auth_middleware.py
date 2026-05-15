from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request

    
def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            try:
                verify_jwt_in_request()
            except Exception:
                return jsonify({
                    'message': 'Unauthorized'
                }), 401

            return fn(*args, **kwargs)

        return decorator

    return wrapper