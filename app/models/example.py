from .db import SCHEMA, environment, db, add_prefix_for_prod

class Base(db.Model):
    __tablename__ = 'backpack_items'
    id = db.Column(db.Integer, primary_key=True)

class BackpackOrganizer(Base):
    study_mat_type = db.Column(db.String(50))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # discriminator = Column(String)

    __mapper_args__ = {'polymorphic_on': study_mat_type} # double check this syntax since its from 10y ago
    # actually this syntax is in sqlalchemy 2.0
    # __mapper_args__ = {"polymorphic_on": discriminator}
    # our study mat type is going to be a discriminator column ( i think its banana-able)
    # scalar value?? a value that only has one component to it, the magnitude ex. height and speed
    # a vector is not a scalar value since it has direction and magnitude

    # i think we just need the mapper args in both the practice test and flash card table


# class Tests(Base):
#         "polymorphic_identity": "tests",
#         "polymorphic_on": "type",
#     }
