from run import app
from app.models.users import UserModel
from flask import request, jsonify
import jwt

def token_required(f):
	def decorated(*args, **kwargs):
			token = None

			if 'x-access-token' in request.headers:
				token = request.headers['x-access-token']

			if not token:
				return {'message': 'Token is missing!'}, 401

			try:
				data = jwt.decode(token, app.config['SECRET_KEY'])

				current_user = UserModel.query.filter_by(public_id=data['public_id']).first()
			except:
				return {'message': 'Token is invalid'}, 401

			return f(current_user, *args, **kwargs)

	return decorated       