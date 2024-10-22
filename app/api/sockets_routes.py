from flask import Blueprint, request
from flask_login import login_required, current_user
from flask_socketio import SocketIO, emit
import os
# from app import app

# socket_routes = Blueprint('socket_routes', __name__)


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)







@socketio.on('chat')
def starting_function(data):
    '''
    route for sockets
    '''
    # print('\n\n are we here? \n\n')
    emit("chat", data, broadcast=True)
