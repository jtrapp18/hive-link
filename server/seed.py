#!/usr/bin/env python3
from seed_models import generate_weather_data, pest_likelihood, varroa_mite_model, treatment_dosages
from random import randint, choice as rc, random
from sqlalchemy import text
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from faker import Faker
from config import db, app
from models import Hive, Inspection, HoneyPull, CountCategory, User, Event, Signup, Forum, Message

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Message.query.delete()
    Forum.query.delete()    
    Signup.query.delete()
    Event.query.delete()    
    Inspection.query.delete()
    HoneyPull.query.delete()
    Hive.query.delete()
    User.query.delete()

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
            zipcode=fake.zipcode()
        )
        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print("Creating hives...")

    hives = []
    for user in users:
        first_hive = datetime.now().date() - timedelta(days=randint(30, 3*365))
        hive_date = first_hive

        while hive_date <= datetime.now().date():
            hive = Hive(
                user_id=user.id,
                date_added=hive_date,
                material=rc(['Wood', 'Polystyrene', 'Other']),
                address_line=fake.street_address(),
                city=fake.city(),
                state=fake.state(),
                postal_code=fake.zipcode()
            )
            hives.append(hive)

            hive_date += timedelta(days=randint(100, 365))

    db.session.add_all(hives)
    db.session.commit()

    print("Creating honey pulls...")

    honey_pulls = []

    for hive in hives:
        start_date = hive.date_added
        reset_date = start_date

        while start_date:
            pull_date = reset_date + timedelta(days=randint(90, 180))
            pull_date = None if pull_date > datetime.now().date() else pull_date

            honey_pull = HoneyPull(
                hive_id=hive.id,
                date_reset=reset_date,
                date_pulled=pull_date,                
                weight=random()*200 if pull_date is not None else None
            )
            honey_pulls.append(honey_pull)

            if pull_date is None:
                break

            reset_date = pull_date + timedelta(days=randint(1, 14))

    db.session.add_all(honey_pulls)
    db.session.commit()

    print("Creating inspections...")

    inspections = []
    count_categories = [option.name for option in CountCategory]

    for honey_pull in honey_pulls:
        hive = honey_pull.hive

        # set initial values

        start_date = honey_pull.date_reset
        stop_date = honey_pull.date_pulled if honey_pull.date_pulled else datetime.now().date()
        inspection_date = start_date

        starting_supers = randint(1, 3)
        starting_bodies = randint(2, 4)

        # set initial values
        weather_data = generate_weather_data(inspection_date)
        temp = weather_data['temp']
        varroa_mite_count = varroa_mite_model(temp, 0, 0, 0, 0, honey_pull.weight)
        treatment = None
        dosage=(0, 0, 0, 0)
        treatment_streak=0
        fate='Active'

        while inspection_date <= stop_date:

            # Get pest probabilities based on temperature
            pests = pest_likelihood(temp, honey_pull.weight)

            # Randomize treatment application
            dosage, treatment, treatment_streak = treatment_dosages(varroa_mite_count, treatment, dosage, treatment_streak)
            oxalic, formic, thymol, apistan = dosage

            # Calculate mite count based on treatment & temp
            varroa_mite_count = varroa_mite_model(temp, oxalic, formic, thymol, apistan, honey_pull.weight)

            has_larvae = rc([True] * 1 + [False] * 10)  # 1 in 11 chance of larvae
            has_eggs = has_larvae or rc([True] * 3 + [False] * 7) 

            # Create Inspection instance
            inspection = Inspection(
                honey_pull_id=honey_pull.id,
                date_checked=inspection_date,
                super_count=starting_supers,
                hive_body_count=starting_bodies,
                bias=randint(0, starting_bodies),
                has_eggs=has_eggs,
                has_larvae=has_larvae,
                **pests,  # Unpack the pest dictionary
                num_pollen_patties=randint(0, 2),
                num_sugar_syrup_frames=randint(0, 2),
                **weather_data,  # Unpack the weather dictionary
                fate=fate,
                has_twisted_larvae=rc([True]*1 + [False]*10),
                has_chalkbrood=rc([True]*1 + [False]*10),
                varroa_mite_count=varroa_mite_count,
                oxalic_acid_dosage=oxalic,
                formic_acid_dosage=formic,
                thymol_dosage=thymol,
                apistan_dosage=apistan,
                activity_surrounding_hive=rc(count_categories),
                stability_in_hive=rc(count_categories),
            )

            inspections.append(inspection)

            inspection_date += relativedelta(weeks=1)

            if fate=='Active':
                fate = rc(["Dead", "Swarmed", "Split"]*1 + ["Active"]*10)
            else:
                fate='Active'

            # Generate random temperature based on date
            weather_data = generate_weather_data(inspection_date)
            temp = weather_data['temp']


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

    # Creating forums...
    print("Creating forums...")

    forums = []
    for user in users:
        if random() > 0.7:
            forum = Forum(
                user_id=user.id,
                title=fake.bs(),  # Fake name for the forum
                category=fake.bs(),  # Fake category for the forum (optional)
            )
            forums.append(forum)

    db.session.add_all(forums)
    db.session.commit()

    print("Creating messages...")

    messages = []
    for forum in forums:
        for user in users:
            if random() > 0.6 and forum.user_id != user.id:
                message = Message(
                    user_id=user.id,
                    forum_id=forum.id,
                    message_text=fake.text(max_nb_chars=255),  # Fake message text for the message
                )
                messages.append(message)

    db.session.add_all(messages)
    db.session.commit()


    print("Seeding Complete.")