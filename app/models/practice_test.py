from .db import db, environment, SCHEMA, add_prefix_for_prod

class PracticeTest(db.Model):
    __tablename__ = 'practice_tests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category = db.Column(db.Integer, nullable=False)
    backpack_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('backpack_items.id')))


    # questions = db.relationship('Question', back_populates='test') #doesnt need backpop?
    # backpack = db.relationship('BackpackItem', back_populates='practice_tests')

    # __mapper_args__ = {
    #     'polymorphic_identity': 'test'
    # }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'questionId': self.question_id,
            'category': self.category
        }
