from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import MetaData

class FlashCard(db.Model):
    __tablename__ = 'flash_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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
