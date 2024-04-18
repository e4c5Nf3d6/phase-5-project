from flask import jsonify, request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User


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
    

api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(UsersByID, '/users/<int:id>', endpoint='users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)