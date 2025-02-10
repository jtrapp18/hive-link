#!/usr/bin/env python3

import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from sklearn.linear_model import LinearRegression
from datetime import datetime
from lib.config import app, db
from lib.models import ModelHistory

def binarize_data(data, categorical_columns=None):

    if categorical_columns==None:
        categorical_columns = data.select_dtypes(include=['object']).columns
    
    # One-hot encoding categorical columns, dropping the first category to avoid multicollinearity
    binarized_data = pd.get_dummies(data, columns=categorical_columns, drop_first=True)

    return binarized_data
    
def add_predicted_values(explanatory_variables, data, model, scaler=None):
    # Ensure all explanatory variables are present in the data
    missing_vars = [var for var in explanatory_variables if var not in data.columns]
    if missing_vars:
        # For simplicity, replace missing variables with zeros
        for var in missing_vars:
            data[var] = 0  # Add missing columns with zero values

    # Extract the explanatory variables from the data
    X = data[explanatory_variables]
    
    if scaler:
        # Scale the explanatory variables if a scaler is provided
        X_scaled = scaler.transform(X)
        X_scaled_df = pd.DataFrame(X_scaled, columns=explanatory_variables)
    else:
        # If no scaler, just use the raw data (no scaling)
        X_scaled_df = X

    data['avg_predicted'] = model.predict(X_scaled_df)
    data['predicted'] = data['days']*data['avg_predicted']

    return data

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

def calculate_metrics(actual, predicted):
    # R²
    r2 = r2_score(actual, predicted)
    
    # MAE (Mean Absolute Error)
    mae = mean_absolute_error(actual, predicted)
    
    # MSE (Mean Squared Error)
    mse = mean_squared_error(actual, predicted)
    
    # RMSE (Root Mean Squared Error)
    rmse = np.sqrt(mse)
    
    return {
        'R²': r2,
        'MAE': mae,
        'MSE': mse,
        'RMSE': rmse
    }

def pull_explanatory_variables(aggregated_data):
    metadata = {'hive_id', 'honey_pull_id', 'city', 'state', 
                'data_added', 'date_reset', 
                'date_pulled', 'count', 'days', 'date_added'}
    outcomes = {'bias', 'weight', 'avg_daily_weight', 'avg_30_day_weight'}

    remaining_col = set(aggregated_data.columns) - metadata - outcomes
    explanatory_variables = list(remaining_col)

    return explanatory_variables

class ExperienceStudy:

    def __init__(self, target_variable, explanatory_variables, aggregated_data):
        self.target_variable = target_variable
        self.explanatory_variables = explanatory_variables
        self.aggregated_data = aggregated_data

        self.scaler = None
        self.model = None

        self.joblib_data = {
            'target_variable': self.target_variable,
            'explanatory_variables': self.explanatory_variables
        }
    
    def bifurcate_data(self, aggregated_data, test_size=0.3):

        # Splitting the data into train and test sets (30% test, 70% train)
        self.train_data, self.test_data = train_test_split(aggregated_data, 
                                                           test_size=test_size, random_state=42)
    
    def find_scaler(self):

        # Initialize scaler and fit on training data only
        self.scaler = StandardScaler()
        self.scaler.fit(self.train_data[self.explanatory_variables])

        # Scale train data
        self.train_data[self.explanatory_variables] = self.scaler.transform(
            self.train_data[self.explanatory_variables])

        self.joblib_data['scaler'] = self.scaler
    
    def run_experience_study(self):
        # binarized_data = binarize_data(train_data)

        X_scaled = self.scaler.transform(self.train_data[self.explanatory_variables])
        X_scaled_df = pd.DataFrame(X_scaled, columns=self.explanatory_variables)

        y = self.train_data[self.target_variable]
        
        # Train the neural network
        self.model = MLPRegressor(hidden_layer_sizes=(100,), 
                                  max_iter=500, 
                                  alpha=0.01, 
                                  random_state=42, 
                                  solver='lbfgs'
                                  )
        self.model.fit(X_scaled_df, y)
        
        # Save important objects to joblib data
        self.joblib_data.update({
            'run_date': datetime.now(),
            'model': self.model
        })

    def get_feature_importance(self):
        from sklearn.inspection import permutation_importance

        # Ensure all explanatory variables are present in the data
        missing_vars = [var for var in self.explanatory_variables if 
                        var not in self.test_data.columns]
        if missing_vars:
            raise ValueError(f"Missing explanatory variables: {missing_vars}")

        # Extract the explanatory variables from the data
        X = self.test_data[self.explanatory_variables]
        y = self.test_data[self.target_variable]

        # Scale the explanatory variables
        X_scaled = self.scaler.transform(X)
        X_scaled_df = pd.DataFrame(X_scaled, columns=self.explanatory_variables)

        result = permutation_importance(self.model, 
                                        X_scaled_df, y, n_repeats=10, random_state=42)
        importance_df = pd.DataFrame({
            'Feature': X_scaled_df.columns, 
            'Importance': result.importances_mean
            })
        importance_df = importance_df.sort_values(by='Importance', ascending=False)

        self.joblib_data['importance_df'] = importance_df
        
        return importance_df

def create_model(aggregated_data, explanatory_variables, joblib_loc):

    exp_study = ExperienceStudy(
        target_variable='avg_daily_weight', 
        explanatory_variables=explanatory_variables, 
        aggregated_data=aggregated_data
        )

    # Data processing
    exp_study.bifurcate_data(aggregated_data)   

    # Calculate scalar
    exp_study.find_scaler()

    # Fit model
    exp_study.run_experience_study()

    importance_df = exp_study.get_feature_importance()

    test_results = add_predicted_values(explanatory_variables, 
                                        exp_study.test_data, 
                                        exp_study.model, exp_study.scaler)
    exp_study.joblib_data['test_results'] = test_results

    # Calcuate metrics
    actual_values = test_results['weight']
    predicted_values = test_results['predicted']

    test_metrics = calculate_metrics(actual_values, predicted_values)

    exp_study.joblib_data['test_metrics'] = test_metrics

    try:
        joblib.dump(exp_study.joblib_data, fr'joblib/{joblib_loc}')
    except Exception as e:
        raise

    return exp_study.model, test_results, importance_df

def run_predictions(df_prediction_input, joblib_loc):

    # Load the model, scaler, and explanatory variables from the joblib file
    joblib_data = joblib.load(fr'joblib/{joblib_loc}')
    model_run_date = joblib_data['run_date']
    model = joblib_data['model']
    scaler = joblib_data['scaler']
    explanatory_variables = joblib_data['explanatory_variables']

    # Make predictions using the active model
    predicted_values = add_predicted_values(explanatory_variables, 
                                            df_prediction_input, model, scaler)
    
    pred_run_date = datetime.now()

    return predicted_values, model_run_date, pred_run_date

def get_latest_joblib():
    try:
        # Fetch the latest model in a single context
        with app.app_context():
            # First, attempt to fetch the model with both conditions (active model)
            model_record = ModelHistory.query.filter(
                ModelHistory.end_date == None, 
                ModelHistory.start_date != None
            ).first()

            if not model_record:
                print('No active model found, saving most recent model...')

                # Fetch the model without the start date condition
                model_record = ModelHistory.query.filter(
                    ModelHistory.end_date == None, 
                ).first()

                # Set the start date
                model_record.start_date = date.today()

                # Commit changes to the database
                db.session.commit()

            joblib_loc = model_record.joblib_loc
    except:
        raise ValueError('No models found')
        
    return joblib_loc