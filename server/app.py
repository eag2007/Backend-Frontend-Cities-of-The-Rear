from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config

from models import db

from routes.auth_routes import auth_bp
from routes.city_routes import city_bp
from routes.user_routes import user_bp
from routes.category_routes import category_bp


app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

jwt = JWTManager(app)

db.init_app(app)


with app.app_context():
    db.create_all()


app.register_blueprint(auth_bp)
app.register_blueprint(city_bp)
app.register_blueprint(user_bp)
app.register_blueprint(category_bp)


@app.route('/')
def home():
    return {
        'message': 'Cities of The Rear API'
    }


if __name__ == '__main__':
    app.run(debug=True)