from datetime import datetime, date
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from lib.config import db

class HoneyPull(db.Model, SerializerMixin):
    __tablename__ = 'honey_pulls'

    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hives.id'), nullable=False)
    date_reset = db.Column(db.Date, nullable=False)
    date_pulled = db.Column(db.Date, nullable=True)
    weight = db.Column(db.Float, nullable=True)

    hive = db.relationship('Hive', back_populates='honey_pulls')
    inspections = db.relationship('Inspection', back_populates='honey_pull', cascade='all, delete-orphan')  

    serialize_rules = ('-hive', '-inspections.honey_pull')

    def __repr__(self):
        return f'<Honey Pull {self.id}, Hive ID: {self.hive_id}, Date: {self.date_pulled}>'

    @validates('date_reset', 'date_pulled')
    def validate_dates(self, key, value):
        """Validates that the date fields are not null and are valid dates."""
        if key == 'date_reset' and value is None:
            raise ValueError(f'{key} is required.')
        
        # If the key is 'date_pulled' and the value is None, it's allowed (optional field)
        if key == 'date_pulled' and value is None:
            return value  # Allow None for optional field
        
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
        if value is not None and (value < 0 or value > 200):  # Adjust range as needed
            raise ValueError("Weight must be between 0 and 200.")
        return value
