from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User who created the event
    title = db.Column(db.String(255), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    descr = db.Column(db.String(500), nullable=True)  # Event description (optional)
    zipcode = db.Column(db.String, nullable=False)  # Zipcode (can be used for location)

    user = db.relationship('User', back_populates='events')
    signups = db.relationship('Signup', back_populates='event', cascade='all, delete-orphan')

    serialize_rules = ('-user', '-signups.event')  # Exclude user and event from serialization for security

    def __repr__(self):
        return f'<Event {self.id}, Title: {self.title}, Date: {self.event_date}, Zipcode: {self.zipcode}>'

    @validates('title')
    def validate_title(self, key, value):
        """Validates that the title is non-empty."""
        if not value:
            raise ValueError('Title is required.')
        return value

    @validates('event_date')
    def validate_event_date(self, key, value):
        """Validates that the event_date is not null and is a valid date."""
        if value is None:
            raise ValueError('Event date is required.')
        
        # Ensure that the value is a valid date object
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

    @validates('zipcode')
    def validate_zipcode(self, key, value):
        if isinstance(value, str) and value.isdigit() and len(value) in [5, 9]:  # Adjust length based on your postal code format
            return value
        raise ValueError("Invalid zipcode format")