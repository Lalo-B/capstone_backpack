from flask_wtf import FlaskForm
from wtforms import SubmitField, SelectField, IntegerField
from wtforms.validators import DataRequired


class BackpackItemForm(FlaskForm):
    study_mat_id=IntegerField('study mat id', validators=[DataRequired()])
    user_id=IntegerField('user id', validators=[DataRequired()])
    mat_type=SelectField('mat type', choices=['test','flashcards'], validators=[DataRequired()])
    submit = SubmitField('submit')
