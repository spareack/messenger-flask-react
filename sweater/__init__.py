from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from flask_cors import CORS
from flask_socketio import SocketIO


app = Flask(__name__, static_folder='../build', static_url_path='/', template_folder="../build")
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# DB CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'YSAFDB978WH8AYIFHSNUSIJDFK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# MAIL CONFIG
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_USERNAME'] = "talk.messenger.app@gmail.com"
app.config['MAIL_PASSWORD'] = "xfusuyaxpbhncetq"
app.config['MAIL_DEFAULT_SENDER'] = ("talk", "talk.messenger.app@gmail.com")
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False

# UPLOAD CONFIG
app.config['UPLOAD_FOLDER'] = 'uploads'


db = SQLAlchemy(app)
login_manager = LoginManager(app)
mail = Mail(app)
token_key = URLSafeTimedSerializer(app.config['SECRET_KEY'])

from sweater import models, routes

# app.run(debug=True)
socketio.run(app)