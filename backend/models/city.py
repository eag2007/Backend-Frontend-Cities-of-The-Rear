from datetime import datetime

from models import db
from models.category import city_categories


class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_url = db.Column(db.String)
    short_desc = db.Column(db.Text)
    long_desc = db.Column(db.Text)
    contribution = db.Column(db.Text)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    names = db.relationship(
        'CityName',
        backref='city',
        cascade='all, delete'
    )
    categories = db.relationship(
        'Category',
        secondary=city_categories,
        lazy='subquery',
        backref=db.backref('cities', lazy=True)
    )