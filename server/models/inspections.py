from sqlalchemy.orm import validates
from config import db

class CountCategory(enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class Inspection(db.Model, SerializerMixin):
    __tablename__ = 'inspections'

    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hives.id'), nullable=False)
    date_checked = db.Column(db.Date, nullable=False)
    temp = db.Column(db.Float, nullable=True)
    activity_surrounding_hive = db.Column(db.String(50), nullable=True)
    super_count = db.Column(db.Integer, nullable=True)
    hive_body_count = db.Column(db.Integer, nullable=True)
    egg_count = db.Column(Enum(CountCategory), nullable=True)
    larvae_count = db.Column(Enum(CountCategory), nullable=True)
    capped_brood = db.Column(Enum(CountCategory), nullable=True)
    twisted_larvae = db.Column(db.Boolean, nullable=True)
    pests_surrounding = db.Column(db.String(50), nullable=True)
    stability_in_hive = db.Column(Enum(CountCategory), nullable=True)
    feeding = db.Column(db.String(50), nullable=True)  # Type of food (e.g. Sugar Syrup, Pollen Patties)
    treatment = db.Column(db.String(50), nullable=True)  # Type of treatment (e.g. Oxalic Acid)
    stores = db.Column(Enum(CountCategory), nullable=True)  # Low, Medium, High
    fate = db.Column(db.String(50), nullable=True)
    local_bloom = db.Column(db.String(50), nullable=True)
    weather_conditions = db.Column(db.String(50), nullable=True)
    humidity = db.Column(db.Float, nullable=True)
    chalkbrood_presence = db.Column(db.Boolean, nullable=True)
    varroa_mites = db.Column(db.Boolean, nullable=True)

    hive = db.relationship('Hive', back_populates='inspections')

    # serialize_rules = ('-activity_surrounding', '-pests_surrounding', '-feeding', '-treatment', 
                    #    '-stores', '-fate', '-local_bloom', '-weather_conditions', '-chalkbrood_presence', '-varroa_mites')

    def __repr__(self):
        return f'<Inspection {self.id}, Hive ID: {self.hive_id}, Queen ID: {self.queen_id}, Date: {self.date_checked}>'

    @validates('local_bloom', 'activity_surrounding', 'egg_count', 'larvae_count', 'capped_brood', 'stability_in_hive', 'stores')
    def validate_count_category(self, key, value):
        """Validates that the count categories are one of the valid options."""
        valid_categories = [CountCategory.LOW, CountCategory.MEDIUM, CountCategory.HIGH]
        if value not in valid_categories:
            raise ValueError(f"{key} must be one of {', '.join([category.value for category in valid_categories])}.")
        return value
    
    @validates('feeding')
    def validate_feeding(self, key, value):
        """Validates the feeding type."""
        valid_feedings = ['None', 'Sugar syrup', 'Pollen patty', 'Other']
        if value not in valid_feedings:
            raise ValueError(f"Feeding must be one of {', '.join(valid_feedings)}.")
        return value

    @validates('treatment')
    def validate_treatment(self, key, value):
        """Validates the treatment type."""
        valid_treatments = ['None', 'Formic acid', 'Thymol', 'Oxalic acid', 'Other']
        if value not in valid_treatments:
            raise ValueError(f"Treatment must be one of {', '.join(valid_treatments)}.")
        return value

    @validates('fate')
    def validate_fate(self, key, value):
        """Validates the hive fate."""
        valid_fates = ['Dead', 'Swarmed', 'Split', 'Thriving']
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

    @validates('pests_surrounding')
    def validate_pests_surrounding(self, key, value):
        """Validates the pests surrounding the hive."""
        valid_pests = ['None', 'Ants', 'Slugs', 'Mites', 'Other']
        if value not in valid_pests:
            raise ValueError(f"Pests surrounding must be one of {', '.join(valid_pests)} or None.")
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