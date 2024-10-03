from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, FlashCardSet

set1 = FlashCardSet(owner_id=1,
                    set_name='microbio',
                    category='micro-biology'
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
