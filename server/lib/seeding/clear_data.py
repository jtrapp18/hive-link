#!/usr/bin/env python3
from lib.config import db, app
from lib.models import Hive, Inspection, HoneyPull, User, Event, Signup, Forum, Message, Reply

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

    db.session.commit()