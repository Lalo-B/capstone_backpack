from .db import db, environment, SCHEMA, add_prefix_for_prod


class Question(db.Model):
    __tablename__ = "questions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    answer_1 = db.Column(db.String(500), nullable=False)
    answer_2 = db.Column(db.String(500), nullable=False)
    answer_3 = db.Column(db.String(500), nullable=False)
    answer_4 = db.Column(db.String(500), nullable=False)
    test_id = db.Column(db.Integer, nullable=False)
    correct_answer_id = db.Column(db.Integer, nullable=False)

    def to_dict_basic(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer1': self.answer_1,
            'answer2': self.answer_2,
            'answer3': self.answer_3,
            'answer4': self.answer_4,
            'testId': self.test_id,
            'correctAnswerId': self.correct_answer_id
        }
