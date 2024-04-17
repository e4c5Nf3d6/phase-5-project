from flask import request, session, make_response
from flask_restful import Resource

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

api.add_resource(Login, "/login", endpoint="login")

if __name__ == '__main__':
    app.run(port=5555, debug=True)