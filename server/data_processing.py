import experience_study as exp
import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from config import db, app

from models import Hive, ExplanatoryVariable
from datetime import datetime

def collect_data(app):
    with app.app_context():
        explanatory_variables = [explanatory_variable.variable_name for explanatory_variable in ExplanatoryVariable.query.filter_by(is_explanatory=True)]
        hives = [hive.to_dict() for hive in Hive.query.all()]

    return explanatory_variables, hives

def rename_ids(hives):
    hives_mod = [{
        **hive,
        'hive_id': hive.pop('id')
    } for hive in hives]

    hives_mod = [{
    **hive,
    'queens': [{
        **queen,
        'queen_id': queen.pop('id')  # Rename 'id' to 'queen_id' using pop
    } for queen in hive['queens']]
    } for hive in hives_mod]

    return hives_mod

def normalize_data(hives_mod):

    metadata_columns = list(hives_mod[0].keys())

    # Remove 'queens' from the metadata columns
    metadata_columns.remove('queens')
    metadata_columns.remove('hive_id')

    df_queens = pd.json_normalize(
        hives_mod, 
        record_path=['queens'],  # Extract 'queens'
        meta=metadata_columns,  
        errors='ignore'
    )

    inspections = df_queens['inspections']
    df_queens.drop(columns=['inspections'], inplace=True)

    df_inspections = pd.json_normalize(
        inspections.explode(),  # Explode to repeat inspections for each row
        errors='ignore'
    )

    df_normalized = pd.merge(df_inspections, df_queens, on='queen_id')
    df_normalized = df_normalized.rename(columns={'id': 'inspection_id'})

    return df_normalized