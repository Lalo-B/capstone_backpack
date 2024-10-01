from .db import db, environment, SCHEMA, add_prefix_for_prod

class PracticeTest(db.Model):
    __tablename__ = 'practice_tests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, nullable=False)
    category = db.Column(db.Integer, nullable=False)

    questions = db.relationship('Questions', back_populates='test') #doesnt need backpop?
    backpack = db.relationship('BackpackItem', back_populates='practice_tests')
    # does this need an owner as well? ill have access to the user at all times
    # and id use the user to query for a practice test they own or use the id of the test to
    # find a specific one. id want the user if i was only going to query from the practice test
    # model and not use the current user thing in backend

    def to_dict_basic(self):
        return {
            'id': self.id,
            'questionId': self.question_id,
            'category': self.category
        }
