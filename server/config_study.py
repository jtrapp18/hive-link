from config import db
from models import ExplanatoryVariable

ExplanatoryVariable.query.delete()
db.session.commit()

explanatory_variables = {
    "explanatory_variables": [
        {"variable_name": "date_checked", "data_type": "Numerical", "is_explanatory": True, "source_table": "Inspection", "description": "The date the inspection was performed"},
        {"variable_name": "temp", "data_type": "Numerical", "is_explanatory": True, "source_table": "Inspection", "description": "Temperature at the time of the inspection"},
        {"variable_name": "activity_surrounding_hive", "data_type": "Categorical", "is_explanatory": True, "source_table": "Inspection", "description": "Observed activity around the hive during inspection"},
        {"variable_name": "super_count", "data_type": "Numerical", "is_explanatory": True, "source_table": "Inspection", "description": "Count of supers present in the hive"},
        {"variable_name": "hive_body_count", "data_type": "Numerical", "is_explanatory": True, "source_table": "Inspection", "description": "Count of hive bodies present in the hive"},
        {"variable_name": "fate", "data_type": "Categorical", "is_explanatory": False, "source_table": "Inspection", "description": "Fate of the hive (target variable)"},
        {"variable_name": "material", "data_type": "Categorical", "is_explanatory": True, "source_table": "Hive", "description": "Material of the hive structure (e.g., wood, polystyrene)"},
        {"variable_name": "location_lat", "data_type": "Numerical", "is_explanatory": True, "source_table": "Hive", "description": "Latitude of the hive location"},
        {"variable_name": "location_long", "data_type": "Numerical", "is_explanatory": True, "source_table": "Hive", "description": "Longitude of the hive location"},
        {"variable_name": "status", "data_type": "Categorical", "is_explanatory": True, "source_table": "Queen", "description": "Status of the queen (e.g., active, replaced)"},
        {"variable_name": "origin", "data_type": "Categorical", "is_explanatory": True, "source_table": "Queen", "description": "Origin of the queen bee (e.g., local, purchased)"},
        {"variable_name": "species", "data_type": "Categorical", "is_explanatory": True, "source_table": "Queen", "description": "Species of the queen bee"},
        {"variable_name": "date_introduced", "data_type": "Numerical", "is_explanatory": True, "source_table": "Queen", "description": "Date the queen was introduced into the hive"}
    ]
}

# Add explanatory variables to the database
for var in explanatory_variables['explanatory_variables']:
    explanatory_variable = ExplanatoryVariable(
        variable_name=var['variable_name'],
        data_type=var['data_type'],
        is_explanatory=var['is_explanatory'],
        description=var['description'],
        source_table=var['source_table']
    )
    db.session.add(explanatory_variable)

db.session.commit()
print("Explanatory variables seeded successfully.")
