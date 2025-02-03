from datetime import datetime, date
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class HoneyPull(db.Model, SerializerMixin):
    __tablename__ = 'honey_pulls'

    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hives.id'), nullable=False)
    date_reset = db.Column(db.Date, nullable=False)
    date_pulled = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Float, nullable=True)

    hive = db.relationship('Hive', back_populates='honey_pulls')
    inspections = db.relationship('Inspection', back_populates='honey_pull', cascade='all, delete-orphan')  

    # serialize_rules = ('-activity_surrounding', '-pests_surrounding', '-feeding', '-treatment', 
                    #    '-stores', '-fate', '-local_bloom', '-weather_conditions', '-chalkbrood_presence', '-varroa_mites')

    def __repr__(self):
        return f'<Honey Pull {self.id}, Hive ID: {self.hive_id}, Date: {self.date_pulled}>'

    @validates('date_reset', 'date_pulled')
    def validate_dates(self, key, value):
        """Validates that the date fields are not null and are valid dates."""
        if value is None:
            raise ValueError(f'{key} is required.')
        
        # Check if the value is a valid date object
        if isinstance(value, str):
            try:
                # Ensure that the string matches the expected date format
                datetime.strptime(value, '%Y-%m-%d')  # Adjust format as needed
            except ValueError:
                raise ValueError(f"Invalid date format for {key}. Must be a valid date.")
        elif isinstance(value, datetime) or isinstance(value, date):
            # If the value is a datetime or date object, it's valid
            pass
        else:
            raise ValueError('Invalid date format. Must be a string or datetime object.')
        
        return value

    @validates('weight')
    def validate_weight(self, key, value):
        """Validates weight is within a reasonable range."""
        if value is not None and (value < -10 or value > 50):  # Adjust range as needed
            raise ValueError("Weight must be between -10 and 50.")
        return value
