from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint
from config import db
from datetime import date

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    purchase_complete = db.Column(db.Boolean, default=False, nullable=False)
    order_date = db.Column(db.Date, nullable=False, default=date.today)
    delivery_date = db.Column(db.Date, nullable=True)
    order_total = db.Column(db.Float, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='orders')

    cart_items = db.relationship(
        'CartItem', back_populates='order', cascade='all, delete-orphan')

    serialize_rules = ('-user', '-cart_items.order')

    __table_args__ = (
        CheckConstraint('order_total >= 0', name='check_order_total_positive'),
    )

    def __repr__(self):
        return f'<Order {self.id}, {self.order_date}>' + \
               f'<For User {self.user_id}>'

    @hybrid_property
    def is_delivered(self):
        """Check if the order has been delivered."""
        return self.delivery_date is not None and self.delivery_date <= date.today()

    @staticmethod
    def validate_order_data(data):
        """Performs manual validation on order data before insertion."""
        errors = {}

        # Order date validation (should not be in the future)
        if 'order_date' in data:
            try:
                order_date = date.fromisoformat(data['order_date'])
                if order_date > date.today():
                    errors['order_date'] = 'Order date cannot be in the future.'
            except ValueError:
                errors['order_date'] = 'Invalid order date format. Use YYYY-MM-DD.'

        # Delivery date should be after the order date
        if 'delivery_date' in data and 'order_date' in data:
            try:
                order_date = date.fromisoformat(data['order_date'])
                delivery_date = date.fromisoformat(data['delivery_date'])
                if delivery_date < order_date:
                    errors['delivery_date'] = 'Delivery date cannot be before order date.'
            except ValueError:
                errors['delivery_date'] = 'Invalid delivery date format. Use YYYY-MM-DD.'

        # Order total should be a positive number
        if 'order_total' not in data or data['order_total'] < 0:
            errors['order_total'] = 'Order total must be a positive number.'

        # Ensure user_id is provided
        if 'user_id' not in data or not isinstance(data['user_id'], int):
            errors['user_id'] = 'A valid user ID is required.'

        if errors:
            raise ValueError(errors)