from flask import Blueprint, request
from app.models import db, FlashCardImg, TestImg, FlashCardSet, PracticeTest, FlashCard, Question
from flask_login import login_required #current_user was imported before
from app.api.aws_helpers import (upload_file_to_s3, get_unique_filename, remove_file_from_s3)
from ..forms.image_form import ImageForm

image_routes = Blueprint("images", __name__)


@image_routes.route("/set/<int:id>", methods=["POST"])
@login_required
def upload_image_set(id):
    # print('\n\n enter the route')
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print(' we did validate')
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        # upload = {'upload': 'upload', 'url': 'www.fake.com/fake'}
        # print('\n\n this is data in upload image route \n',form.data)
        # print('\n we did validate! \n')

        if "url" not in upload:
            print('this is upload',upload)
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])

            # should we return upload? and then front end can use that?
            return {"errors": 'there was an error with the upload'}

        url = upload["url"]
        set_img = FlashCardImg(url=url, card_id=id, uuid=image.filename)
        db.session.add(set_img)
        db.session.commit()
        # print(set_img.to_dict())
        return set_img.to_dict(),201

    if form.errors:
        # print('\n\n hi im errors \n\n')
        # print('\n\n',form.errors,'\n\n')
        # return render_template("post_form.html", form=form, errors=form.errors)
        return {"errors": "errors"}
    # print('we made it to the bottom')

    return {"Message":"none of the code above ran"}


@image_routes.route("/test/<int:id>", methods=["POST"])
@login_required
def upload_image_test(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print('\n\n this is data in upload image route \n',form.data)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])

            # should we return upload? and then front end can use that?
            return {"upload": upload}

        url = upload["url"]
        question_img = TestImg(url=url, question_id=id, uuid=image.filename)
        # we want to add img unique name in db to store them so that we can delete them from aws in our app
        db.session.add(question_img)
        db.session.commit()
        return question_img.to_dict(),201

    if form.errors:
        print('\n\n',form.errors,'\n\n')
                # return render_template("post_form.html", form=form, errors=form.errors)
        return {"errors": form.errors}

    return {"Message":"we did it!"}


@image_routes.route('/card/<int:cardId>')
def get_one_img(cardId):
    '''
    gets one image using card id
    '''
    img = FlashCardImg.query.filter(FlashCardImg.card_id == cardId).first()

    if not img:
        return {'errors': 'image cannot be found with this card id'}

    return img.to_dict(),200


@image_routes.route('/question/<int:qId>')
def get_one_image_question(qId):
    '''
    gets one question img
    '''
    img = TestImg.query.filter(TestImg.question_id == qId).first()

    if not img:
        return {'errors': 'image cannot be found with this question id'}

    return img.to_dict(),200


@image_routes.route('/all')
def get_all_imgs():
    '''
    gets all images for cards and questions
    '''
    card_imgs = FlashCardImg.get.all()
    question_imgs = TestImg.get.all()

    if not card_imgs or not question_imgs:
        return {'errors': 'there was an error retrieving the images from the db'}

    return {'cardImgs': card_imgs, 'questionImgs': question_imgs},200


@image_routes.route('/all/cards')
def get_card_imgs_all():
    '''
    get all flash card imgs
    '''
    imgs = FlashCardImg.query.all()
    if not imgs:
        return {'errors': 'there was an error getting the flash card images'}
    print([img.to_dict() for img in imgs])

    return [img.to_dict() for img in imgs]


@image_routes.route('all/questions')
def get_question_imgs_all():
    '''
    gets all question images
    '''
    imgs = TestImg.query.all()
    if not imgs:
        return {'errors': 'there was an error getting the question images'}
    return [img.to_dict() for img in imgs]


@image_routes.route('/sets/<int:setId>')
def get_imgs_for_set(setId):
    '''
    get all images for a set by set id
    '''
    sett = FlashCardSet.query.get(setId)

    if not sett:
        return {'errors': 'cannot find a set with this id'}

    cards = FlashCard.query.filter(FlashCard.set_id == sett.id).all()

    ids = [card.id for card in cards]

    imgs = FlashCardImg.query.filter(FlashCardImg.card_id in ids).all()

    if not imgs:
        return {'message': 'there are no images'}

    return [img.to_dict() for img in imgs]


@image_routes.route('/tests/<int:testId>')
def get_imgs_tests(testId):
    '''
    gets images for tests with test id
    '''
    test = PracticeTest.query.get(testId)

    if not test:
        return {'errors': 'cannot find a test with that id'}

    questions = Question.query.filter(Question.test_id == testId).all()

    ids = [q.id for q in questions]

    imgs = TestImg.query.filter(TestImg.question_id in ids).all()

    if not imgs:
        return {'message': 'there are no images for this test'}

    return [img.to_dict() for img in imgs]
