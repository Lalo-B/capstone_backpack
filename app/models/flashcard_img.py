from .db import db, SCHEMA, environment, add_prefix_for_prod


class FlashCardImg(db.Model):
    __tablename__ = "flashcard_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("flash_cards.id")))
    uuid = db.Column(db.String)

    def to_dict(self):
        return {"id": self.id, "url": self.url, "cardId": self.card_id, "uuid":self.uuid}
