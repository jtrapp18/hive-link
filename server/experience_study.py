#!/usr/bin/env python3

import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier

from models import Hive, ExplanatoryVariable
from datetime import datetime

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

    def create_mite_risk_level(self, data):
        # Here you can define how to categorize mite risk level based on data
        # Example: Create 'mite_risk_level' based on mite count and hive health
        conditions = []

        # Example thresholds for mite risk levels (these would depend on your data)
        conditions.append((data['mite_count'] < 10, 'Low'))
        conditions.append((data['mite_count'] >= 10 and data['mite_count'] < 50, 'Medium'))
        conditions.append((data['mite_count'] >= 50, 'High'))

        # Apply conditions to determine mite risk level
        data['mite_risk_level'] = 'Low'  # Default value
        for condition, risk_level in conditions:
            data.loc[condition, 'mite_risk_level'] = risk_level
        
        return data['mite_risk_level']  # This will be your target variable
    
    def run_experience_study(self, train_data, scaler):
        binarized_data = binarize_data(train_data)

        train_data_scaled = scaler.transform(binarized_data)
        train_data_scaled_df = pd.DataFrame(train_data_scaled, columns=binarized_data.columns)

        # Features and target
        X = train_data_scaled_df[self.explanatory_variables]
        # y = train_data_scaled_df[self.target_variable]
        y = self.create_mite_risk_level(train_data)
        
        # Train the neural network
        model = MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42)

        model.fit(X, y)

        # Save important objects to joblib data
        self.joblib_data.update({
            'run_date': datetime.now(),
            'model': model
        })

def create_model(joblib_loc):
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
        raise

    return model, test_results