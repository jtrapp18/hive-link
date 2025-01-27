#!/usr/bin/env python3

from random import randint, choice as rc, random
from sqlalchemy import text

from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from faker import Faker

from config import db, app
from models import CartItem, Cookie, Favorite, Order, User, Review
from cookie_data import cookie_data

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Favorite.query.delete()
    Review.query.delete()
    CartItem.query.delete()
    Order.query.delete()
    Cookie.query.delete()
    User.query.delete()

    fake = Faker()

    print("Creating cookies...")

    # Using raw SQL to insert data
    for cookie in cookie_data:
        db.session.execute(
            text("INSERT INTO cookies (name, image, price, is_vegan, is_gluten_free, has_nuts, frosting) "
                 "VALUES (:name, :image, :price, :is_vegan, :is_gluten_free, :has_nuts, :frosting)"),
            cookie
        )

    cookies = Cookie.query.all()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(20):

        first_name=fake.first_name()
        last_name=fake.last_name()
        username=f'{first_name}.{last_name}{randint(1,20)}'

        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            address=fake.address(),
            phone_number=str(randint(1000000000, 9999999999)),
            email=f'{username}@gmail.com'
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print("Creating favorites...")

    favorites = []

    for user in users:
        for cookie in cookies:
            if random()>.7:
                favorite = Favorite(
                    user_id=user.id,
                    cookie_id=cookie.id
                )
                
                favorites.append(favorite)

    db.session.add_all(favorites)
    db.session.commit()

    print("Creating orders...")

    orders = []

    for user in users:
        unpurchased_order = Order(
            order_date=None,
            delivery_date=None,
            purchase_complete=False,
            order_total=0,
            user_id=user.id
        )
        
        orders.append(unpurchased_order)

        order_date = datetime.now().date() - timedelta(11 * 365)
        for i in range(randint(1, 6)):
            if i > 0:
                delivery_date = order_date + timedelta(randint(1, 14))

                purchased_order = Order(
                    order_date=order_date,
                    delivery_date=delivery_date,
                    purchase_complete=True,
                    order_total=0,
                    user_id=user.id
                )

                order_date += timedelta(randint(1 * 365, 2 * 365))
            
                orders.append(purchased_order)

    db.session.add_all(orders)
    db.session.commit()

    print("Creating cart items...")

    cart_items = []

    for order in orders:
        for cookie in cookies:
            if random()>.8:
                cart_item = CartItem(
                    num_cookies=randint(1, 10),
                    order_id=order.id,
                    cookie_id=cookie.id
                )
                
                cart_items.append(cart_item)

    db.session.add_all(cart_items)
    db.session.commit()

    print("Creating reviews...")

    reviews = []

    for order in orders:
        if order.purchase_complete:
            for cart_item in order.cart_items:
                if random()>.6:
                    review = Review(
                        rating=randint(1, 5),
                        user_id=order.user_id,
                        cookie_id=cart_item.cookie_id,
                        review_title="Review Title",
                        review_body="This cookie was good"
                    )
                    
                    reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

    print("Seeding Complete.")
