from flask import jsonify, request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Location, Category, Product


class Login(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:

            if user.authenticate(password):
                session['user_id'] = user.id

                return make_response(user.to_dict(), 200)
            
        return make_response({'error': '401 Unauthorized'}, 401)
    
class CheckSession(Resource):

    def get(self):

        user_id = session['user_id']

        if user_id:

            user = User.query.filter(User.id == user_id).first()

            if user:

                return make_response(user.to_dict(), 200)
        
        return make_response({'error': '401 Unauthorized'}, 401)

class Logout(Resource):
    
    def delete(self):
        
        if session['user_id']:

            session['user_id'] = None

            return make_response({}, 204)
        
        return make_response({'error': '401 Unauthorized'}, 401)
    
class Users(Resource):

    def get(self):

        users = [user.to_dict() for user in User.query.all()]

        if users:
        
            return make_response(jsonify(users), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        admin = request_json.get('admin')
        password = request_json.get('password')

        user = User(
            username = username,
            admin = admin
        )

        user.password_hash = password

        try:

            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 201)
    
        except IntegrityError:

            return make_response({'error': '422 Unprocessable Entity'}, 422)
        
class UsersByID(Resource):

    def get(self, id):

        user = User.query.filter(User.id == id).first()

        if user:

            return make_response(user.to_dict(), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def patch(self, id):
    
        request_json = request.get_json()

        username = request_json.get('username')
        admin = request_json.get('admin')
        password = request_json.get('password')

        user = User.query.filter(User.id == id).first()

        try: 
            
            user.username = username
            user.admin = admin
            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 200)
        
        except ValueError:
            
            return make_response({'error': '422 Unprocessable Entity'}, 422)
        
    def delete(self, id):

        user = User.query.filter(User.id == id).first()

        db.session.delete(user)
        db.session.commit()

        return make_response({}, 204)
    
class Locations(Resource):

    def get(self):

        locations = [location.to_dict() for location in Location.query.all()]

        if locations:
        
            return make_response(jsonify(locations), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        request_json = request.get_json()

        name = request_json.get('name')

        location = Location(
            name = name
        )

        try:

            db.session.add(location)
            db.session.commit()

            return make_response(location.to_dict(), 201)
    
        except IntegrityError:

            return make_response({'error': '422 Unprocessable Entity'}, 422)             

class Categories(Resource):

    def get(self):

        categories = [category.to_dict() for category in Category.query.all()]

        if categories:
        
            return make_response(jsonify(categories), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        request_json = request.get_json()

        name = request_json.get('name')

        category = Category(
            name = name
        )

        try:

            db.session.add(category)
            db.session.commit()

            return make_response(category.to_dict(), 201)
    
        except IntegrityError:

            return make_response({'error': '422 Unprocessable Entity'}, 422)
        
class Products(Resource):

    def get(self):

        products = [product.to_dict() for product in Product.query.all()]

        if products:
        
            return make_response(jsonify(products), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        request_json = request.get_json()

        name = request_json.get('name')
        category_id = request_json.get('category_id')
        phorest_name = request_json.get('phorest_name')
        vish_name = request_json.get('vish_name')

        product = Product(
            name = name,
            category_id = category_id,
            phorest_name = phorest_name,
            vish_name = vish_name
        )

        try:

            db.session.add(product)
            db.session.commit()

            return make_response(product.to_dict(), 201)
    
        except IntegrityError:

            return make_response({'error': '422 Unprocessable Entity'}, 422)  

class ProductsByID(Resource):

    def get(self, id):

        product = Product.query.filter(Product.id == id).first()

        if product:

            return make_response(product.to_dict(), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def patch(self, id):
    
        request_json = request.get_json()

        name = request_json.get('name')
        category_id = request_json.get('category_id')
        phorest_name = request_json.get('phorest_name')
        vish_name = request_json.get('vish_name')

        product = Product.query.filter(Product.id == id).first()

        try: 
            
            product.name = name
            product.category_id = category_id
            product.phorest_name = phorest_name
            product.vish_name = vish_name

            db.session.add(product)
            db.session.commit()

            return make_response(product.to_dict(), 200)
        
        except ValueError:
            
            return make_response({'error': '422 Unprocessable Entity'}, 422)   
        
    def delete(self, id):

        product = Product.query.filter(Product.id == id).first()

        db.session.delete(product)
        db.session.commit()

        return make_response({}, 204)
   

api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(UsersByID, '/users/<int:id>', endpoint='users/<int:id>')
api.add_resource(Locations, '/locations', endpoint='locations')
api.add_resource(Categories, '/categories', endpoint='categories')
api.add_resource(Products, '/products', endpoint='products')
api.add_resource(ProductsByID, '/products/<int:id>', endpoint='products/<int/id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)