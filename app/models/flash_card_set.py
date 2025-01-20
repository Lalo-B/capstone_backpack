from .db import db, SCHEMA, environment, add_prefix_for_prod

class FlashCardSet(db.Model):
    __tablename__ = 'flash_card_sets'


    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    owner_name = db.Column(db.String(50), nullable=False)
    set_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)

    flash_cards = db.relationship('FlashCard', back_populates='set', cascade='all, delete-orphan')
    backpack = db.relationship(
      'BackpackItem',
      primaryjoin="and_(BackpackItem.mat_type=='flashcards', foreign(BackpackItem.study_mat_id)==FlashCardSet.id)",
      lazy='dynamic',
      overlaps="flashcards,tests"
  )


    def to_dict_basic(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'ownerName': self.owner_name,
            'setName': self.set_name,
            'category': self.category
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'flashCards': [card.to_dict_basic() for card in self.flash_cards]
        }
