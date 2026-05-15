from flask import Blueprint, jsonify, request

from middleware.auth_middleware import admin_required
from models import db
from models.category import Category

category_bp = Blueprint('categories', __name__)


@category_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()

    return jsonify([
        {
            "id": c.id,
            "name": c.name
        }
        for c in categories
    ])


@category_bp.route('/categories', methods=['POST'])
@admin_required()
def create_category():
    data = request.json

    if not data or not data.get("name"):
        return jsonify({"message": "name is required"}), 400

    category = Category(name=data["name"])

    db.session.add(category)
    db.session.commit()

    return jsonify({
        "id": category.id,
        "name": category.name
    })


@category_bp.route('/categories/<int:id>', methods=['DELETE'])
@admin_required()
def delete_category(id):
    category = Category.query.get(id)

    if not category:
        return jsonify({"message": "not found"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "deleted"})