#!/usr/bin/env python3
from seed_models import generate_weather_data, pest_likelihood, varroa_mite_model, treatment_dosages
from random import randint, choice as rc, random
from sqlalchemy import text
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from faker import Faker
from config import db, app
from models import Hive, Inspection, HoneyPull, CountCategory, Queen, User, Event, Signup

fake = Faker()

with app.app_context():

    print("Deleting all records...")

    Signup.query.delete()
    Event.query.delete()    
    Inspection.query.delete()
    HoneyPull.query.delete()
    Queen.query.delete()
    Hive.query.delete()
    User.query.delete()

    db.session.commit()