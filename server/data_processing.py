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
        # explanatory_variables = [explanatory_variable.variable_name for explanatory_variable in ExplanatoryVariable.query.filter_by(is_explanatory=True)]
        hives = [hive.to_dict() for hive in Hive.query.all()]

    return hives

def rename_ids(hives):
    hives_mod = [{
        **hive,
        'hive_id': hive.pop('id')
    } for hive in hives]

    hives_mod = [{
    **hive,
    'honey_pulls': [{
        **honey_pull,
        'honey_pull_id': honey_pull.pop('id')  # Rename 'id' to 'honey_pull_id' using pop
    } for honey_pull in hive['honey_pulls']]
    } for hive in hives_mod]

    return hives_mod

def normalize_data(hives_mod):

    metadata_columns = list(hives_mod[0].keys())

    # Remove 'honey pulls' from the metadata columns
    metadata_columns.remove('honey_pulls')
    metadata_columns.remove('hive_id')

    df_honey_pulls = pd.json_normalize(
        hives_mod, 
        record_path=['honey_pulls'],  # Extract 'honey_pulls'
        meta=metadata_columns,  
        errors='ignore'
    )

    inspections = df_honey_pulls['inspections']
    df_honey_pulls.drop(columns=['inspections'], inplace=True)

    df_inspections = pd.json_normalize(
        inspections.explode(),  # Explode to repeat inspections for each row
        errors='ignore'
    )

    df_normalized = pd.merge(df_inspections, df_honey_pulls, on='honey_pull_id')
    df_normalized = df_normalized.rename(columns={'id': 'inspection_id'})

    return df_normalized

def aggregate_data(df_normalized):
    df = df_normalized.copy()

    # Assuming df is your DataFrame
    df['date_checked'] = pd.to_datetime(df['date_checked'])

    df['count'] = 1

    # Add season column based on month of inspection
    df['season'] = df['date_checked'].dt.month % 12 // 3 + 1  # 1=Winter, 2=Spring, 3=Summer, 4=Fall

    hive_columns = ['date_added', 'material', 'city', 'state']
    honey_pull_columns = ['honey_pull_id', 'date_reset', 'date_pulled', 'weight']

    # # Aggregating by honey_pull_id
    df_aggregated = df.groupby(hive_columns+honey_pull_columns).agg({
        'count': 'sum',
        'temp': 'mean',
        'bias': 'mean',
        'num_pollen_patties': 'mean',
        'num_sugar_syrup_frames': 'mean',
        'varroa_mite_count': 'mean',
        'humidity': 'mean',
        'ants_present': 'sum',
        'hive_beetles_present': 'sum',
        'has_chalkbrood': 'sum'
    }).reset_index()

    return df_aggregated