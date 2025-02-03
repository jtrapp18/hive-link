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
    address_line = db.Column(db.String(100), nullable=False)  # Full street address
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(10), nullable=False)

    user = db.relationship('User', back_populates='hives')
    # queens = db.relationship('Queen', back_populates='hive', cascade='all, delete-orphan')
    honey_pulls = db.relationship('HoneyPull', back_populates='hive', cascade='all, delete-orphan')

    # Association proxy to get inspections for this hive through honey pulls
    inspections = association_proxy('honey_pulls', 'inspection',
                                 creator=lambda inspection_obj: HoneyPull(inspection=inspection_obj))

    serialize_rules = ('-user', '-honey_pulls.hive', '-honey_pulls.inspections.honey_pull', '-inspections.honey_pull')

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

    @validates('postal_code')
    def validate_postal_code(self, key, value):
        """Validates postal code format."""
        if isinstance(value, str) and value.isdigit() and len(value) in [5, 9]:
            return value
        raise ValueError("Invalid postal code format. Must be 5 or 9 digits.")

    @validates('address_line')
    def validate_address_line(self, key, value):
        """Ensures address line is not empty and properly formatted."""
        if not value:
            raise ValueError('Address line is required.')
        return value.strip()

    @validates('city')
    def validate_city(self, key, value):
        """Ensures city name is non-empty and formatted properly."""
        if not value:
            raise ValueError('City is required.')
        return value.strip()
    
    @validates('state')
    def validate_state(self, key, value):
        """Ensures state name is non-empty and properly formatted."""
        if not value:
            raise ValueError('State is required.')
        return value.strip()