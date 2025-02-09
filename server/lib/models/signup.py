from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from lib.config import db

class Signup(db.Model, SerializerMixin):
    __tablename__ = 'signups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)

    user = db.relationship('User', back_populates='signups')
    event = db.relationship('Event', back_populates='signups')

    serialize_rules = ('-user', '-event')

    def __repr__(self):
        return f'<Signup {self.id}, User ID: {self.user_id}, Event ID: {self.event_id}>'

    @validates('user_id')
    def validate_user_id(self, key, value):
        """Validates that the user_id is valid."""
        if value is None:
            raise ValueError('User ID is required.')
        return value

    @validates('event_id')
    def validate_event_id(self, key, value):
        """Validates that the event_id is valid."""
        if value is None:
            raise ValueError('Event ID is required.')
        return value
