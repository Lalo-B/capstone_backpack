from .db import db, environment, SCHEMA, add_prefix_for_prod


class PracticeTest(db.Model):
    __tablename__ = "practice_tests"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    category = db.Column(db.Integer, nullable=False)
    backpack_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("backpack_items.id")))

    # questions = db.relationship('Question', back_populates='test') #doesnt need backpop?
    # backpack = db.relationship('BackpackItem', back_populates='practice_tests')
    backpack = db.relationship(
      'BackpackItem',
      primaryjoin="and_(BackpackItem.mat_type=='test', foreign(BackpackItem.study_mat_id)==PracticeTest.id)",
      lazy='dynamic',
      overlaps="backpack,flashcards,tests"
  )

    # __mapper_args__ = {
    #     'polymorphic_identity': 'test'
    # }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "questionId": self.question_id,
            "category": self.category,
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'backpack': self.backpack.to_dict_basic()
        }
