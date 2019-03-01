from flask import url_for
from flask_restful import Resource, reqparse
from app.models.images import ImageModel
from util.security import token_required

from app.dcgan.main import Arts 

import shutil,os

class ImagesList(Resource):
	decorators = [token_required]
	parser = reqparse.RequestParser()
	parser.add_argument('image_name',
						type=str,
						location='json'
						)
	parser.add_argument('image_genre',
						type=str,
						location='json'
						)

	def post(self, current_user):
		data = ImagesList.parser.parse_args()
		
		root_folder = os.getcwd()
		username = current_user.username
		arts_genre = data['image_genre']
		filename = data['image_name']
		user_folder = os.path.join(root_folder,'static/assets/users/' + username + '/' + arts_genre)
		
		generated_folder = os.path.join(root_folder,'static/assets/generated/%s.jpg'%(filename))
		folder = os.path.exists(user_folder)
		if not folder:
			os.makedirs(user_folder)               
			shutil.copy(generated_folder, user_folder)
		else:
			shutil.copy(generated_folder, user_folder)

		image = ImageModel(current_user.id, filename, arts_genre)
		image.save_to_db()
		
		user_folder = url_for('static', filename='assets/users/%s/%s/%s.jpg'%(username, arts_genre, filename))
		return {"code": "0","message": "Save image successfully."}, 200

	def get(self, current_user):
		images = ImageModel.find_by_user_id(current_user.id)

		output = []
		for image in images:
			image_url = image.get()['image_url']
			image_genre = image.get()['image_genre']
			username = current_user.username
			image_url = '/static/assets/users/%s/%s/%s.jpg'%(username, image_genre, image_url)
			image.image_url = image_url
			output.append(image.get())

		return {"code": "0","message": "success", "images": output}, 200

class ImagesDelete(Resource):
	decorators = [token_required]

	def delete(self, current_user, image_id):
		image = ImageModel.find_by_image_id(image_id)
		if image:
			image_url = image.get()['image_url']
			image_genre = image.get()['image_genre']
			username = current_user.username
			root_folder = os.getcwd()
			user_folder = os.path.join(root_folder,'static/assets/users/' + username + '/' + image_genre + '/' + image_url + '.jpg')
			os.remove(user_folder)
			image.delete_from_db()
		return {"code": "0","message": "Delete image successfully"}, 200

class ImageGenerator(Resource): 
	parser = reqparse.RequestParser()
	parser.add_argument('genre',
						type=str, 
						location='args'
						)				
	art = Arts()

	def get(self):
		data = ImageGenerator.parser.parse_args()
		output_filename = ImageGenerator.art.generate(data['genre'])
		if output_filename is not None:
			file_name =	url_for('static', filename='assets/generated/' + output_filename + '.jpg')
			return {"code": "0", "message": "Arts generate successfully.", "image_file": file_name, "genre": data['genre']}, 200