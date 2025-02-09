from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from lib.config import db

class Reply(db.Model, SerializerMixin):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
    reply_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc)) # message creation timestamp
    reply_text = db.Column(db.Text, nullable=False)  # Use Text for longer replies

    user = db.relationship('User', back_populates='replies')
    message = db.relationship('Message', back_populates='replies')

    # serialize_rules = ('-user', '-message')  # Exclude user and message from serialization for security

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message_id': self.message_id,
            'reply_text': self.reply_text,
            'reply_date': self.reply_date.isoformat(),
            'user': {
                'id': self.user.id,
                'username': self.user.username
            },
        }
    
    def __repr__(self):
        return f'<Reply {self.id}, User ID: {self.user_id}, Message ID: {self.message_id}>'

    @validates('user_id')
    def validate_user_id(self, key, value):
        """Validates that the user_id is valid."""
        if value is None:
            raise ValueError('User ID is required.')
        return value

    @validates('message_id')
    def validate_message_id(self, key, value):
        """Validates that the message_id is valid."""
        if value is None:
            raise ValueError('message ID is required.')
        return value
    
    @validates('reply_text')
    def validate_title(self, key, value):
        """Validates that the reply_text is non-empty."""
        if not value:
            raise ValueError('Reply text is required.')
        return value