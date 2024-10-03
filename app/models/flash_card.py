from .db import db, environment, SCHEMA, add_prefix_for_prod

class FlashCard(db.Model):
    __tablename__ = 'flash_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    answer = db.Column(db.String(500), nullable=False)
    set_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flash_card_sets.id')), nullable=False)

    # image = db.relationship('Posts', back_populates='images')
    set = db.relationship('FlashCardSet', back_populates='flash_cards')

    def to_dict_basic(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'setId': self.set_id
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            'set': self.set.to_dict_basic()
            # 'imageUrl': self.image.url,
            # 'owner': self.owner.to_dict_basic()
        }
