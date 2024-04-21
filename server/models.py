from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    admin = db.Column(db.Boolean)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError()
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    serialize_rules = (
        '-products.category',
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    products = db.relationship('Product', back_populates='category')

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    serialize_rules = (
        '-category.products',
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    phorest_name = db.Column(db.String)
    vish_name = db.Column(db.String)

    category = db.relationship('Category', back_populates='products')