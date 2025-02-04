#!/usr/bin/env python3

import os
import joblib
import requests
import uuid
import pandas as pd
from models import Queen, Hive, Inspection, HoneyPull, User, Event, Signup, ModelHistory
from config import app, db, api
from datetime import datetime
# from flask_migrate import Migrate
from flask import request, session
from flask_restful import  Resource
from experience_study import create_model, add_predicted_values

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') \
    and request.endpoint in ['spongebob']:
    # and request.endpoint in ['hives', 'inspections', 'queens']:
        return {'error': 'Unauthorized'}, 401
    
class ClearSession(Resource):

    def delete(self):
    
        session['user_id'] = None

        return {}, 204

class AccountSignup(Resource):
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
                email=json['email'],
                zipcode=json['zipcode']
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
            return {'error': 'User not found'}, 404
        return user.to_dict(), 200
    
    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        data = request.get_json()

        for attr in data:
            setattr(user, attr, data.get(attr))

        db.session.commit()
        return user.to_dict(), 200
    
class Hives(Resource):
    def get(self):
        hives = [hive.to_dict() for hive in Hive.query.all()]
        return hives, 200

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new hive
            new_hive = Hive(
                user_id=data['user_id'],  # Link the hive to the user
                date_added=data['date_added'],
                material=data['material'],
                address_line=data['address_line'],
                city=data['city'],
                state=data['state'],
                postal_code=data['postal_code']
            )

            # Add the new hive to the database and commit
            db.session.add(new_hive)
            db.session.commit()

            # Return the created hive as a response
            return new_hive.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500
        
class HivesByUser(Resource):
    def get(self):
        user_id = session['user_id']
        hives = [hive.to_dict() for hive in Hive.query.filter_by(user_id=user_id)]
        return hives, 200
    
