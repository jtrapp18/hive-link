#!/usr/bin/env python3

from models import Queen, Hive, Inspection, User
from config import app, db, api
from datetime import datetime
# from flask_migrate import Migrate
from flask import request, jsonify, session, make_response, render_template
from flask_restful import  Resource

class CheckSession(Resource):

    def get(self):
        
        user_id = session.get('user_id', 0)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 204
