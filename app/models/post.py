from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    # flash_card_id = db.Column(db.integer, nullable=False)
