from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    cookie = db.relationship('Cookie', back_populates='favorites')

    serialize_rules = ('-user.orders', '-user.favorites', '-user.reviews', 
                       '-cookie.cart_items')

    __table_args__ = (
        CheckConstraint('user_id > 0', name='check_valid_user_id'),
        CheckConstraint('cookie_id > 0', name='check_valid_cookie_id'),
    )

    def __repr__(self):
        return f'<Favorite {self.id}, Cookie id: {self.cookie_id}, User id: {self.user_id}>'

    @staticmethod
    def validate_favorite_data(data):
        """Performs validation on favorite data before insertion."""
        errors = {}

        # Validate user_id
        if 'user_id' not in data or not isinstance(data['user_id'], int) or data['user_id'] <= 0:
            errors['user_id'] = 'A valid user ID is required.'

        # Validate cookie_id
        if 'cookie_id' not in data or not isinstance(data['cookie_id'], int) or data['cookie_id'] <= 0:
            errors['cookie_id'] = 'A valid cookie ID is required.'

        if errors:
            raise ValueError(errors)