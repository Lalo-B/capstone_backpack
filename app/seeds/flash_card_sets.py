from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, FlashCardSet
from .flash_cards import (
    flashcard_1,
    flashcard_2,
    flashcard_3,
    flashcard_4,
    flashcard_5,
    flashcard_6,
    flashcard_7,
    flashcard_8,
    flashcard_9,
    flashcard_10,
    flashcard_11,
    flashcard_12,
    flashcard_13,
    flashcard_14,
    flashcard_15,
    flashcard_16,
    flashcard_17,
    flashcard_18,
    flashcard_19,
    flashcard_20,
    flashcard_21,
    flashcard_22,
    flashcard_23,
    flashcard_24,
    flashcard_25,
    flashcard_26,
    flashcard_27,
    flashcard_28,
    flashcard_29,
    flashcard_30,
    flashcard_31,
    flashcard_32,
    flashcard_33,
    flashcard_34,
    flashcard_35,
    flashcard_36,
    flashcard_37,
    flashcard_38,
    flashcard_39,
    flashcard_40,
    flashcard_41,
)

set1 = FlashCardSet(
    owner_id=1,
    set_name="microbio",
    category="micro-biology",
    flash_cards=[
        flashcard_1,
        flashcard_2,
        flashcard_3,
        flashcard_4,
        flashcard_5,
        flashcard_6,
        flashcard_7,
        flashcard_8,
        flashcard_9,
        flashcard_10,
        flashcard_11,
        flashcard_12,
        flashcard_13,
        flashcard_14,
        flashcard_15,
        flashcard_16,
        flashcard_17,
        flashcard_18,
        flashcard_19,
        flashcard_20,
        flashcard_21,
    ],
)
set2 = FlashCardSet(
    owner_id=1,
    set_name="anatomy",
    category="anatomy",
    flash_cards=[
        flashcard_22,
        flashcard_23,
        flashcard_24,
        flashcard_25,
        flashcard_26,
        flashcard_27,
        flashcard_28,
        flashcard_29,
        flashcard_30,
        flashcard_31,
        flashcard_32,
    ],
)

set3 = FlashCardSet(
    owner_id=1,
    set_name="basic physics flashcards",
    category="physics",
    flash_cards=[
        flashcard_32,
        flashcard_33,
        flashcard_34,
        flashcard_35,
        flashcard_36,
        flashcard_37,
        flashcard_38,
        flashcard_39,
        flashcard_40,
        flashcard_41,
    ],
)


def seed_flash_card_sets():
    db.session.add(set1)
    db.session.add(set2)
    db.session.add(set3)
    db.session.commit()


def undo_flash_card_sets():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.flash_card_sets RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM flash_card_sets"))

    db.session.commit()
