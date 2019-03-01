from db import db

class UserModel(db.Model):
	__tablename__ = 'users'

	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.String(50), unique=True)
	username = db.Column(db.String(80))
	password = db.Column(db.String(80))
	email = db.Column(db.String(80))
	profile_img = db.Column(db.String(80))

	def __init__(self, public_id, username, password, email):
		self.username = username
		self.password = password
		self.email = email
		self.public_id = public_id
		self.profile_img = 'default.jpg'

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def get(self):
		user = {}
		user['username'] = self.username
		user['email'] = self.email
		user['profile_img'] = self.profile_img

		return user

	@classmethod
	def find_by_email(cls, email):
		return cls.query.filter_by(email=email).first()

	@classmethod
	def find_by_public_id(cls, public_id):
		return cls.query.filter_by(public_id=public_id).first()