from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, BackpackItem

backpack_routes = Blueprint('backpack_items', __name__)

@backpack_routes.route('')
def get_curr_backpack():
    '''
    gets current users backpack
    '''
    backpack = BackpackItem.query.filter(BackpackItem.user_id==current_user.id).first()
    print('this is backpack', backpack)
    if not backpack:
        return {'errors': 'cannot find current users backpack'},404
    return backpack.to_dict()