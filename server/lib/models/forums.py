from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from lib.config import db

class Forum(db.Model, SerializerMixin):
    __tablename__ = 'forums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User who created the forum
    title = db.Column(db.String(255), nullable=False)  # Name of the forum
    category = db.Column(db.String(255), nullable=True)  # Optional category/description
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc)) # Forum creation timestamp

    user = db.relationship('User', back_populates='forums')
    messages = db.relationship('Message', back_populates='forum', cascade='all, delete-orphan')

    # serialize_rules = ('user', '-messages.forum', '-messages.user')  # Exclude user and forum from serialization for security
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'category': self.category,
            'created_at': self.created_at.isoformat(),
            'user': {
                'id': self.user.id,
                'username': self.user.username
            },
            'messages': [message.to_dict() for message in self.messages]  # Ensure messages also use a safe serialization method
        }
    
    def __repr__(self):
        return f'<Forum {self.id}, User ID: {self.user_id}, Title: {self.title}>'

    @validates('title')
    def validate_title(self, key, value):
        """Validates that the title is non-empty."""
        if not value:
            raise ValueError('Title is required.')
        return value