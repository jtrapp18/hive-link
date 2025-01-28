#!/usr/bin/env python3

import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier

from models import Hive, ExplanatoryVariable
from config import app, db, api
from datetime import datetime
from flask_restful import  Resource

def add_predicted_values(explanatory_variables, data, model):
    result_data = data.copy()
    
    # Separate features and target
    X = data[explanatory_variables]
    
    # Get predictions from the trained model
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

    def normalize_data(self, hives):
        df = pd.json_normalize(
            self.hives, 
            record_path='inspections', 
            meta=['date_added', 'id', 'location_lat', 'location_long', 'material', 'user_id'],
            errors='ignore'
        )

        return df
    
    def bifurcate_data(self, normalized_data):
        # Splitting the data into train and test sets (30% test, 70% train)
        train_data, test_data = train_test_split(normalized_data, test_size=0.3, random_state=42)
        
        # Create a column 'set' indicating whether data is from train (0) or test (1)
        train_data['train'] = 1
        test_data['train'] = 0
        
        # Concatenate back to get the full bifurcated data
        bifurcated_data = pd.concat([train_data, test_data])
        
        # Normalize the data (example: z-score normalization)
        scaler = StandardScaler()
        numerical_columns = bifurcated_data.select_dtypes(include=['float64', 'int64']).columns
        
        # Fit and transform the scaler on the training data only
        train_data[numerical_columns] = scaler.fit_transform(train_data[numerical_columns])
        
        # Transform the test data using the same scaler (to avoid data leakage)
        test_data[numerical_columns] = scaler.transform(test_data[numerical_columns])
        
        return bifurcated_data
    
    def binarize_data(self, bifurcated_data):
        # One-hot encoding of categorical variables (e.g., using pd.get_dummies)
        categorical_columns = bifurcated_data.select_dtypes(include=['object']).columns
        binarized_data = pd.get_dummies(bifurcated_data, columns=categorical_columns, drop_first=True)
        
        return binarized_data
    
    def run_experience_study(self, binarized_data):
        # Splitting the data into features (X) and target variable (y)
        X = binarized_data[self.explanatory_variables]
        y = binarized_data[self.target_variable]  # Target variable
        
        # Train a neural network model
        model = MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42)
        model.fit(X, y)
        
        # Save the trained model to a file using joblib
        self.joblib_data['run_date'] = datetime.now()
        self.joblib_data['model'] = model
        
        return model
    

class RunStudy(Resource):

    def create_model(self):
        explanatory_variables = [explanatory_variable.variable_name for explanatory_variable in ExplanatoryVariable.query.filter_by(is_explanatory=True)]
        hives = [hive.to_dict() for hive in Hive.query.all()]

        fate_study = ExperienceStudy(
            target_variable='fate', 
            explanatory_variables=explanatory_variables, 
            hives=hives
            )

        normalized_data = fate_study.normalize_data(hives)
        bifurcated_data = fate_study.bifurcate_data(normalized_data)
        binarized_data = fate_study.binarize_data(bifurcated_data)
        model = fate_study.run_experience_study(binarized_data)

        test_data = bifurcated_data.loc[bifurcated_data['train']==0]
        test_results = add_predicted_values(explanatory_variables, test_data, model)
        fate_study.joblib_data['test_results'] = test_results

        joblib.dump(fate_study.joblib_data, 'experience_study_model.joblib')

        return model, test_results

    def post(self):
        # Define the path where the model will be saved
        model_path = 'experience_study_model.joblib'

        # Check if the model already exists
        if os.path.exists(model_path):
            # If the model exists, load it from the file
            joblib_data = joblib.load(model_path)

            test_results = joblib_data['test_results']

            message = "Model loaded from file."
            status_code = 200  # HTTP status for success
        else:
            # If the model does not exist, create it
            model, result_data = self.create_model()
            message = "Model trained and saved to file."
            status_code = 201  # HTTP status for resource creation

        # Return a response to the user
        response = {
            'message': message,
            'data': test_results.to_dict(),  # Assuming result_data is a pandas DataFrame; convert to dict if needed
            'status_code': status_code
        }

        return response, status_code


        

