from models import db


class CityName(db.Model):
    __tablename__ = 'city_names'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    value = db.Column(db.String(255), nullable=False)
    city_id = db.Column(
        db.Integer,
        db.ForeignKey('cities.id')
    )