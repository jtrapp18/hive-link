from config import db
from datetime import date

class ModelHistory(db.Model):
    __tablename__ = 'model_history'
    
    id = db.Column(db.Integer, primary_key=True)
    joblib_loc = db.Column(db.String(50), nullable=False)
    run_date = db.Column(db.Date, nullable=False, default=date.today)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)