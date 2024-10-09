from flask.cli import AppGroup
from .users import seed_users, undo_users
from .flash_cards import seed_flash_cards, undo_flash_cards
from .questions import seed_questions, undo_questions
from .practice_tests import seed_practice_tests, undo_tests
from .flash_card_sets import seed_flash_card_sets, undo_flash_card_sets
from .backpack_items import seed_backpack_items, undo_backpack_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():

    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_flash_cards()
        undo_questions()
        undo_flash_card_sets()
        undo_tests()
        undo_backpack_items()
        undo_users()
    seed_users()
    seed_backpack_items()
    seed_practice_tests()
    seed_flash_card_sets()
    seed_questions()
    seed_flash_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_flash_cards()
    undo_questions()
    undo_flash_card_sets()
    undo_tests()
    undo_backpack_items()
    undo_users()
    # Add other undo functions here
