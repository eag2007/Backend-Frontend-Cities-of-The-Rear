from models import db


city_categories = db.Table(
    'city_categories',

    db.Column(
        'city_id',
        db.Integer,
        db.ForeignKey('cities.id')
    ),

    db.Column(
        'category_id',
        db.Integer,
        db.ForeignKey('categories.id')
    )
)


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)