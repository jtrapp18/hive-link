#!/usr/bin/env python3
from random import randint, choice as rc, random
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from faker import Faker

from lib.config import db, app
from lib.models import Hive, Inspection, HoneyPull, CountCategory, User, Event, Signup, Forum, Message, Reply
from lib.seeding import seed_data
from lib.seeding import generate_weather_data, pest_likelihood, varroa_mite_model, treatment_dosages, calculate_weekly_honey

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Reply.query.delete()
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
            )
            honey_pulls.append(honey_pull)

            if pull_date is None:
                break

            reset_date = pull_date + timedelta(days=randint(1, 14))

    db.session.add_all(honey_pulls)
    db.session.commit()

    print("Creating inspections...")

    inspections = []
    count_categories = [option.value for option in CountCategory]

    for honey_pull in honey_pulls:
        # set initial dates
        start_date = honey_pull.date_reset
        stop_date = honey_pull.date_pulled if honey_pull.date_pulled else datetime.now().date()
        inspection_date = start_date + relativedelta(weeks=1)

        # set initial values
        starting_supers = randint(1, 3)
        starting_bodies = randint(2, 4)

        weather_data = generate_weather_data(inspection_date)
        temp = weather_data['temp']
        varroa_mite_count = varroa_mite_model(0, 0, 0, 0, 0, starting_mite_count=None, hive_age_weeks=1)
        treatment = None
        dosage=(0, 0, 0, 0)
        treatment_streak=0

        # keep track of honey per interval
        honey_accum = 0
        hive_age_weeks = 1

        while inspection_date <= stop_date:

            # Get pest probabilities based on temperature
            pests = pest_likelihood(temp)

            # Randomize treatment application
            dosage, treatment, treatment_streak = treatment_dosages(varroa_mite_count, treatment, dosage, treatment_streak)
            oxalic, formic, thymol, apistan = dosage

            has_larvae = rc([True] * 15 + [False] * 1)
            has_eggs = has_larvae or rc([True] * 10 + [False] * 1) 

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

            # updated values

            inspection_date += relativedelta(weeks=1)
            hive_age_weeks += 1

            # Generate random temperature based on date
            weather_data = generate_weather_data(inspection_date)
            temp = weather_data['temp']

            # Calculate mite count based on treatment & temp
            varroa_mite_count = varroa_mite_model(temp, oxalic, formic, thymol, apistan, starting_mite_count=varroa_mite_count, hive_age_weeks=hive_age_weeks)

            # calculate and update new honey pull amount
            honey = calculate_weekly_honey(
                temp=temp,
                varroa_mite_count=varroa_mite_count,
                super_count=starting_supers,
                has_larvae=has_larvae,
                has_eggs=has_eggs,
                treatment_factor=(1 if treatment is None else 0.8),  # Treatments may slow production slightly
                pests=pests
            )

            honey_accum += honey

        honey_pull.weight = honey_accum if honey_pull.date_pulled else None 

    db.session.add_all(inspections)
    db.session.commit()

    print("Creating events...")

    events = []
    for seed_event in seed_data["events"]:
        user = rc(users)
        event = Event(
            user_id=user.id,
            title=seed_event["title"],  # Fake name for the event
            event_date=seed_event["date"],  # Random date in the current year
            descr=seed_event["descr"],  # Fake description for the event
            zipcode=seed_event.get("zipcode", user.zipcode)
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
    messages = []
    replies = []

    for seed_forum in seed_data["forums"]:
        user = rc(users)
        forum = Forum(
            user_id=user.id,
            title=seed_forum["title"],  # Fake name for the forum
            category=seed_forum["category"],  # Fake category for the forum (optional)
        )
        db.session.add(forum)  # Commit after each forum to ensure forum.id is available
        db.session.commit()  # Committing forum so forum.id is available for messages
        forums.append(forum)

        if "messages" in seed_forum:
            for seed_message in seed_forum["messages"]:
                user = rc(users)
                message = Message(
                    user_id=user.id,
                    forum_id=forum.id,  # forum_id properly set here
                    message_text=seed_message["content"],  # Fake message text for the message
                )
                db.session.add(message)  # Commit after each message to ensure message.id is available
                db.session.commit()  # Committing message so message.id is available for replies
                messages.append(message)

                if "replies" in seed_message:
                    for seed_reply in seed_message["replies"]:
                        user = rc(users)
                        reply = Reply(
                            user_id=user.id,
                            message_id=message.id,  # message_id properly set here
                            reply_text=seed_reply["content"],  # Fake reply text for the reply
                        )
                        db.session.add(reply)  # Add reply to session
                    db.session.commit()  # Commit all replies for the current message

    print("Seeding Complete.")