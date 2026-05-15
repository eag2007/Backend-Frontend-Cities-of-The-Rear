from models.city import City
from models.admin import Admin


def city_to_dict(city: City):
    return {
        'id': city.id,
        'names': [name.value for name in city.names],
        'imageUrl': city.image_url,
        'shortDesc': city.short_desc,
        'longDesc': city.long_desc,
        'contribution': city.contribution,
        'categories': [category.id for category in city.categories],
        'coordinates': [
            city.latitude,
            city.longitude
        ]
    }



def admin_to_dict(admin: Admin):
    return {
        'id': admin.id,
        'username': admin.username,
        'email': admin.email,
        'role': admin.role,
        'createdAt': admin.created_at.isoformat()
    }