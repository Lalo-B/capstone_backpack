from flask import Blueprint, request, redirect
from app.models import db, Post
from flask_login import login_required #current_user was imported before
from app.api.aws_helpers import (upload_file_to_s3, get_unique_filename, remove_file_from_s3)
from ..forms.image_form import ImageForm

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        upload = {'url': 'url'}
        print('\n\n this is upload in upload image route \n',upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])

            # should we return upload? and then front end can use that?
            return {"upload":"upload"}

        url = upload["url"]
        new_image = Post(url= url)
        db.session.add(new_image)
        db.session.commit()
        return {"img_url": url}

    if form.errors:
        print(form.errors)
        # return render_template("post_form.html", form=form, errors=form.errors)
        return {"errors": "errors"}

    return {"Message":"we did it!"}
