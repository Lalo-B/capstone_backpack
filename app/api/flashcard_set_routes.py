from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, FlashCardSet, FlashCard

flashcard_routes = Blueprint('flashcards', __name__)

@flashcard_routes.route('/')
def get_all_flashcard_sets():
    pass
