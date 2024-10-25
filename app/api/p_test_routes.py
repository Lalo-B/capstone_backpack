from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, PracticeTest, Question
from app.forms import PracticeTestForm, QuestionForm

practice_test_routes = Blueprint("practice_tests", __name__)


@practice_test_routes.route("/basic")
def get_all_tests_basic():
    """
    get all tests basic
    """
    all_tests = PracticeTest.query.all()
    if not all_tests:
        return {"errors": "there is no data found"}, 404
    return [test.to_dict_basic() for test in all_tests]


@practice_test_routes.route("/all")
def get_all_tests():
    """
    get all tests and their questions
    """
    all_tests = PracticeTest.query.all()
    if not all_tests:
        return {"errors": "there is no data found"}, 404
    return [test.to_dict() for test in all_tests]


@practice_test_routes.route('/all_Qs')
def all_questions_only():
    '''
    gets all questions
    '''
    qs = Question.query.all()
    return [q.to_dict_basic() for q in qs]


@practice_test_routes.route("/new", methods=["POST"])
@login_required
def create_test():
    """
    make a new practice test
    """
    form = PracticeTestForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_test = PracticeTest(
            category=form.data["category"],
            owner_id=current_user.id,
            name=form.data['name']
        )
        db.session.add(new_test)
        db.session.commit()
        return new_test.to_dict_basic()
    return {"errors": [error for error in form.errors]}, 400


@practice_test_routes.route("/new/<int:test_id>", methods=["POST"])
@login_required
def create_question(test_id):
    """
    make a new question for a practice test by id
    """
    curr_test = PracticeTest.query.get(test_id)
    if curr_test.owner_id != current_user.id:
        return {"message": "Forbidden"}, 403

    form = QuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # print('',form.data['correctAnswer'])
        new_q = Question(
            question=form.data["question"],
            answer1=form.data["answer1"],
            answer2=form.data["answer2"],
            answer3=form.data["answer3"],
            answer4=form.data["answer4"],
            test_id=test_id,
            correct_answer=form.data["correct_answer"],
        )
        db.session.add(new_q)
        db.session.commit()
        return new_q.to_dict_basic()
    return {"errors": [error for error in form.errors]}, 400


@practice_test_routes.route("/update/<int:test_id>", methods=["PUT"])
@login_required
def update_practice_test(test_id):
    """
    update a practice test category or name by test id
    """
    test = PracticeTest.query.get(test_id)
    if not test:
        return {"errors": "practice test cannot be found"}, 404
    if test.owner_id != current_user.id:
        return {"message": "Forbidden"}, 403
    form = PracticeTestForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        test.category = form.data["category"]
        test.name = form.data["name"]
        db.session.commit()
        return test.to_dict_basic(), 200
    return {"errors": [e for e in form.errors]}, 400


@practice_test_routes.route("/update-q/<int:question_id>", methods=["PUT"])
@login_required
def update_question(question_id):
    """
    update a question using question id
    """
    question = Question.query.get(question_id)
    if not question:
        return {"errors": "this question cannot be found"}, 404
    test = (
        PracticeTest.query.filter(PracticeTest.owner_id == current_user.id)
        .filter(PracticeTest.id == question.test_id)
        .first()
    )
    if not test:
        return {"errors": "there is no test found"}, 404

    if test.owner_id != current_user.id:
        return {"message": "Forbidden"}, 403

    form = QuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        question.question = form.data["question"]
        question.answer1 = form.data["answer1"]
        question.answer2 = form.data["answer2"]
        question.answer3 = form.data["answer3"]
        question.answer4 = form.data["answer4"]
        question.correct_answer = form.data["correct_answer"]
        db.session.commit()
        return question.to_dict_basic(), 200
    return {"errors": [e for e in form.errors]}, 400


@practice_test_routes.route('/delete/<int:test_id>', methods=['DELETE'])
@login_required
def delete_test(test_id):
    '''
    delete a practice test by id
    '''
    test = PracticeTest.query.get(test_id)
    if not test:
        return {"errors":"cannot find test by this id"},404
    theId = test.id
    if test.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403
    print('\n this is test to be deleted in back end \n', test.to_dict_basic())
    db.session.delete(test)
    db.session.commit()
    return {"message": "successfully deleted", "id":theId},200


@practice_test_routes.route('/delete-q/<int:question_id>', methods=['DELETE'])
@login_required
def delete_question(question_id):
    '''
    delete a question from a practice test by id
    '''
    question = Question.query.get(question_id)
    if not question:
        return {"errors":"cannot find a question by this id"},404

    test = PracticeTest.query.get(question.test_id)

    if test.owner_id != current_user.id:
        return {"message" : "Forbidden"}, 403

    db.session.delete(question)
    db.session.commit()
    return {"message": "successfully deleted"},200
