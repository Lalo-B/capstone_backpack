from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, PracticeTest, Question

practice_test_routes = Blueprint('practice_tests', __name__)

@practice_test_routes.route('/')
def get_all_tests():
    pass
