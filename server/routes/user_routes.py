from flask import Blueprint
from flask import jsonify

from models.admin import Admin
from utils.serializers import admin_to_dict


user_bp = Blueprint('users', __name__)


@user_bp.route('/users/admins', methods=['GET'])
def get_all_admins():
    admins = Admin.query.all()

    return jsonify([
        admin_to_dict(admin)
        for admin in admins
    ])