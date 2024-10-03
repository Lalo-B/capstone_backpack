from .db import db, SCHEMA, environment, add_prefix_for_prod

class BackpackItem(db.Model): #aka study mats
    __tablename__ = 'backpack_items'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    study_mat_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    mat_type = db.Column(db.String(50), nullable=False)

    # db.relationship for the backpack items
    owner = db.relationship('User', back_populates='backpack')
    # flash_card_sets = db.relationship('FlashCardSet', back_populates='backpack')
    # practice_tests = db.relationship('PracticeTest', back_populates='backpack')

    tests = db.relationship(
      'PracticeTest',
      primaryjoin="and_(BackpackItem.mat_type=='test', foreign(BackpackItem.study_mat_id)==PracticeTest.id)",
      uselist=False
  )
    flashcards = db.relationship(
      'FlashCardSet',
      primaryjoin="and_(BackpackItem.mat_type=='flashcards', foreign(BackpackItem.study_mat_id)==FlashCardSet.id)",
      uselist=False
  )
    # owner = db.relationship('User', back_populates='backpack')

    # __mapper_args__ = {
    #     "polymorphic_identity": "backpack",
    #     "polymorphic_on": "mat_type",
    # }


    def to_dict_basic(self):
        return {
            'id': self.id,
            'studyMatId': self.study_mat_id,
            'userId': self.user_id,
            'matType': self.mat_type
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'flashCardSets': self.flash_card_sets.to_dict_basic(),
            'practiceTests': self.practice_tests.to_dict_basic()
            #maybe other things in here
        }

# or

# backpack_items = db.Table(
#     'backpack_items',
#     db.Model.metadata,
#     db.Column('study_mat_id',db.Integer, db.ForeignKey(add_prefix_for_prod())),
#     db.Column('user_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
# )
