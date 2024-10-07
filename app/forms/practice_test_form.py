from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length


class PracticeTestForm(FlaskForm):
    category = StringField('category', validators=[DataRequired(), Length(min=1,max=500)])
    name = StringField('name', validators=[DataRequired(), Length(min=1,max=500)])
    submit = SubmitField('submit')
