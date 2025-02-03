from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import date
from config import db

class Queen(db.Model, SerializerMixin):
    __tablename__ = 'queens'

    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hives.id'), nullable=False)  # Link to hive
    status = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(50), nullable=False)
    date_introduced = db.Column(db.Date, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    
    hive = db.relationship('Hive', back_populates='queens')
    inspections = db.relationship('Inspection', back_populates='queen', cascade='all, delete-orphan')  

    # serialize_rules = ('-status', '-origin', '-type', '-date_introduced', '-replacement_cause')

    def __repr__(self):
        return f'<Queen {self.id}, Status: {self.status}, Type: {self.type}, Origin: {self.origin}>'

    @validates('status')
    def validate_status(self, key, value):
        """Validates the queen's status."""
        valid_statuses = ['marked', 'unmarked', 'clipped']
        if value not in valid_statuses:
            raise ValueError(f"Status must be one of {', '.join(valid_statuses)}.")
        return value

    @validates('origin')
    def validate_origin(self, key, value):
        """Validates the queen's origin."""
        valid_origins = ['swarm cells', 'purchased', 'original']
        if value not in valid_origins:
            raise ValueError(f"Origin must be one of {', '.join(valid_origins)}.")
        return value

    @validates('species')
    def validate_species(self, key, value):
        """Validates the queen's species."""
        valid_species = ['Italian', 'Carniolan', 'Buckfast', 'Caucasian', 'Russian', 'Cordovan', 'Other']
        if value not in valid_species:
            raise ValueError(f"Species must be one of {', '.join(valid_species)}.")
        return value