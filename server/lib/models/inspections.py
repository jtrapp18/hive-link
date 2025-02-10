import enum
from datetime import datetime, date
from sqlalchemy import Enum
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from lib.config import db

class CountCategory(enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class Inspection(db.Model, SerializerMixin):
    __tablename__ = 'inspections'

# metadata
    id = db.Column(db.Integer, primary_key=True)
    # queen_id = db.Column(db.Integer, db.ForeignKey('queens.id'), nullable=False)
    honey_pull_id = db.Column(db.Integer, db.ForeignKey('honey_pulls.id'), nullable=False)
    date_checked = db.Column(db.Date, nullable=False)
    super_count = db.Column(db.Integer, nullable=True)
    hive_body_count = db.Column(db.Integer, nullable=True)

# hive conditions
    bias = db.Column(db.Integer, nullable=False)
    has_eggs = db.Column(db.Boolean, nullable=False, default=False)
    has_larvae = db.Column(db.Boolean, nullable=False, default=False)

# presence of pests
    ants_present = db.Column(db.Boolean, nullable=False, default=False)
    slugs_present = db.Column(db.Boolean, nullable=False, default=False)
    hive_beetles_present = db.Column(db.Boolean, nullable=False, default=False)  # Small Hive Beetles (SHB)
    wax_moths_present = db.Column(db.Boolean, nullable=False, default=False)  # Wax moth larvae damage
    wasps_hornets_present = db.Column(db.Boolean, nullable=False, default=False)  # Predatory attacks on bees
    mice_present = db.Column(db.Boolean, nullable=False, default=False)  # Winter hive intrusions
    robber_bees_present = db.Column(db.Boolean, nullable=False, default=False)  # Signs of hive robbing

# active hive management
    num_pollen_patties = db.Column(db.Integer, nullable=False, default=0)
    num_sugar_syrup_frames = db.Column(db.Integer, nullable=False, default=0)
    oxalic_acid_dosage = db.Column(db.Float, nullable=False, default=0)
    formic_acid_dosage = db.Column(db.Float, nullable=False, default=0)
    thymol_dosage = db.Column(db.Float, nullable=False, default=0)
    apistan_dosage = db.Column(db.Float, nullable=False, default=0)

# weather
    temp = db.Column(db.Float, nullable=True)    
    weather_conditions = db.Column(db.String(50), nullable=True)
    humidity = db.Column(db.Float, nullable=True)

# outcomes
    fate = db.Column(db.String(50), nullable=False)
    has_twisted_larvae = db.Column(db.Boolean, nullable=True)    
    has_chalkbrood = db.Column(db.Boolean, nullable=True)
    varroa_mite_count = db.Column(db.Float, nullable=True)

# additional records for beekeeper
    activity_surrounding_hive = db.Column(Enum(CountCategory), nullable=True)
    stability_in_hive = db.Column(Enum(CountCategory), nullable=True)
    notes = db.Column(db.String(255), nullable=True)

    # queen = db.relationship('Queen', back_populates='inspections')
    honey_pull = db.relationship('HoneyPull', back_populates='inspections')

    serialize_rules = ('-honey_pull',)

    def __repr__(self):
        return f'<Inspection {self.id}, Hive ID: {self.hive_id}, Honey Pull ID: {self.honey_pull}, Date: {self.date_checked}>'

    @validates('date_checked')
    def validate_date_checked(self, key, value):
        """Validates that the date_checked field is not null and is a valid date."""
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

    @validates('activity_surrounding_hive', 'stability_in_hive')
    def validate_count_category(self, key, value):
        """Validates that the count categories are one of the valid options."""
        try:
            return CountCategory(value)  # Convert the input to an Enum
        except ValueError:
            valid_values = ', '.join([category.value for category in CountCategory])
            raise ValueError(f"{key} must be one of {valid_values}.")

    @validates('fate')
    def validate_fate(self, key, value):
        """Validates the hive fate."""
        valid_fates = ['Dead', 'Swarmed', 'Split', 'Active']
        if value not in valid_fates:
            raise ValueError(f"Fate must be one of {', '.join(valid_fates)}.")
        return value

    @validates('weather_conditions')
    def validate_weather_conditions(self, key, value):
        """Validates the weather conditions."""
        valid_weather = ['Sunny', 'Overcast', 'Rainy', 'Snowy', 'Windy']
        if value not in valid_weather:
            raise ValueError(f"Weather conditions must be one of {', '.join(valid_weather)}.")
        return value

    @validates('temp')
    def validate_temperature(self, key, value):
        """Validates temperature is within a reasonable range."""
        if value is not None and (value < -10 or value > 50):  # Adjust range as needed
            raise ValueError("Temperature must be between -10 and 50.")
        return value

    @validates('humidity')
    def validate_humidity(self, key, value):
        """Validates humidity is within a reasonable range."""
        if value is not None and (value < 0 or value > 100):
            raise ValueError("Humidity must be between 0 and 100.")
        return value