class HiveById(Resource):
    def get(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return {'error': 'Hive not found'}, 404
        return hive.to_dict(), 200

    def patch(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return {'error': 'Hive not found'}, 404
        data = request.get_json()

        for attr in data:
            setattr(hive, attr, data.get(attr))

        db.session.commit()
        return hive.to_dict(), 200

    def delete(self, hive_id):
        hive = Hive.query.get(hive_id)
        if not hive:
            return {'error': 'Hive not found'}, 404
        db.session.delete(hive)
        db.session.commit()
        return {}, 204
    
class HoneyPulls(Resource):
    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new honey pull
            new_honey_pull = HoneyPull(
                hive_id=data['hive_id'],  # Link the hive to the user
                date_reset=data['date_reset'],
                date_pulled=data['date_pulled'],
                weight=data['weight']
            )

            # Add the new honey pull to the database and commit
            db.session.add(new_honey_pull)
            db.session.commit()

            # Return the created hive as a response
            return new_honey_pull.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500
    
class HoneyPullById(Resource):
    def get(self, honey_pull_id):
        honey_pull = HoneyPull.query.get(honey_pull_id)
        if not honey_pull:
            return {'error': 'Honey Pull not found'}, 404
        return honey_pull.to_dict(), 200

    def patch(self, honey_pull_id):
        honey_pull = HoneyPull.query.get(honey_pull_id)
        if not honey_pull:
            return {'error': 'Honey Pull not found'}, 404
        data = request.get_json()

        for attr in data:
            setattr(honey_pull, attr, data.get(attr))

        db.session.commit()
        return honey_pull.to_dict(), 200

    def delete(self, honey_pull_id):
        honey_pull = HoneyPull.query.get(honey_pull_id)
        if not honey_pull:
            return {'error': 'Honey Pull not found'}, 404
        db.session.delete(honey_pull)
        db.session.commit()
        return {}, 204

class Inspections(Resource):
    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new inspection
            new_inspection = Inspection(
                hive_id=data['hive_id'],  # Link the inspection to a hive
                date_checked=data['date_checked'],
                super_count=data.get('super_count'),
                hive_body_count=data.get('hive_body_count'),
                bias=data.get('bias', 0),  # Default to 0 if not provided
                ants_present=data.get('ants_present', False),
                slugs_present=data.get('slugs_present', False),
                hive_beetles_present=data.get('hive_beetles_present', False),
                wax_moths_present=data.get('wax_moths_present', False),
                wasps_hornets_present=data.get('wasps_hornets_present', False),
                mice_present=data.get('mice_present', False),
                robber_bees_present=data.get('robber_bees_present', False),
                num_pollen_patties=data.get('num_pollen_patties', 0),
                num_sugar_syrup_frames=data.get('num_sugar_syrup_frames', 0),
                oxalic_acid_dosage=data.get('oxalic_acid_dosage', 0),
                formic_acid_dosage=data.get('formic_acid_dosage', 0),
                thymol_dosage=data.get('thymol_dosage', 0),
                apistan_dosage=data.get('apistan_dosage', 0),
                temp=data.get('temp'),
                weather_conditions=data.get('weather_conditions'),
                humidity=data.get('humidity'),
                fate=data.get('fate'),
                has_twisted_larvae=data.get('has_twisted_larvae', False),
                has_chalkbrood=data.get('has_chalkbrood', False),
                varroa_mite_count=data.get('varroa_mite_count'),
                activity_surrounding_hive=data.get('activity_surrounding_hive'),
                stability_in_hive=data.get('stability_in_hive'),
                notes=data.get('notes')
            )

            # Add the new inspection to the database and commit
            db.session.add(new_inspection)
            db.session.commit()

            # Return the created inspection as a response
            return new_inspection.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class InspectionById(Resource):
    def patch(self, inspection_id):
        inspection = Inspection.query.get(inspection_id)
        if not inspection:
            return {'error': 'Inspection not found'}, 404
        data = request.get_json()

        for attr in data:
            setattr(inspection, attr, data.get(attr))

        db.session.commit()
        return inspection.to_dict(), 200

    def delete(self, inspection_id):
        inspection = Inspection.query.get(inspection_id)
        if not inspection:
            return {'error': 'Inspection not found'}, 404
        db.session.delete(inspection)
        db.session.commit()
        return {}, 204

class Queens(Resource):
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
            return new_queen.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class QueenById(Resource):
    def patch(self, queen_id):
        queen = Queen.query.get(queen_id)
        if not queen:
            return {'error': 'Queen not found'}, 404
        data = request.get_json()

        for attr in data:
            setattr(queen, attr, data.get(attr))

        db.session.commit()
        return queen.to_dict(), 200

    def delete(self, queen_id):
        queen = Queen.query.get(queen_id)
        if not queen:
            return {'error': 'Queen not found'}, 404
        db.session.delete(queen)
        db.session.commit()
        return {}, 204
    
class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        return events, 200

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new hive
            new_event = Event(
                user_id=data['user_id'],  # Link the hive to the user
                title=data['title'],
                event_date=data['event_date'],
                descr=data['descr'],
                zipcode=data['zipcode']
            )

            # Add the new hive to the database and commit
            db.session.add(new_event)
            db.session.commit()

            # Return the created hive as a response
            return new_event.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500
    
class EventById(Resource):
    def get(self, event_id):
        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Hive not found'}, 404
        return event.to_dict(), 200

    def patch(self, event_id):
        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Event not found'}, 404
        data = request.get_json()

        for attr in data:
            setattr(event, attr, data.get(attr))

        db.session.commit()
        return event.to_dict(), 200

    def delete(self, event_id):
        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Event not found'}, 404
        db.session.delete(event)
        db.session.commit()
        return {}, 204
    
class Signups(Resource):

    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new hive
            new_signup = Signup(
                user_id=data['user_id'],  # Link the hive to the user
                event_id=data['event_id']
            )

            # Add the new hive to the database and commit
            db.session.add(new_signup)
            db.session.commit()

            # Return the created hive as a response
            return new_signup.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500
    
class SignupById(Resource):

    def delete(self, signup_id):
        signup = Signup.query.get(signup_id)
        if not signup:
            return {'error': 'Signup not found'}, 404
        db.session.delete(signup)
        db.session.commit()
        return {}, 204

class NearbyZipcodes(Resource):

    def get(self):
        API_KEY = os.getenv("ZIPCODE_API_KEY")

        zip_code = request.args.get("zip")
        radius = request.args.get("radius", 5)

        if not zip_code:
            return {'error': 'ZIP code is required'}, 400

        url = f'https://www.zipcodeapi.com/rest/{API_KEY}/radius.json/{zip_code}/{radius}/mile'

        response = requests.get(url)

        if response.status_code == 200:
            return response.json()
        else:
            return {'error': 'Failed to fetch ZIP codes'}, 500

class BeekeepingNews(Resource):

    def get(self):
        url = "https://www.googleapis.com/customsearch/v1"
        params = {
            "key": os.getenv("GSEARCH_API_KEY"),
            "cx": os.getenv("GSEARCH_ENGINE_ID"),
            "q": "beekeeping OR honeybee OR apiary",
            "sort": "date",
            "num": 10,
            "lr": "lang_en"
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            return {'error': 'Failed to fetch articles'}, 500
        
class FateStudy(Resource):

    def get(self):
        # Define the path where the model will be saved
        model = ModelHistory.query.filter_by(end_date=None).first()

        if not model:
            return {'error': 'No model found.'}, 404

        try:
            # If the model exists, load it from the file
            joblib_data = joblib.load(model.joblib_loc)
            test_results = joblib_data['test_results']

            return test_results.to_dict(), 200
        
        except Exception as e:
            app.logger.error(f"Error while fetching the model from {model.joblib_loc}: {e}")
            return {'error': 'An error occurred while fetching the model.'}, 500
    
    def post(self):
        joblib_loc = f'fate_study_{uuid.uuid4().hex}.joblib'

        try:
            # If the model does not exist, create it
            create_model(joblib_loc)

            # Save metadata for new model to database
            new_study = ModelHistory(
                joblib_loc = joblib_loc
            )

            # Add the new study to the database and commit
            db.session.add(new_study)
            db.session.commit()

            return new_study.to_dict(), 201

        except Exception as e:
            app.logger.error(f"Error while training the model: {e}")
            return {'error': str(e)}, 500

class PriorStudy(Resource):

    def patch(self):
        model = ModelHistory.query.filter_by(end_date=None).first()

        if not model:
            return {'error': 'No prior study found'}, 404
        
        if model.end_date is not None:
            return {'error': 'This study is already closed.'}, 400

        setattr(model, 'end_date', datetime.now().date())

        db.session.commit()

        return model.to_dict(), 200

class PredictStudy(Resource):

    def post(self):
        # Get the input data from the request
        input_data = request.get_json()

        if 'data' not in input_data:
            return {'error': 'No input data provided.'}, 400
        
        # Convert input data to a DataFrame with one row (the input data will be a dict)
        input_df = pd.DataFrame([input_data])

        # Fetch the latest model (you can adjust this depending on your logic for "active" model)
        model_record = ModelHistory.query.filter_by(end_date=None).first()

        if not model_record:
            return {'error': 'No active model found.'}, 404

        try:
            # Load the model, scaler, and explanatory variables from the joblib file
            joblib_data = joblib.load(model_record.joblib_loc)
            model = joblib_data['model']
            scaler = joblib_data['scaler']
            explanatory_variables = joblib_data['explanatory_variables']
            
            # Make predictions using the active model
            predicted_values = add_predicted_values(explanatory_variables, input_df, model, scaler)

            # Return the predictions
            return {'predictions': predicted_values['predictions'].to_dict()}, 200

        except Exception as e:
            app.logger.error(f"Error while making predictions: {e}")
            return {'error': 'An error occurred while processing the prediction request.'}, 500

class GraphData(Resource):

    def get(self):

        import data_processing as dclean

        hives = [hive.to_dict() for hive in Hive.query.all()]

        try:
            graphing_data = dclean.process_data_for_graphing(hives)

            return graphing_data, 200
        
        except Exception as e:
            return {'error': 'An error occurred while processing the hive data.'}, 500

class GraphDataUser(Resource):

    def get(self):

        import data_processing as dclean
        
        user_id = session['user_id']
        hives = [hive.to_dict() for hive in Hive.query.filter_by(user_id=user_id)]

        try:
            print('made it to this point')
            graphing_data = dclean.process_data_for_graphing(hives)
            print(graphing_data)

            return graphing_data, 200
        
        except Exception as e:
            return {'error': 'An error occurred while processing the hive data.'}, 500

api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(AccountSignup, '/account_signup', endpoint='account_signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(UserById, '/users/<int:user_id>')
api.add_resource(Hives, '/hives', endpoint='hives')
api.add_resource(HivesByUser, '/user_hives', endpoint='user_hives')
api.add_resource(HiveById, '/hives/<int:hive_id>')
api.add_resource(HoneyPulls, '/honey_pulls', endpoint='honey_pulls')
api.add_resource(HoneyPullById, '/honey_pulls/<int:honey_pull_id>')
api.add_resource(Inspections, '/inspections', endpoint='inspections')
api.add_resource(InspectionById, '/inspections/<int:inspection_id>')
api.add_resource(Queens, '/queens', endpoint='queens')
api.add_resource(QueenById, '/queens/<int:queen_id>')
api.add_resource(FateStudy, '/fate_study', endpoint='fate_study')
api.add_resource(PriorStudy, '/prior_study', endpoint='prior_study')
api.add_resource(PredictStudy, '/predict_study', endpoint='predict_study')
api.add_resource(Events, '/events', endpoint='events')
api.add_resource(EventById, '/events/<int:event_id>')
api.add_resource(Signups, '/signups', endpoint='signups')
api.add_resource(SignupById, '/signups/<int:signup_id>')
api.add_resource(NearbyZipcodes, '/zipcodes')
api.add_resource(BeekeepingNews, '/beekeeping_news')
api.add_resource(GraphData, '/graph_data')
api.add_resource(GraphDataUser, '/graph_data_user')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
