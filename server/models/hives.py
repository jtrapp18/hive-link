from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Date, Float
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

class Hive(db.Model, SerializerMixin):
    __tablename__ = 'hives'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Link to user
    date_added = db.Column(db.Date, nullable=False)
    material = db.Column(db.String(50), nullable=False)  # e.g. Wood, Polystyrene, Other
    location_lat = db.Column(db.Float, nullable=False)  # Latitude of the hive
    location_long = db.Column(db.Float, nullable=False)  # Longitude of the hive

    user = db.relationship('User', back_populates='hives')
    queens = db.relationship('Queen', back_populates='hive', cascade='all, delete-orphan')
    honey_pulls = db.relationship('HoneyPull', back_populates='hive', cascade='all, delete-orphan')

    # Association proxy to get inspections for this hive through queens
    inspections = association_proxy('queens', 'inspection',
                                 creator=lambda inspection_obj: Queen(inspection=inspection_obj))

    serialize_rules = ('-user', '-queens.hive', '-honey_pulls.hive', '-queens.inspections.queen', '-inspections.queen')

    def __repr__(self):
        return f'<Hive {self.id}, Date Added: {self.date_added}, Material: {self.material}>'

    @validates('material')
    def validate_material(self, key, value):
        """Validates that the material field is non-empty and is one of the valid options."""
        valid_materials = ['Wood', 'Polystyrene', 'Other']
        if not value:
            raise ValueError('Material is required.')
        if value not in valid_materials:
            raise ValueError(f"Material must be one of {', '.join(valid_materials)}.")
        return value

    @validates('date_added')
    def validate_date_added(self, key, value):
        """Validates that the date_added field is not null and is a valid date."""
        if value is None:
            raise ValueError('Date added is required.')
        
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

    @validates('location_lat')
    def validate_location_lat(self, key, value):
        """Validates that the latitude is not null."""
        if value is None:
            raise ValueError('Latitude is required.')
        if not (-90 <= value <= 90):
            raise ValueError('Latitude must be between -90 and 90 degrees.')
        return value

    @validates('location_long')
    def validate_location_long(self, key, value):
        """Validates that the longitude is not null."""
        if value is None:
            raise ValueError('Longitude is required.')
        if not (-180 <= value <= 180):
            raise ValueError('Longitude must be between -180 and 180 degrees.')
        return value