from db import db

class ImageModel(db.Model):
	__tablename__ = 'images'

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
	image_url = db.Column(db.String(80))
	image_genre = db.Column(db.String(80))

	def __init__(self, user_id, image_url, image_genre):
		self.user_id = user_id
		self.image_url = image_url
		self.image_genre = image_genre

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()

	def get(self):
		image = {}
		image['image_id'] = self.id
		image['image_url'] = self.image_url
		image['image_genre'] = self.image_genre

		return image

	@classmethod
	def find_by_image_id(cls, image_id):
		return cls.query.filter_by(id=image_id).first()

	@classmethod
	def find_by_user_id(cls, user_id):
		return cls.query.filter_by(user_id=user_id)