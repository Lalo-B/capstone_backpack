from app.models import db, BackpackItem, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo
from .practice_tests import test1
from .flash_card_sets import set1

def seed_backpack_items():
    backpack_item_1 = BackpackItem(
        id=1,
        user_id=1,
        study_mat_id=1,
        mat_type='test',
        owner=demo,
        tests=test1
    )
    backpack_item_2 = BackpackItem(
        id=2,
        user_id=1,
        study_mat_id=1,
        mat_type='flashcards',
        owner=demo,
        flashcards=set1
    )
    db.session.add(backpack_item_1)
    db.session.add(backpack_item_2)
    db.session.commit()

def undo_backpack_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backpack_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backpack_items"))

    db.session.commit()
