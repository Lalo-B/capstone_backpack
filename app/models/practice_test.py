from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import MetaData


class PracticeTest(db.Model):
    __tablename__ = "practice_tests"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    owner_name = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.Integer, nullable=False)

    questions = db.relationship('Question', back_populates='test', cascade='all, delete-orphan')
    backpack = db.relationship(
      'BackpackItem',
      primaryjoin="and_(BackpackItem.mat_type=='test', foreign(BackpackItem.study_mat_id)==PracticeTest.id)",
      lazy='dynamic',
      overlaps="backpack,flashcards,tests"
  )


    def to_dict_basic(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "ownerName": self.owner_name,
            "category": self.category,
            "name":self.name
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'questions': [q.to_dict_basic() for q in self.questions]
        }
