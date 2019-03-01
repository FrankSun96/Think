from flask import Flask 
from flask_restful import Api 
from config import Config
from flask_cors import CORS 

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)



if __name__=='__main__':
	from app.resources.users import UserRegister, UserLogin, UserUpdate
	from app.resources.images import ImagesList, ImagesDelete, ImageGenerator
	
	api.add_resource(UserRegister, '/api/user')
	api.add_resource(UserUpdate, '/api/user')
	api.add_resource(UserLogin, '/api/user/login')
	api.add_resource(ImagesList, '/api/images')
	api.add_resource(ImagesDelete, '/api/images/<int:image_id>')
	api.add_resource(ImageGenerator, '/api/images_get') 

	from db import db
	db.init_app(app)
	cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
	app.run(debug=True)