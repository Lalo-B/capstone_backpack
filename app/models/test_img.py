from .db import db, SCHEMA, environment, add_prefix_for_prod


class TestImg(db.Model):
    __tablename__ = "test_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")))
    uuid = db.Column(db.String)

    def to_dict(self):
        return {"id": self.id, "url": self.url, "questionId": self.question_id, "uuid": self.uuid}
