from flask import Blueprint
from flask import jsonify
from flask import request

from models import db
from models.city import City
from models.city_name import CityName
from models.category import Category

from middleware.auth_middleware import admin_required
from utils.serializers import city_to_dict


city_bp = Blueprint('cities', __name__)


@city_bp.route('/cities', methods=['GET'])
def get_all_cities():
    cities = City.query.all()

    return jsonify([
        city_to_dict(city)
        for city in cities
    ])


@city_bp.route('/cities/<int:id>', methods=['GET'])
def get_city_by_id(id):
    city = City.query.get(id)

    if not city:
        return jsonify({
            'message': 'City not found'
        }), 404

    return jsonify(city_to_dict(city))


@city_bp.route('/cities', methods=['POST'])
@admin_required()
def create_city():
    data = request.json

    city = City(
        image_url=data.get('imageUrl'),
        short_desc=data.get('shortDesc'),
        long_desc=data.get('longDesc'),
        contribution=data.get('contribution'),
        latitude=data.get('coordinates')[0],
        longitude=data.get('coordinates')[1]
    )

    db.session.add(city)
    db.session.flush()

    names = data.get('names', [])

    for name in names:
        city_name = CityName(
            value=name,
            city_id=city.id
        )

        db.session.add(city_name)

    categories = data.get('categories', [])

    for category_id in categories:
        category = Category.query.get(category_id)

        if category:
            city.categories.append(category)

    db.session.commit()

    return jsonify({
        'message': 'City created'
    })


@city_bp.route('/cities/<int:id>', methods=['PUT'])
@admin_required()
def update_city(id):
    city = City.query.get(id)

    if not city:
        return jsonify({
            'message': 'City not found'
        }), 404

    data = request.json

    city.image_url = data.get('imageUrl')
    city.short_desc = data.get('shortDesc')
    city.long_desc = data.get('longDesc')
    city.contribution = data.get('contribution')
    city.latitude = data.get('coordinates')[0]
    city.longitude = data.get('coordinates')[1]

    CityName.query.filter_by(city_id=city.id).delete()

    names = data.get('names', [])

    for name in names:
        city_name = CityName(
            value=name,
            city_id=city.id
        )

        db.session.add(city_name)

    city.categories.clear()

    categories = data.get('categories', [])

    for category_id in categories:
        category = Category.query.get(category_id)

        if category:
            city.categories.append(category)

    db.session.commit()

    return jsonify({
        'message': 'City updated'
    })


@city_bp.route('/cities/<int:id>', methods=['DELETE'])
@admin_required()
def delete_city(id):
    city = City.query.get(id)

    if not city:
        return jsonify({
            'message': 'City not found'
        }), 404

    db.session.delete(city)
    db.session.commit()

    return jsonify({
        'message': 'City deleted'
    })


@city_bp.route('/cities/<int:city_id>/categories', methods=['POST'])
@admin_required()
def add_categories_to_city(city_id):
    data = request.json

    category_ids = data.get("category_ids", [])

    city = City.query.get(city_id)

    if not city:
        return jsonify({"message": "City not found"}), 404

    if not category_ids:
        return jsonify({"message": "No categories provided"}), 400

    for cat_id in category_ids:
        category = Category.query.get(cat_id)
        if category and category not in city.categories:
            city.categories.append(category)

    db.session.commit()

    return jsonify({
        "message": "Categories added to city",
        "city_id": city.id,
        "categories": [c.id for c in city.categories]
    })


@city_bp.route('/cities/<int:city_id>/categories/<int:cat_id>', methods=['DELETE'])
@admin_required()
def remove_category_from_city(city_id, cat_id):

    city = City.query.get(city_id)
    if not city:
        return jsonify({"message": "City not found"}), 404

    category = Category.query.get(cat_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404

    if category in city.categories:
        city.categories.remove(category)
        db.session.commit()

    return jsonify({
        "message": "Category removed from city"
    })