from .db import db, SCHEMA, environment, add_prefix_for_prod


class BackpackItem(db.Model):
    __tablename__ = "backpack_items"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    study_mat_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    mat_type = db.Column(db.String(25), nullable=False)

    owner = db.relationship("User", back_populates="backpack")

    tests = db.relationship(
        "PracticeTest",
        primaryjoin="and_(BackpackItem.mat_type=='test', foreign(BackpackItem.study_mat_id)==PracticeTest.id)",
        uselist=False,
        overlaps='study_mat_id, flashcards'
    )
    flashcards = db.relationship(
        "FlashCardSet",
        primaryjoin="and_(BackpackItem.mat_type=='flashcards', foreign(BackpackItem.study_mat_id)==FlashCardSet.id)",
        uselist=False,
        overlaps='study_mat_id, tests'
    )

    def parent(self):
        if self.imageable_type == "test":
            return self.post.to_dict()
        elif self.imageable_type == "flashcards":
            return self.comment.to_dict()
        else:
            return "Invalid material_type"

    def to_dict_basic(self):
        return {
            "id": self.id,
            "studyMatId": self.study_mat_id,
            "userId": self.user_id,
            "matType": self.mat_type,
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "parent": self.parent(),
        }
