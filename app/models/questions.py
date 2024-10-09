from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import MetaData


class Question(db.Model):
    __tablename__ = "questions"

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
    question = db.Column(db.String(500), nullable=False)
    answer1 = db.Column(db.String(500), nullable=False)
    answer2 = db.Column(db.String(500), nullable=False)
    answer3 = db.Column(db.String(500), nullable=False)
    answer4 = db.Column(db.String(500), nullable=False)
    test_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('practice_tests.id')), nullable=False)
    correct_answer = db.Column(db.String(50), nullable=False)

    test = db.relationship('PracticeTest', back_populates='questions')

    def to_dict_basic(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer1': self.answer1,
            'answer2': self.answer2,
            'answer3': self.answer3,
            'answer4': self.answer4,
            'testId': self.test_id,
            'correctAnswer': self.correct_answer
        }
