from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, PracticeTest
#maybe import users

test1 = PracticeTest(
    owner_id=1,
    owner_name='Demo',
    category='micro-biology',
    name='micro biology practice test'
)
test2 = PracticeTest(
    owner_id=1,
    owner_name='Demo',
    category='anatomy',
    name='Human anatomy test'
)
test3 = PracticeTest(
    owner_id=1,
    owner_name='Demo',
    category='calculus',
    name='Ch1 Calculus test'
)
test4 = PracticeTest(
    owner_id=1,
    owner_name='Demo',
    category='o-chem',
    name='o-chem intro'
)

def seed_practice_tests():
    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)
    db.session.commit()

def undo_tests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.practice_tests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM practice_tests"))

    db.session.commit()
