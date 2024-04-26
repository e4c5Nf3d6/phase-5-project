from flask import jsonify, request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import numpy as np
import pandas as pd

from config import app, db, api
from models import User, Location, Category, Product, Order, ProductOrder


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

class Orders(Resource):

    def get(self):

        orders = [order.to_dict() for order in Order.query.all()]

        if orders:
        
            return make_response(jsonify(orders), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        user_id = request.form.get('user_id')
        location_id = request.form.get('location_id')

        order = Order(
            location_id = location_id,
            user_id = user_id
        )

        db.session.add(order)

        phorest_products = []

        try: 
            phorest_file = request.files['phorest_file']
            phorest_data = pd.read_excel(phorest_file, engine='xlrd') 

            name = ''

            for i in range(phorest_data.shape[0]):

                if name == 'Wella': 

                    if phorest_data.iloc[i, 0] == 'RETAIL':

                        break

                    try:

                        phorest_products.append((phorest_data.iloc[i, 0], int(phorest_data.iloc[i, 1])))

                    except:

                        pass
                
                else:
                    
                    name = phorest_data.iloc[i, 0]
            
        except:

            pass

        vish_products = []

        try:
            vish_file = request.files['vish_file']
            vish_data = pd.read_excel(vish_file, engine='openpyxl')

            for i in range(vish_data.shape[0]):

                if int(vish_data.iloc[i]['# CONTAINERS/TUBES']) == 0:

                    pass

                else:
                    
                    vish_products.append((vish_data.iloc[i]['PRODUCT'], int(vish_data.iloc[i]['# CONTAINERS/TUBES']), vish_data.iloc[i]['PRODUCT LINE']))

        except:

            pass

        phorest_orders = []
        phorest_products_to_add = []

        for product in phorest_products:

            match = Product.query.filter(Product.phorest_name == product[0]).first()

            if match:

                phorest_orders.append((match.to_dict(), product[1]))

            else:

                phorest_products_to_add.append(product)

        vish_orders = []
        vish_products_to_add = []

        for product in vish_products:

            category_id = Category.query.filter(Category.name == product[2]).first().id

            match = Product.query.filter(Product.vish_name == product[0], Product.category_id == category_id).first()

            if match:

                vish_orders.append((match.to_dict(), product[1]))

            else: 

                vish_products_to_add.append(product)

        filtered_phorest_orders = phorest_orders.copy()
        filtered_vish_orders = vish_orders.copy()

        if phorest_orders and vish_orders:

            for phorest_order in phorest_orders:

                for vish_order in vish_orders:

                    if phorest_order[0] == vish_order[0]:

                        if phorest_order[1] >= vish_order[1]:

                            filtered_vish_orders = [order for order in filtered_vish_orders if order != vish_order ]
                        
                        else: 
                            
                            filtered_phorest_orders = [order for order in filtered_phorest_orders if order != phorest_order ]

        product_orders = []

        for phorest_order in filtered_phorest_orders:

            product_order = ProductOrder(
                product_id=phorest_order[0]['id'],
                order_id=order.id,
                quantity=phorest_order[1]
            )              

            product_orders.append(product_order)

        for vish_order in filtered_vish_orders:

            product_order = ProductOrder(
                product_id=vish_order[0]['id'],
                order_id=order.id,
                quantity=vish_order[1]
            )              

            product_orders.append(product_order)

        db.session.add_all(product_orders)

        db.session.commit()

        response_dict = {
            'order': order.to_dict(),
            'phorest_products_to_add': phorest_products_to_add,
            'vish_products_to_add': vish_products_to_add
        }
        
        return make_response(response_dict, 201)

class OrdersByID(Resource):

    def get(self, id):

        order = Order.query.filter(Order.id == id).first()

        if order:

            return make_response(order.to_dict(), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
        
    def delete(self, id):

        order = Order.query.filter(Order.id == id).first()

        db.session.delete(order)
        db.session.commit()

        return make_response({}, 204)    
        
class ProductOrders(Resource):

    def get(self):

        product_orders = [product_order.to_dict() for product_order in ProductOrder.query.all()]

        if product_orders:
        
            return make_response(jsonify(product_orders), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def post(self):

        request_json = request.get_json()

        product_id = request_json.get('product_id')
        order_id = request_json.get('order_id')
        quantity = request_json.get('quantity')

        product_order = ProductOrder(
            product_id = product_id,
            order_id = order_id,
            quantity = quantity
        )

        try:

            db.session.add(product_order)
            db.session.commit()

            return make_response(product_order.to_dict(), 201)
        
        except:

            return make_response({'error': '403 Forbidden'}, 403)   

class ProductOrdersByID(Resource):

    def get(self, id):

        product_order = ProductOrder.query.filter(ProductOrder.id == id).first()

        if product_order:

            return make_response(product_order.to_dict(), 200)
        
        return make_response({'error': '404 Not Found'}, 404)
    
    def patch(self, id):
    
        request_json = request.get_json()

        quantity = request_json.get('quantity')

        product_order = ProductOrder.query.filter(ProductOrder.id == id).first()

        try: 
            
            product_order.quantity = quantity

            db.session.add(product_order)
            db.session.commit()

            return make_response(product_order.to_dict(), 200)
        
        except ValueError:
            
            return make_response({'error': '422 Unprocessable Entity'}, 422)   
        
    def delete(self, id):

        product_order = ProductOrder.query.filter(ProductOrder.id == id).first()

        if product_order:

            db.session.delete(product_order)
            db.session.commit()

            return make_response({'deleted': id}, 200)       
        
        return make_response({'error': '404 Not Found'}, 404)


api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(UsersByID, '/users/<int:id>', endpoint='users/<int:id>')
api.add_resource(Locations, '/locations', endpoint='locations')
api.add_resource(Categories, '/categories', endpoint='categories')
api.add_resource(Products, '/products', endpoint='products')
api.add_resource(ProductsByID, '/products/<int:id>', endpoint='products/<int/id>')
api.add_resource(Orders, '/orders', endpoint='orders')
api.add_resource(OrdersByID, '/orders/<int:id>', endpoint='orders/<int:id>')
api.add_resource(ProductOrders, '/product_orders', endpoint='product_orders')
api.add_resource(ProductOrdersByID, '/product_orders/<int:id>', endpoint='product_orders/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)