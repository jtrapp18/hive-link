from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False)
    message_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc)) # Forum creation timestamp
    message_text = db.Column(db.Text, nullable=False)  # Use Text for longer messages

    user = db.relationship('User', back_populates='messages')
    forum = db.relationship('Forum', back_populates='messages')

    serialize_rules = ('-user', '-forum')  # Exclude user and forum from serialization for security

    def __repr__(self):
        return f'<Message {self.id}, User ID: {self.user_id}, Forum ID: {self.forum_id}>'

    @validates('user_id')
    def validate_user_id(self, key, value):
        """Validates that the user_id is valid."""
        if value is None:
            raise ValueError('User ID is required.')
        return value

    @validates('forum_id')
    def validate_forum_id(self, key, value):
        """Validates that the forum_id is valid."""
        if value is None:
            raise ValueError('forum ID is required.')
        return value
    
    @validates('message_text')
    def validate_title(self, key, value):
        """Validates that the message_text is non-empty."""
        if not value:
            raise ValueError('Message text is required.')
        return value
