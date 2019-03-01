from flask_restful import Resource, reqparse
from app.models.users import UserModel
from werkzeug.security import generate_password_hash, check_password_hash
from run import app
import jwt, json, uuid, datetime
from util.security import token_required
class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        location='json'
                        )
    parser.add_argument('password',
                        type=str,
                        location='json'
                        )
    parser.add_argument('email',
                        type=str,
                        location='json'
                        )
    
    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_email(data['email']):
            return {"code": "10001", "message": "Email exists already"}, 201

        elif data['email'] and data['username'] and data['password']:
            hashed_password = generate_password_hash(data['password'], method='sha256')
            public_id = str(uuid.uuid4())
            user = UserModel(public_id, data['username'], hashed_password, data['email'])
            user.save_to_db()
            return {"code": "0", "message": "User created successfully."}, 200
        
        else:
            return {"code": "0", "message": "Email can be used."}, 201

    def get(self):
        data = UserRegister.parser.parse_args()

        user = UserModel.find_by_email(data['email'])
        return {"code": "0","message":"success", "user" : user.get()}, 200


class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="Email cannot be blank.",
                        location='json'
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="Password cannot be blank.",
                        location='json'
                        )

    def post(self):
        data = UserRegister.parser.parse_args()

        user = UserModel.find_by_email(data['email'])
        if not user:
            return {"code": "10002", "message": "User not found"}, 200

        if(check_password_hash(user.password, data['password'])):
            token = jwt.encode({
                'public_id': user.public_id,
                'username': user.username,
                'profile_img': user.profile_img,
                'email': user.email,
                'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=30)
                },
                app.config['SECRET_KEY']
                )

            return {
                "code": "0",
                "message": "success",
                "token":  token.decode('UTF-8')
            }

        return {"code": "10003", "message": "Wrong password."}, 200


class UserUpdate(Resource):
    decorators = [token_required]

    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        location='json'
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        location='json'
                        )
    parser.add_argument('email',
                        type=str,
                        required=True,
                        location='json'
                        )
    parser.add_argument('profile_img',
                        type=str,
                        required=True,
                        location='json'
                        )

    def put(self, current_user):
        data = UserUpdate.parser.parse_args()

        user = UserModel.find_by_public_id(current_user.public_id)
        user.username = data['username']
        hashed_password = generate_password_hash(data['password'], method='sha256')
        user.password = hashed_password
        user.email = data['email']
        user.profile_img = data['profile_img']
        user.save_to_db()

        token = jwt.encode({
                'public_id': user.public_id,
                'username': user.username,
                'profile_img': user.profile_img,
                'email': user.email,
                'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=30)
                },
                app.config['SECRET_KEY']
                )

        return {"code": "0", "message": "Update user successfully.", "token":  token.decode('UTF-8')}, 201