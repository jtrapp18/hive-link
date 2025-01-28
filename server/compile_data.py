#!/usr/bin/env python3

import os
import joblib
import pandas as pd
import uuid
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier

from models import Hive, ExplanatoryVariable, ModelHistory
from config import app, db, api
from datetime import datetime
from flask_restful import  Resource

def binarize_data(data):
    categorical_columns = data.select_dtypes(include=['object']).columns
    
    # One-hot encoding categorical columns, dropping the first category to avoid multicollinearity
    binarized_data = pd.get_dummies(data, columns=categorical_columns, drop_first=True)

    return binarized_data

def add_predicted_values(explanatory_variables, data, model, scaler=None):

    result_data = binarize_data(data)

    missing_vars = [var for var in explanatory_variables if var not in data.columns]
    if missing_vars:
        raise ValueError(f"Missing explanatory variables: {missing_vars}")

    expected_columns = set(explanatory_variables)
    actual_columns = set(result_data.columns)
    missing_columns = expected_columns - actual_columns
    if missing_columns:
        raise ValueError(f"Missing columns after binarization: {missing_columns}")

    if scaler:
        # Scale the features if a scaler is provided
        numerical_columns = data.select_dtypes(include=['float64', 'int64']).columns
        result_data[numerical_columns] = scaler.transform(data[numerical_columns])

    # Select features and make predictions
    X = result_data[explanatory_variables]
    result_data['predictions'] = model.predict(X)

    return result_data

class ExperienceStudy:

    def __init__(self, target_variable, explanatory_variables, hives):
        self.target_variable = target_variable
        self.explanatory_variables = explanatory_variables
        self.hives = hives

        self.joblib_data = {
            target_variable: self.target_variable,
            explanatory_variables: self.explanatory_variables
        }

    def normalize_data(self):

        if not all(key in hive for hive in self.hives for key in ['inspections', 'date_added']):
            raise ValueError("Hives are missing required keys.")

        df = pd.json_normalize(
            self.hives, 
            record_path='inspections', 
            meta=['date_added', 'id', 'location_lat', 'location_long', 'material', 'user_id'],
            errors='ignore'
        )

        return df
    
    def bifurcate_data(self, normalized_data, test_size=0.3):

        # Splitting the data into train and test sets (30% test, 70% train)
        train_data, test_data = train_test_split(normalized_data, test_size=test_size, random_state=42)
        
        return train_data, test_data
    
    def find_scaler(self, train_data):
        numerical_columns = train_data.select_dtypes(include=['float64', 'int64']).columns

        # Initialize scaler and fit on training data only
        scaler = StandardScaler()
        scaler.fit(train_data[numerical_columns])

        # Scale both train and test data
        train_data[numerical_columns] = scaler.transform(train_data[numerical_columns])

        self.joblib_data['scaler'] = scaler
        
        return scaler
    
    def run_experience_study(self, train_data, scaler):
        binarized_data = binarize_data(train_data)

        train_data_scaled = scaler.transform(binarized_data)
        train_data_scaled_df = pd.DataFrame(train_data_scaled, columns=binarized_data.columns)

        # Features and target
        X = train_data_scaled_df[self.explanatory_variables]
        y = train_data_scaled_df[self.target_variable]
        
        # Train the neural network
        model = MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42)

        app.logger.info("Training the neural network model...")
        model.fit(X, y)
        app.logger.info("Model training completed.")
        
        # Save important objects to joblib data
        self.joblib_data.update({
            'run_date': datetime.now(),
            'model': model
        })

class FateStudy(Resource):

    def create_model(self, joblib_loc):
        explanatory_variables = [explanatory_variable.variable_name for explanatory_variable in ExplanatoryVariable.query.filter_by(is_explanatory=True)]
        hives = [hive.to_dict() for hive in Hive.query.all()]

        fate_study = ExperienceStudy(
            target_variable='fate', 
            explanatory_variables=explanatory_variables, 
            hives=hives
            )

        # Data processing
        normalized_data = fate_study.normalize_data()
        train_data, test_data = fate_study.bifurcate_data(normalized_data)   

        # Calculate scalar
        scaler = fate_study.find_scaler(train_data)

        # Fit model
        model = fate_study.run_experience_study(train_data, scaler)        

        test_results = add_predicted_values(explanatory_variables, test_data, model, scaler)
        fate_study.joblib_data['test_results'] = test_results

        try:
            joblib.dump(fate_study.joblib_data, joblib_loc)
        except Exception as e:
            app.logger.error(f"Error while saving model: {e}")
            raise

        return model, test_results

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
            self.create_model(joblib_loc)

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
