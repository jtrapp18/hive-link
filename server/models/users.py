from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.exc import IntegrityError
from sqlalchemy import CheckConstraint
from config import db, bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False, unique=True)

    favorites = db.relationship(
        'Favorite', back_populates='user', cascade='all, delete-orphan')
    
    orders = db.relationship(
        'Order', back_populates='user', cascade='all, delete-orphan')

    reviews = db.relationship(
        'Review', back_populates='user', cascade='all, delete-orphan')
    
    serialize_rules = ('-favorites.user', '-favorites.cookie', '-order.cart_items', 
                       '-order.user', '-cookie.cart_items', '-cookie.favorites', 
                       '-cookie.reviews', '-reviews.cookie', '-reviews.user')
    
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        self.validate_password(password)
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def validate_password(self, password):
        """Validates password complexity."""
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', password):
            raise ValueError("Password must include at least one uppercase letter.")
        if not re.search(r'[a-z]', password):
            raise ValueError("Password must include at least one lowercase letter.")
        if not re.search(r'\d', password):
            raise ValueError("Password must include at least one number.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValueError("Password must include at least one special character.")
        return True

    def __repr__(self):
        return f'<User {self.username}, ID: {self.id}>'

    @validates('username')
    def validate_username(self, key, value):
        if not value or len(value) < 3:
            raise ValueError("Username is required and must be at least 3 characters long.")
        if db.session.query(User).filter(User.username == value).first():
            raise ValueError("Username is already taken.")
        return value

    @validates('email')
    def validate_email(self, key, value):
        if value:  # Email is optional
            email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
            if not re.match(email_regex, value):
                raise ValueError("A valid email address is required.")
            if db.session.query(User).filter(User.email == value).first():
                raise ValueError("Email address is already in use.")
        return value

    @validates('first_name')
    def validate_first_name(self, key, value):
        if not value or len(value) < 1:
            raise ValueError("First name is required.")
        return value

    @validates('last_name')
    def validate_last_name(self, key, value):
        if len(value) < 1:
            raise ValueError("Last name needs to be greater than 0 characters.")
        return value

    @validates('phone_number')
    def validate_phone_number(self, key, value):
        if value:  # Phone number is optional
            phone_regex = r'^\+?1?\d{9,15}$'
            if not re.match(phone_regex, value):
                raise ValueError("Phone number must be in a valid format.")
        return value