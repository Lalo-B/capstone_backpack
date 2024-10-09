from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import MetaData


class PracticeTest(db.Model):
    __tablename__ = "practice_tests"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # convention = {
    # "ix": "ix_%(column_0_label)s",
    # "uq": "uq_%(table_name)s_%(column_0_name)s",
    # "ck": "ck_%(table_name)s_%(constraint_name)s",
    # "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    # "pk": "pk_%(table_name)s"
    # }

    # metadata = MetaData(naming_convention=convention)

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
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
            "category": self.category,
            "name":self.name
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'questions': [q.to_dict_basic() for q in self.questions]
        }
