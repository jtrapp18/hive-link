#!/usr/bin/env python3

from models import CartItem, Cookie, Favorite, Order, User, Review
from config import app, db, api
from datetime import datetime
# from flask_migrate import Migrate
from flask import request, jsonify, session, make_response, render_template
from flask_restful import  Resource
# import os

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') \
    and request.endpoint in ['orders', 'cart_items']:
        return {'error': 'Unauthorized'}, 401
    
class ClearSession(Resource):

    def delete(self):
    
        session['user_id'] = None

        return {}, 204

class Signup(Resource):
    def post(self):
        try:
            json = request.get_json()

            # Check if the username already exists in the database
            existing_user = User.query.filter_by(username=json['username']).first()

            # Check if the email already exists in the database
            existing_email = User.query.filter_by(email=json['email']).first()        

            error_dict = {}

            if existing_user:
                error_dict['username'] = 'Username already taken.'

            if existing_email:
                error_dict['email'] = 'Email already registered.'

            if existing_user or existing_email:
                return {'error': error_dict}, 400                

            user = User(
                username=json['username'],
                first_name=json['first_name'],
                last_name=json['last_name'],
                email=json['email']
                )
            
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()  # Rollback any changes made in the transaction
            return {'error': f'An error occurred: {str(e)}'}, 500
    

class CheckSession(Resource):

    def get(self):
        
        user_id = session.get('user_id', 0)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 204

class Login(Resource):
    def post(self):
        try:
            json = request.get_json()

            username = json['username']
            user = User.query.filter_by(username=username).first()

            if not user:
                return {'error': 'Invalid username or password'}, 401

            password = json['password']

            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200

            return {'error': 'Invalid username or password'}, 401
        except Exception as e:
            return {'error': f'An error occurred: {str(e)}'}, 500

class Logout(Resource):
    
    def delete(self):
        session['user_id'] = None
        return {}, 204

