from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length
# from flask_wtf.file import FileField, FileAllowed, FileRequired
# from app.api.aws_helpers import ALLOWED_EXTENSIONS

class FlashCardForm(FlaskForm):
    question = StringField('question', validators=[DataRequired(), Length(min=1,max=500)])
    answer = StringField('answer', validators=[DataRequired(), Length(min=1,max=500)])
    # image = FileField('image file', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('create flash card')
