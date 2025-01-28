from config import db

class ExplanatoryVariable(db.Model):
    __tablename__ = 'explanatory_variables'
    
    id = db.Column(db.Integer, primary_key=True)
    variable_name = db.Column(db.String(50), nullable=False)
    data_type = db.Column(db.String(20), nullable=False)  # Categorical, Numerical, Boolean
    is_explanatory = db.Column(db.Boolean, default=True)  # Whether this variable is explanatory for the model
    description = db.Column(db.String(200), nullable=True)  # Optional description of the variable
    source_table = db.Column(db.String(50), nullable=True)  # The table from which this variable originates (e.g., 'Inspection', 'Hive', 'Queen')
