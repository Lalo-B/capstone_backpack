from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, PracticeTest
#maybe import users

test1 = PracticeTest(
    owner_id=1,
    category='micro-biology'
)

def seed_practice_tests():
    db.session.add(test1)
    db.session.commit()

def undo_tests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.practice_tests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM practice_tests"))

    db.session.commit()
