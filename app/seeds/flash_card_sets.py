from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, FlashCardSet
from .flash_cards import flashcard_1, flashcard_2, flashcard_3, flashcard_4, flashcard_5, flashcard_6, flashcard_7, flashcard_8, flashcard_9, flashcard_10, flashcard_11, flashcard_12, flashcard_13, flashcard_14, flashcard_15, flashcard_16, flashcard_17, flashcard_18, flashcard_19, flashcard_20, flashcard_21

set1 = FlashCardSet(owner_id=1,
                    set_name='microbio',
                    category='micro-biology',
                    flash_cards=[flashcard_1, flashcard_2, flashcard_3, flashcard_4, flashcard_5, flashcard_6, flashcard_7, flashcard_8, flashcard_9, flashcard_10, flashcard_11, flashcard_12, flashcard_13, flashcard_14, flashcard_15, flashcard_16, flashcard_17, flashcard_18, flashcard_19, flashcard_20, flashcard_21],
                    
                    )

def seed_flash_card_sets():
    db.session.add(set1)
    db.session.commit()

def undo_flash_card_sets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flash_card_sets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flash_card_sets"))

    db.session.commit()
