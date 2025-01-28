#!/usr/bin/env python3

from random import randint, choice as rc, random
from sqlalchemy import text
from datetime import datetime, timedelta
from faker import Faker
from config import db, app
from models import Hive, Inspection, CountCategory, Queen, User

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Inspection.query.delete()
    Queen.query.delete()
    Hive.query.delete()

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
            address=fake.address(),
            phone_number=str(randint(1000000000, 9999999999)),
            email=f'{username}@gmail.com'
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

    print("Creating inspections...")

    inspections = []
    for hive in hives:
        num_inspections = randint(1, 5)  # Each hive will have between 1 and 5 inspections
        for _ in range(num_inspections):
            inspection = Inspection(
                hive_id=hive.id,
                inspection_date=datetime.now().date(),
                temp=round(randint(10, 35) + random(), 1),
                activity_surrounding_hive=rc(['None', 'Heavy', 'Moderate', 'Low']),
                super_count=randint(0, 3),
                hive_body_count=randint(1, 3),
                egg_count=rc([CountCategory.Low, CountCategory.Medium, CountCategory.High]),
                larvae_count=rc([CountCategory.Low, CountCategory.Medium, CountCategory.High]),
                capped_brood=rc([CountCategory.Low, CountCategory.Medium, CountCategory.High]),
                twisted_larvae=rc([True, False]),
                pests_surrounding=rc(['None', 'Mites', 'Beetles']),
                stability_in_hive=rc([CountCategory.Low, CountCategory.Medium, CountCategory.High]),
                feeding=rc(['Sugar Syrup', 'Pollen Patties', 'None']),
                treatment=rc(['Oxalic Acid', 'Formic Acid', 'None']),
                stores=rc([CountCategory.Low, CountCategory.Medium, CountCategory.High]),
                fate=rc(['Alive', 'Died', 'Unknown']),
                local_bloom=rc(['None', 'Spring', 'Summer', 'Autumn']),
                weather_conditions=rc(['Sunny', 'Cloudy', 'Rainy', 'Windy']),
                humidity=round(randint(40, 90) + random(), 1),
                chalkbrood_presence=rc([True, False]),
                varroa_mites=rc([True, False])
            )
            inspections.append(inspection)

    db.session.add_all(inspections)
    db.session.commit()

    print("Creating queens...")

    queens = []
    for hive in hives:
        if random() > 0.3:  # Random chance of having a queen for the hive
            queen = Queen(
                hive_id=hive.id,
                status=rc(['Active', 'Inactive']),
                origin=rc(['Local Breeder', 'Imported']),
                species=rc(['Italian', 'Carniolan', 'Buckfast', 'Other']),
                date_introduced=datetime.now().date() - timedelta(randint(30, 365)),
                replacement_cause=rc(['Failed queen', 'Hive split', 'Other'])
            )
            queens.append(queen)

    db.session.add_all(queens)
    db.session.commit()

    print("Seeding Complete.")