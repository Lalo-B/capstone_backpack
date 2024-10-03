from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, BackpackItem, PracticeTest, FlashCardSet
from app.forms import BackpackItemForm

backpack_routes = Blueprint("backpack_items", __name__)

@backpack_routes.route('/get-all')
def get_all_cards_tests():
    '''
    route for home page to get all flash cards and practice tests
    '''
    tests = PracticeTest.query.all()
    sets = FlashCardSet.query.all()

    # eventually add a count for questions in test and cards in set
    return {"tests": [test.to_dict_basic() for test in tests], "sets": [sett.to_dict_basic() for sett in sets]}


@backpack_routes.route("")
def get_curr_backpack():
    """
    gets current users backpack
    """
    backpack = BackpackItem.query.filter(BackpackItem.user_id == current_user.id).all()
    if not backpack:
        return {"errors": "cannot find current users backpack"}, 404
    return [el.to_dict_basic() for el in backpack]


@backpack_routes.route("/add-test/<int:test_id>", methods=["POST"])
@login_required
def add_backpack_item_test(test_id):
    """
    adds a new practice test to the backpack table, with a user id to associate it
    """
    test = PracticeTest.query.get(test_id)
    if not test:
        return {"erorrs": "cannot find a flashcard set with this id"},404

    if test.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    form = BackpackItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_item = BackpackItem(
            study_mat_id=test.id,
            user_id=current_user.id,
            mat_type="test"
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict_basic(),201
    return {'errors': [error for error in form.errors]},400


@backpack_routes.route("/add-cards/<int:set_id>", methods=["POST"])
@login_required
def add_backpack_item_cards(set_id):
    """
    adds a new flashcard set to the backpack table, with a user id to associate it
    """
    cards = FlashCardSet.query.get(set_id)
    if not cards:
        return {"erorrs": "cannot find a flashcard set with this id"},404

    if cards.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    form = BackpackItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_item = BackpackItem(
            study_mat_id=cards.id,
            user_id=current_user.id,
            mat_type="flashcards"
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict_basic(),201
    return {'errors': [error for error in form.errors]},400


@backpack_routes.route('/delete/<int:mat_id>', methods=["DELETE"])
@login_required
def delete_backpack_item(mat_id):
    '''
    deletes backpack item by id
    '''
    mat = BackpackItem.query.get(mat_id)
    if not mat:
        return {"erorrs": "cannot find an item with this id"},404

    if mat.user_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    db.session.delete(mat)
    db.session.commit()
    return {"message": "successfully deleted"},200