class Orders(Resource):

    def get(self):
        user_id = session['user_id']

        orders = [order.to_dict() for order in Order.query.filter_by(user_id=user_id)]
        return make_response(jsonify(orders), 200)
    
    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new order
            new_order = Order(
                purchase_complete=data['purchase_complete'],
                user_id=data['user_id']
            )

            # Add the new order to the database and commit
            db.session.add(new_order)
            db.session.commit()

            # Return the created order as a response
            return make_response(jsonify(new_order.to_dict()), 201)
        except Exception as e:
            # Rollback any changes made during the transaction if an error occurs
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class OrderById(Resource):
    def get(self, order_id):
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response(jsonify({'error': 'Order not found'}), 404)
        return make_response(jsonify(order.to_dict()), 200)
    
    def patch(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return make_response(jsonify({'error': 'Order not found'}), 404)
        data = request.get_json()

        for attr in data:
            if (attr == 'order_date') and (data[attr]=='today'):
                setattr(order, attr, datetime.now().date())
            # elif (attr == 'purchase_complete') and (data[attr]==1):
            #     setattr(order, attr, True)
            else:
                setattr(order, attr, data.get(attr))

        datetime.now().date()

        db.session.commit()
        return make_response(jsonify(order.to_dict()), 200)
    
    def delete(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return make_response(jsonify({'error': 'Order not found'}), 404)
        db.session.delete(order)
        db.session.commit()
        return make_response('', 204)

class Cookies(Resource):

    def get(self):
        cookies = [cookie.to_dict() for cookie in Cookie.query.all()]
        return make_response(jsonify(cookies), 200)
        
class CookieById(Resource):

    def get(self, cookie_id):
        cookie = Cookie.query.get(cookie_id)
        if not cookie:
            return make_response(jsonify({'error': 'Cookie not found'}), 404)
        return make_response(jsonify(cookie.to_dict()), 200)

class CartItems(Resource):

    def get(self):
        cart_items = [cart_item.to_dict() for cart_item in CartItem.query.all()]
        return make_response(jsonify(cart_items), 200)
    
    def post(self):

        try:
            # Get data from the request
            data = request.get_json()

            # Create new cart item
            new_cart_item = CartItem(
                order_id=data['order_id'],
                cookie_id=data['cookie_id']
            )

            # Add the new cart item to the database and commit
            db.session.add(new_cart_item)
            db.session.commit()

            # Return the created cart item as a response
            return make_response(jsonify(new_cart_item.to_dict()), 201)
        except Exception as e:
            # Rollback any changes made during the transaction if an error occurs
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500
    

class CartItemById(Resource):

    def patch(self, item_id):
        cart_item = CartItem.query.filter_by(id=item_id).first()
        if not cart_item:
            return make_response(jsonify({'error': 'Cart item not found'}), 404)
        data = request.get_json()
        cart_item.num_cookies = data.get('num_cookies', cart_item.num_cookies)
        db.session.commit()
        return make_response(jsonify(cart_item.to_dict()), 200)
    
    def delete(self, item_id):
        cart_item = CartItem.query.get(item_id)
        if not cart_item:
            return make_response(jsonify({'error': 'Cart item not found'}), 404)
        
        db.session.delete(cart_item)
        db.session.commit()
        return make_response({}, 204)

class Favorites(Resource):
    def post(self):
        try:
            # Get data from the request
            data = request.get_json()

            # Create new favorite
            new_favorite = Favorite(
                user_id=data['user_id'],
                cookie_id=data['cookie_id']
            )

            # Add the new favorite to the database and commit
            db.session.add(new_favorite)
            db.session.commit()

            # Return the created favorite as a response
            return make_response(jsonify(new_favorite.to_dict()), 201)
        except Exception as e:
            # Rollback any changes made during the transaction if an error occurs
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500

class FavoriteById(Resource):

    def delete(self, favorite_id):
        favorite = Favorite.query.get(favorite_id)
        if not favorite:
            return make_response(jsonify({'error': 'Favorite not found'}), 404)
        db.session.delete(favorite)
        db.session.commit()
        return make_response('', 204)
             
class Reviews(Resource):
    def post(self):

        try:
            # Get data from the request
            data = request.get_json()

            # Create new review
            new_review = Review(
                rating=data['rating'],
                review_title=data['review_title'],
                review_body=data['review_body'],
                user_id=data['user_id'],
                cookie_id=data['cookie_id']
            )

            # Add the new review to the database and commit
            db.session.add(new_review)
            db.session.commit()

            # Return the created review as a response
            return make_response(jsonify(new_review.to_dict()), 201)
        except Exception as e:
            # Rollback any changes made during the transaction if an error occurs
            db.session.rollback()
            return {'error': f'An error occurred: {str(e)}'}, 500


class ReviewsByCookie(Resource):

    def get(self, cookie_id):
        reviews = [review.to_dict() for review in Review.query.filter_by(cookie_id=cookie_id).all()]
        return make_response(jsonify(reviews), 200)

class ReviewById(Resource):

    def patch(self, item_id):
        review = Review.query.get(item_id)
        if not review:
            return make_response(jsonify({'error': 'Review not found'}), 404)
        
        data = request.get_json()

        for attr in data:
            setattr(review, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(review.to_dict()), 200)

    def delete(self, item_id):
        review = Review.query.get(item_id)
        if not review:
            return make_response(jsonify({'error': 'Review not found'}), 404)
        db.session.delete(review)
        db.session.commit()
        return make_response('', 204)

class UserById(Resource):

    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)
        return make_response(jsonify(user.to_dict()), 200)
    
    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)
        
        data = request.get_json()

        for attr in data:
            setattr(user, attr, data.get(attr))

        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)

api.add_resource(ClearSession, '/api/clear', endpoint='clear')
api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Orders, '/api/orders', endpoint='orders')
api.add_resource(OrderById, '/api/orders/<int:order_id>')
api.add_resource(Cookies, '/api/cookies')
api.add_resource(CookieById, '/api/cookies/<int:cookie_id>')
api.add_resource(CartItems, '/api/cart_items', endpoint='cart_items')
api.add_resource(CartItemById, '/api/cart_items/<int:item_id>')
api.add_resource(Favorites, '/api/favorites')
api.add_resource(FavoriteById, '/api/favorites/<int:favorite_id>')
api.add_resource(Reviews, '/api/reviews')  
api.add_resource(ReviewsByCookie, '/api/reviews/cookie/<int:cookie_id>')  
api.add_resource(UserById, '/api/users/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
