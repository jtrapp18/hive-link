#!/usr/bin/env python3

import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from sklearn.linear_model import LinearRegression
from datetime import datetime

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
        raise ValueError(f"Missing explanatory variables: {missing_vars}")

    # Extract the explanatory variables from the data
    X = data[explanatory_variables]
    
    if scaler:
        # Scale the explanatory variables if a scaler is provided
        X_scaled = scaler.transform(X)
        X_scaled_df = pd.DataFrame(X_scaled, columns=explanatory_variables)
    else:
        # If no scaler, just use the raw data (no scaling)
        X_scaled_df = X

    data['predicted'] = model.predict(X_scaled_df)

    return data

def pull_explanatory_variables(aggregated_data):
    metadata = {'hive_id', 'honey_pull_id', 'city', 'state', 'data_added', 'date_reset', 'date_pulled', 'count', 'days', 'date_added'}
    outcomes = {'bias', 'weight'}

    remaining_col = set(aggregated_data.columns) - metadata - outcomes
    explanatory_variables = list(remaining_col)

    return explanatory_variables

class ExperienceStudy:

    def __init__(self, target_variable, explanatory_variables, aggregated_data):
        self.target_variable = target_variable
        self.explanatory_variables = explanatory_variables
        self.aggregated_data = aggregated_data

        self.joblib_data = {
            'target_variable': self.target_variable,
            'explanatory_variables': self.explanatory_variables
        }
    
    def bifurcate_data(self, aggregated_data, test_size=0.3):

        # Splitting the data into train and test sets (30% test, 70% train)
        train_data, test_data = train_test_split(aggregated_data, test_size=test_size, random_state=42)
        
        return train_data, test_data
    
    def find_scaler(self, train_data):

        # Initialize scaler and fit on training data only
        scaler = StandardScaler()
        scaler.fit(train_data[self.explanatory_variables])

        # Scale both train and test data
        train_data[self.explanatory_variables] = scaler.transform(train_data[self.explanatory_variables])

        self.joblib_data['scaler'] = scaler
        
        return scaler
    
    def run_experience_study(self, train_data, scaler):
        # binarized_data = binarize_data(train_data)

        X_scaled = scaler.transform(train_data[self.explanatory_variables])
        X_scaled_df = pd.DataFrame(X_scaled, columns=self.explanatory_variables)

        y = train_data[self.target_variable]
        
        # Train the neural network
        model = MLPRegressor(hidden_layer_sizes=(100,), max_iter=500, random_state=42)
        # model = LinearRegression()
        model.fit(X_scaled_df, y)
        
        # Save important objects to joblib data
        self.joblib_data.update({
            'run_date': datetime.now(),
            'model': model
        })

def create_model(aggregated_data, explanatory_variables, joblib_loc):

    exp_study = ExperienceStudy(
        target_variable='weight', 
        explanatory_variables=explanatory_variables, 
        aggregated_data=aggregated_data
        )

    # Data processing
    train_data, test_data = exp_study.bifurcate_data(aggregated_data)   

    # Calculate scalar
    scaler = exp_study.find_scaler(train_data)

    # Fit model
    exp_study.run_experience_study(train_data, scaler)
    model = exp_study.joblib_data['model']

    test_results = add_predicted_values(explanatory_variables, test_data, model, scaler)
    exp_study.joblib_data['test_results'] = test_results

    try:
        joblib.dump(exp_study.joblib_data, fr'joblib/{joblib_loc}')
    except Exception as e:
        raise

    return model, test_results

def run_predictions(df_prediction_input, joblib_loc):

    # Load the model, scaler, and explanatory variables from the joblib file
    joblib_data = joblib.load(fr'joblib/{joblib_loc}')
    model = joblib_data['model']
    scaler = joblib_data['scaler']
    explanatory_variables = joblib_data['explanatory_variables']

    # Make predictions using the active model
    predicted_values = add_predicted_values(explanatory_variables, df_prediction_input, model, scaler)

    return predicted_values