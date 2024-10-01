from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length, InputRequired


class QuestionForm(FlaskForm):
    question = StringField('question', validators=[DataRequired(), Length(min=1,max=500)])
    answer_1 = StringField('answer 1', validators=[DataRequired(), Length(min=1,max=500)])
    answer_2 = StringField('answer 2', validators=[DataRequired(), Length(min=1,max=500)])
    answer_3 = StringField('answer 3', validators=[DataRequired(), Length(min=1,max=500)])
    answer_4 = StringField('answer 4', validators=[DataRequired(), Length(min=1,max=500)])
    submit = SubmitField('submit')
