from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from sqlalchemy.orm import validates
from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review_title = db.Column(db.String(255), nullable=False)
    review_body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    cookie = db.relationship('Cookie', back_populates='reviews')

    serialize_rules = ('-user.orders', '-user.favorites', '-user.reviews', 
                       '-cookie.cart_items', '-cookie.favorites')

    def __repr__(self):
        return f'<Review {self.id}, {self.rating}>' + \
               f'<Cookie id: {self.cookie_id}, User id: {self.user_id}>'

    @hybrid_property
    def short_review(self):
        """Returns a short version of the review body (first 50 characters)."""
        return self.review_body[:50] + '...' if len(self.review_body) > 50 else self.review_body


    @validates('rating')
    def validate_rating(self, key, value):
        if value is None or not (1 <= value <= 5):
            raise ValueError('Rating must be between 0 and 5.')
        return value

    @validates('review_title')
    def validate_review_title(self, key, value):
        if not value or not value.strip():
            raise ValueError('Review title is required.')
        return value.strip()

    @validates('review_body')
    def validate_review_body(self, key, value):
        if not value or len(value.strip()) < 1:
            raise ValueError('Review body must be at least 1 character long.')
        return value.strip()