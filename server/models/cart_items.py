from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db

class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    num_cookies = db.Column(db.Integer, default=1, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'), nullable=False)

    order = db.relationship('Order', back_populates='cart_items')
    cookie = db.relationship('Cookie', back_populates='cart_items')

    serialize_rules = ('-order.cart_items', '-order.user', '-cookie.cart_items', 
                       '-cookie.reviews')

    __table_args__ = (
        CheckConstraint('num_cookies > 0', name='check_positive_num_cookies'),
    )

    def __repr__(self):
        return f'<Cart Item {self.id}, {self.num_cookies}>' + \
               f'<Cookie id: {self.cookie_id}, Order id: {self.order_id}>'

    @staticmethod
    def validate_cart_item_data(data):
        """Performs validation on cart item data before insertion."""
        errors = {}

        # Validate num_cookies
        if 'num_cookies' not in data or not isinstance(data['num_cookies'], int) or data['num_cookies'] <= 0:
            errors['num_cookies'] = 'num_cookies is required and must be a positive integer.'

        # Validate order_id
        if 'order_id' not in data or not isinstance(data['order_id'], int) or data['order_id'] <= 0:
            errors['order_id'] = 'order_id is required and must be a valid positive integer.'

        # Validate cookie_id
        if 'cookie_id' not in data or not isinstance(data['cookie_id'], int) or data['cookie_id'] <= 0:
            errors['cookie_id'] = 'cookie_id is required and must be a valid positive integer.'

        if errors:
            raise ValueError(errors)