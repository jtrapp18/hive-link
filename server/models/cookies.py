from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db

class Cookie(db.Model, SerializerMixin):
    __tablename__ = 'cookies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    price = db.Column(db.Float, nullable=False)
    is_vegan = db.Column(db.Boolean, default=False, nullable=False)
    is_gluten_free = db.Column(db.Boolean, default=False, nullable=False)
    has_nuts = db.Column(db.Boolean, default=False, nullable=False)
    frosting = db.Column(db.String)

    favorites = db.relationship(
        'Favorite', back_populates='cookie', cascade='all, delete-orphan')
    
    cart_items = db.relationship(
        'CartItem', back_populates='cookie', cascade='all, delete-orphan')
    
    reviews = db.relationship(
        'Review', back_populates='cookie', cascade='all, delete-orphan')
    
    serialize_rules = ('-cart_items.cookie', '-cart_items.order', '-cart_items.cookie_id',
                       '-favorites.cookie', '-favorites.user',
                       '-reviews.cookie', '-reviews.user._password_hash',
                       '-reviews.user.address', '-reviews.user.email', '-reviews.user.phone_number')

    __table_args__ = (
        CheckConstraint('price >= 0', name='check_positive_price'),
    )

    def __repr__(self):
        return f'<Cookie {self.id}, {self.name}, {self.price}>'

    @staticmethod
    def validate_cookie_data(data):
        """Performs validation on cookie data before insertion."""
        errors = {}

        # Validate name
        if 'name' not in data or not isinstance(data['name'], str) or len(data['name'].strip()) == 0:
            errors['name'] = 'Name is required and must be a non-empty string.'

        # Validate image URL (if provided)
        if 'image' in data and data['image']:
            if not isinstance(data['image'], str) or not data['image'].startswith(('http://', 'https://')):
                errors['image'] = 'Image must be a valid URL starting with http:// or https://'

        # Validate price
        if 'price' not in data or not isinstance(data['price'], (int, float)) or data['price'] < 0:
            errors['price'] = 'Price must be a positive number.'

        # Validate boolean fields
        for field in ['is_vegan', 'is_gluten_free', 'has_nuts']:
            if field in data and not isinstance(data[field], bool):
                errors[field] = f'{field} must be a boolean value.'

        # Validate frosting (optional but if provided, must be a string)
        if 'frosting' in data and data['frosting']:
            if not isinstance(data['frosting'], str) or len(data['frosting'].strip()) == 0:
                errors['frosting'] = 'Frosting must be a non-empty string if provided.'

        if errors:
            raise ValueError(errors)