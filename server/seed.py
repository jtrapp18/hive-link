#!/usr/bin/env python3

from random import randint, choice as rc, random
from sqlalchemy import text
from datetime import datetime, timedelta
from faker import Faker
from config import db, app
from models import Hive, Inspection, CountCategory, Queen, User, Event, Signup

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Inspection.query.delete()
    Queen.query.delete()
    Hive.query.delete()
    User.query.delete()
    Event.query.delete()
    Signup.query.delete()

    print("Creating users...")

    users = []
    for i in range(5):
        first_name = fake.first_name()
        last_name = fake.last_name()
        username = f'{first_name}.{last_name}{randint(1, 20)}'

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            phone_number=str(randint(1000000000, 9999999999)),
            email=f'{username}@gmail.com',
            zipcode=fake.postcode()
        )
        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print("Creating hives...")

    hives = []
    for user in users:
        num_hives = randint(1, 4)  # Each user will have between 1 and 4 hives
        for _ in range(num_hives):
            hive = Hive(
                user_id=user.id,
                date_added=datetime.now().date(),
                material=rc(['Wood', 'Polystyrene', 'Other']),
                location_lat=round(random() * 180 - 90, 6),
                location_long=round(random() * 360 - 180, 6)
            )
            hives.append(hive)

    db.session.add_all(hives)
    db.session.commit()

    print("Creating queens...")

    queens = []
    for hive in hives:
        num_queens = randint(1, 2) 
        for _ in range(num_queens):
            queen = Queen(
                hive_id=hive.id,
                status=rc(['marked', 'unmarked', 'clipped']),  # Valid statuses
                origin=rc(['swarm cells', 'purchased', 'original']),  # Valid origins
                species=rc(['Italian', 'Carniolan', 'Buckfast', 'Caucasian', 'Russian', 'Cordovan', 'Other']),  # Valid species
                date_introduced=datetime.now().date() - timedelta(randint(30, 365)),  # Random date within the last year
                replacement_cause=rc(['supersedure', 'swarm', 'n/a'])  # Valid replacement causes
            )
            queens.append(queen)

    db.session.add_all(queens)
    db.session.commit()

    print("Creating inspections...")

    inspections = []
    count_categories = [option.name for option in CountCategory]

    for queen in queens:
        num_inspections = randint(1, 20)  # Each queen will have between 1 and 20 inspections
        for _ in range(num_inspections):
            inspection = Inspection(
                queen_id=queen.id,
                date_checked=datetime.now().date(),
                temp=round(randint(10, 35) + random(), 1),
                activity_surrounding_hive=rc(count_categories),
                super_count=randint(0, 3),
                hive_body_count=randint(1, 3),
                egg_count=rc(count_categories),
                larvae_count=rc(count_categories),
                capped_brood=rc(count_categories),
                twisted_larvae=rc([True, False]),
                pests_surrounding=rc(['None', 'Ants', 'Slugs', 'Mites', 'Other']),
                stability_in_hive=rc(count_categories),
                feeding=rc(['None', 'Sugar syrup', 'Pollen patty', 'Other']),
                treatment=rc(['None', 'Formic acid', 'Thymol', 'Oxalic acid', 'Other']),
                stores=rc(count_categories),
                fate=rc(['Dead', 'Swarmed', 'Split', 'Thriving']),
                local_bloom=rc(count_categories),
                weather_conditions=rc(['Sunny', 'Overcast', 'Rainy', 'Snowy', 'Windy']),
                humidity=round(randint(40, 90) + random(), 1),
                chalkbrood_presence=rc([True, False]),
                varroa_mites=rc([True, False])
            )
            inspections.append(inspection)

    db.session.add_all(inspections)
    db.session.commit()

    # Creating events...
    print("Creating events...")

    events = []
    for user in users:
        if random()>.7:
            event = Event(
                user_id=user.id,
                title=fake.bs(),  # Fake name for the event
                event_date=fake.date_this_year(),  # Random date in the current year
                descr=fake.text(max_nb_chars=200),  # Fake description for the event
                zipcode=fake.postcode()  # Random location
            )
            events.append(event)

    db.session.add_all(events)
    db.session.commit()

    print("Creating signups...")

    signups = []
    for event in events:
        for user in users:
            if random()>.6 and event.user_id != user.id:
                signup = Signup(user_id=user.id, event_id=event.id)
                signups.append(signup)

    db.session.add_all(signups)
    db.session.commit()


    print("Seeding Complete.")