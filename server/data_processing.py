import copy
import pandas as pd
import numpy as np
from models import Hive

def collect_data(app):
    with app.app_context():
        # explanatory_variables = [explanatory_variable.variable_name for explanatory_variable in ExplanatoryVariable.query.filter_by(is_explanatory=True)]
        hives = [hive.to_dict() for hive in Hive.query.all()]

    return hives

def rename_ids(hives):
    # Use deep copy to ensure that nested objects are also copied
    hives_mod = [copy.deepcopy(hive) for hive in hives]

    # Rename 'id' to 'hive_id' in each hive
    for hive in hives_mod:
        hive['hive_id'] = hive.pop('id')

        # Rename 'id' to 'honey_pull_id' in the nested honey_pulls
        if 'honey_pulls' in hive:
            for honey_pull in hive['honey_pulls']:
                honey_pull['honey_pull_id'] = honey_pull.pop('id', None)

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
    df_normalized = df_normalized.replace({np.nan: None})

    categorical_columns = ['fate', 'material', 'activity_surrounding_hive', 'stability_in_hive']
    df_normalized = pd.get_dummies(df_normalized, columns=categorical_columns, drop_first=True)

    return df_normalized

def filter_data(df_normalized, actuals=True):
    df = df_normalized.copy()

    not_yet_pulled = df['date_pulled'].isna()

    if actuals:
        df_filtered = df.loc[~not_yet_pulled].copy()
    else:
        df_filtered = df.loc[not_yet_pulled].copy()
        df_filtered.drop(columns=['weight', 'date_pulled'], inplace=True)

    return df_filtered

def aggregate_data(df_filtered):
    df = df_filtered.copy()

    df['count'] = 1

    # convert to datetime
    df['date_checked'] = pd.to_datetime(df['date_checked'])

    # Add season column based on month of inspection
    df['season'] = df['date_checked'].dt.month % 12 // 3 + 1  # 1=Winter, 2=Spring, 3=Summer, 4=Fall

    hive_columns = ['hive_id', 'date_added', 'city', 'state']
    honey_pull_columns_1 = ['honey_pull_id', 'date_reset']
    honey_pull_columns_2 = ['weight', 'date_pulled'] if 'weight' in df.columns else []

    # Identifying material columns dynamically
    material_columns = [col for col in df.columns if col.startswith('material_')]

    # # Aggregating by honey_pull_id
    df_aggregated = df.groupby(hive_columns+honey_pull_columns_1+honey_pull_columns_2).agg({
        'count': 'sum',
        'temp': 'mean',
        'bias': 'mean',
        'num_pollen_patties': 'mean',
        'num_sugar_syrup_frames': 'mean',
        'varroa_mite_count': 'mean',
        'humidity': 'mean',
        'ants_present': 'sum',
        'slugs_present': 'sum',
        'hive_beetles_present': 'sum',
        'wax_moths_present': 'sum',
        'wasps_hornets_present': 'sum',
        'mice_present': 'sum',
        'robber_bees_present': 'sum',
        'has_chalkbrood': 'sum',
        'has_twisted_larvae': 'sum',
        **{col: 'sum' for col in material_columns}
    }).reset_index()

    date_end = pd.to_datetime(df_aggregated['date_pulled']) if 'date_pulled' in df_aggregated.columns else pd.to_datetime('today')
    df_aggregated['days'] = (date_end - pd.to_datetime(df_aggregated['date_reset'])).dt.days

    return df_aggregated

def process_data_for_analysis(hives, actuals=True):
    hives_mod = rename_ids(hives)
    df_normalized = normalize_data(hives_mod)
    df_filtered = filter_data(df_normalized, actuals)
    df_aggregated = aggregate_data(df_filtered)

    return df_normalized, df_aggregated

def process_data_for_graphing(hives):
    df_normalized, df_aggregated = process_data_for_analysis(hives)

    json_normalized = df_normalized.to_dict(orient='list')
    json_aggregated = df_aggregated.to_dict(orient='list')

    return {
        'normalized': json_normalized,
        'aggregated': json_aggregated
    }