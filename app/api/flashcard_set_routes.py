from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, FlashCardSet, FlashCard
from app.forms import FlashCardForm, FlashCardSetForm


flashcard_routes = Blueprint('flashcards', __name__)

@flashcard_routes.route('/basic')
def get_all_flashcard_sets():
    '''
    get all flash card sets
    '''
    all_sets = FlashCardSet.query.all()
    if not all_sets:
        return {'errors': 'there is no data found'},404
    return [cards.to_dict_basic() for cards in all_sets]


@flashcard_routes.route('/all')
def get_all_flashcards_and_sets():
    '''
    get all flash cards and sets
    '''
    all_sets = FlashCardSet.query.all()
    if not all_sets:
        return {'errors': 'there is no data found'},404
    return [cards.to_dict() for cards in all_sets]


@flashcard_routes.route('/all_cards')
def get_all_cards():
    '''
    gets all the flash cards in a list
    '''
    cards = FlashCard.query.all()
    return [card.to_dict_basic() for card in cards]

@flashcard_routes.route('/new_set', methods=['POST'])
@login_required
def create_flashcard_set():
    '''
    create a new flashcard set
    '''
    set_form = FlashCardSetForm()
    set_form['csrf_token'].data = request.cookies['csrf_token']
    if set_form.validate_on_submit():
        new_set = FlashCardSet(
            owner_id = current_user.id,
            set_name = set_form.data['set_name'],
            category = set_form.data['category']
        )
        db.session.add(new_set)
        db.session.commit()
        return new_set.to_dict_basic(),201
    return {'errors': [error for error in set_form.errors]},400


@flashcard_routes.route('/new_card/<int:set_id>', methods=['POST'])
@login_required
def create_flashcard(set_id):
    '''
    create a new flashcard
    '''
    card_form = FlashCardForm()
    card_form['csrf_token'].data = request.cookies['csrf_token']
    if card_form.validate_on_submit():
        new_card = FlashCard(
            question=card_form.data['question'],
            answer=card_form.data['answer'],
            set_id=set_id
        )
        db.session.add(new_card)
        db.session.commit()
        return new_card.to_dict_basic(),201
    return {'errors': [error for error in card_form.errors]},400

@flashcard_routes.route('/update/<int:card_id>', methods=["PUT"])
@login_required
def update_card(card_id):
    '''
    update an existing card by id
    '''
    card = FlashCard.query.get(card_id)
    if not card:
        return {"errors": "flash card cannot be found"},404

    curr_set = FlashCardSet.query.get(card.set_id)
    if not curr_set:
        return {"errors": "flash card set cannot be found with that card id"},404

    if curr_set.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    form = FlashCardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        card.question = form.data['question']
        card.answer = form.data['answer']
        db.session.commit()
        return card.to_dict_basic(),200

    return {'errors': [e for e in form.errors]}, 400


@flashcard_routes.route('/delete/<int:card_id>', methods=['DELETE'])
@login_required
def delete_card(card_id):
    '''
    delete a flash card
    '''
    card = FlashCard.query.get(card_id)
    if not card:
        return {"errors":"cannot find card by this id"},404

    curr_set = FlashCardSet.query.get(card.set_id)
    if not curr_set:
        return {"errors": "flash card set cannot be found with that card id"},404

    if curr_set.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    db.session.delete(card)
    db.session.commit()
    return {"message": "successfully deleted"},200
