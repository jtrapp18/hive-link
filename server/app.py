#!/usr/bin/env python3

from models import Queen, Hive, Inspection, User
from config import app, db, api
from datetime import datetime
# from flask_migrate import Migrate
from flask import request, jsonify, session, make_response, render_template
from flask_restful import  Resource

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') \
    and request.endpoint in ['hives', 'inspections', 'queens']:
        return {'error': 'Unauthorized'}, 401
    
class ClearSession(Resource):

    def delete(self):
    
        session['user_id'] = None

        return {}, 204

class Signup(Resource):
    def post(self):
        try:
            json = request.get_json()

            # Check if the username already exists in the database
            existing_user = User.query.filter_by(username=json['username']).first()

            # Check if the email already exists in the database
            existing_email = User.query.filter_by(email=json['email']).first()        

            error_dict = {}

            if existing_user:
                error_dict['username'] = 'Username already taken.'

            if existing_email:
                error_dict['email'] = 'Email already registered.'

            if existing_user or existing_email:
                return {'error': error_dict}, 400                

            user = User(
                username=json['username'],
                first_name=json['first_name'],
                last_name=json['last_name'],
                email=json['email']
                )
            
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()  # Rollback any changes made in the transaction
            return {'error': f'An error occurred: {str(e)}'}, 500
    

class CheckSession(Resource):

    def get(self):
        
        user_id = session.get('user_id', 0)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 204

class Login(Resource):
    def post(self):
        try:
            json = request.get_json()

            username = json['username']
            user = User.query.filter_by(username=username).first()

            if not user:
                return {'error': 'Invalid username or password'}, 401

            password = json['password']

            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200

            return {'error': 'Invalid username or password'}, 401
        except Exception as e:
            return {'error': f'An error occurred: {str(e)}'}, 500

class Logout(Resource):
    
    def delete(self):
        session['user_id'] = None
        return {}, 204

class UserById(Resource):

    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)
        return make_response(jsonify(user.to_dict()), 200)
    
    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)
        
        data = request.get_json()

        for attr in data:
            setattr(user, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)
    
class Hives(Resource):
    def get(self):
        user_id = session['user_id']
        hives = [hive.to_dict() for hive in Hive.query.filter_by(user_id=user_id)]
        return make_response(jsonify(hives), 200)

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new hive
            new_hive = Hive(
                user_id=data['user_id'],  # Link the hive to the user
                date_added=data['date_added'],
                material=data['material'],
                location_lat=data['location_lat'],
                location_long=data['location_long']
            )

            # Add the new hive to the database and commit
            db.session.add(new_hive)
            db.session.commit()

            # Return the created hive as a response
            return make_response(jsonify(new_hive.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class HiveById(Resource):
    def get(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return make_response(jsonify({'error': 'Hive not found'}), 404)
        return make_response(jsonify(hive.to_dict()), 200)

    def patch(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return make_response(jsonify({'error': 'Hive not found'}), 404)
        data = request.get_json()

        for attr in data:
            setattr(hive, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(hive.to_dict()), 200)

    def delete(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return make_response(jsonify({'error': 'Hive not found'}), 404)
        db.session.delete(hive)
        db.session.commit()
        return make_response('', 204)

class Inspections(Resource):
    def get(self):
        inspections = [inspection.to_dict() for inspection in Inspection.query.all()]
        return make_response(jsonify(inspections), 200)

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new inspection
            new_inspection = Inspection(
                hive_id=data['hive_id'],  # Link the inspection to a hive
                date_checked=data['date_checked'],
                temp=data.get('temp'),
                activity_surrounding_hive=data.get('activity_surrounding_hive'),
                super_count=data.get('super_count'),
                hive_body_count=data.get('hive_body_count'),
                egg_count=data.get('egg_count'),
                larvae_count=data.get('larvae_count'),
                capped_brood=data.get('capped_brood'),
                twisted_larvae=data.get('twisted_larvae'),
                pests_surrounding=data.get('pests_surrounding'),
                stability_in_hive=data.get('stability_in_hive'),
                feeding=data.get('feeding'),
                treatment=data.get('treatment'),
                stores=data.get('stores'),
                fate=data.get('fate'),
                local_bloom=data.get('local_bloom'),
                weather_conditions=data.get('weather_conditions'),
                humidity=data.get('humidity'),
                chalkbrood_presence=data.get('chalkbrood_presence'),
                varroa_mites=data.get('varroa_mites')
            )

            # Add the new inspection to the database and commit
            db.session.add(new_inspection)
            db.session.commit()

            # Return the created inspection as a response
            return make_response(jsonify(new_inspection.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class InspectionById(Resource):
    def get(self, inspection_id):
        inspection = Inspection.query.get(inspection_id)
        if not inspection:
            return make_response(jsonify({'error': 'Inspection not found'}), 404)
        return make_response(jsonify(inspection.to_dict()), 200)

    def patch(self, inspection_id):
        inspection = Inspection.query.get(inspection_id)
        if not inspection:
            return make_response(jsonify({'error': 'Inspection not found'}), 404)
        data = request.get_json()

        for attr in data:
            setattr(inspection, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(inspection.to_dict()), 200)

    def delete(self, inspection_id):
        inspection = Inspection.query.get(inspection_id)
        if not inspection:
            return make_response(jsonify({'error': 'Inspection not found'}), 404)
        db.session.delete(inspection)
        db.session.commit()
        return make_response('', 204)

class Queens(Resource):
    def get(self):
        queens = [queen.to_dict() for queen in Queen.query.all()]
        return make_response(jsonify(queens), 200)

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new queen
            new_queen = Queen(
                hive_id=data['hive_id'],  # Link the queen to a hive
                status=data['status'],
                origin=data['origin'],
                species=data['species'],
                date_introduced=data['date_introduced'],
                replacement_cause=data.get('replacement_cause')  # Optional field
            )

            # Add the new queen to the database and commit
            db.session.add(new_queen)
            db.session.commit()

            # Return the created queen as a response
            return make_response(jsonify(new_queen.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class QueenById(Resource):
    def get(self, queen_id):
        queen = Queen.query.get(queen_id)
        if not queen:
            return make_response(jsonify({'error': 'Queen not found'}), 404)
        return make_response(jsonify(queen.to_dict()), 200)

    def patch(self, queen_id):
        queen = Queen.query.get(queen_id)
        if not queen:
            return make_response(jsonify({'error': 'Queen not found'}), 404)
        data = request.get_json()

        for attr in data:
            setattr(queen, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(queen.to_dict()), 200)

    def delete(self, queen_id):
        queen = Queen.query.get(queen_id)
        if not queen:
            return make_response(jsonify({'error': 'Queen not found'}), 404)
        db.session.delete(queen)
        db.session.commit()
        return make_response('', 204)

api.add_resource(ClearSession, '/api/clear', endpoint='clear')
api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(UserById, '/api/users/<int:user_id>')
api.add_resource(Hives, '/api/hives', endpoint='hives')
api.add_resource(HiveById, '/api/hives/<int:hive_id>')
api.add_resource(Inspections, '/api/inspections', endpoint='inspections')
api.add_resource(InspectionById, '/api/inspections/<int:inspection_id>')
api.add_resource(Queens, '/api/queens', endpoint='queens')
api.add_resource(QueenById, '/api/queens/<int:queen_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
