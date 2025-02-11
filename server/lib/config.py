import os
import binascii
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

load_dotenv()

# Setup to serve React build
app = Flask(
    __name__,
    static_url_path='/',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

app.config['SECRET_KEY'] = b'\x8a\xe7F\xc2)\\\x1cV\xa0\x8a\x94\xf5i-\xe5\x1a>0~\x19\xb1{\x99\xbe'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_PUBLIC_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)