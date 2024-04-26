from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = (
        '-_password_hash', 
        '-orders.user'
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    admin = db.Column(db.Boolean)
    _password_hash = db.Column(db.String)

    orders = db.relationship('Order', back_populates='user')

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

    serialize_rules = (
        '-orders.location',
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    orders = db.relationship('Order', back_populates='location')

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
        '-product_orders.product'
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    phorest_name = db.Column(db.String)
    vish_name = db.Column(db.String)

    category = db.relationship('Category', back_populates='products')
    product_orders = db.relationship('ProductOrder', back_populates='product')

    orders = association_proxy('product_orders', 'order',
                              creator=lambda order_obj: ProductOrder(order=order_obj))
    
    def create_product_order(self, order_id, quantity):
        return ProductOrder(self.id, order_id, quantity)


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    serialize_rules =(
        '-user.orders',
        '-location.orders',
        '-product_orders.order'
    )

    id = db.Column(db.Integer, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='orders')
    location = db.relationship('Location', back_populates='orders')
    product_orders = db.relationship('ProductOrder', back_populates='order')
    
    products = association_proxy('product_orders', 'product',
                              creator=lambda product_obj: ProductOrder(product=product_obj))

class ProductOrder(db.Model, SerializerMixin):
    __tablename__ = 'product_orders'

    serialize_rules = (
        '-product.product_orders',
        '-order.product_orders'
    )

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    quantity = db.Column(db.Integer)

    product = db.relationship('Product', back_populates='product_orders')
    order = db.relationship('Order', back_populates='product_orders')