from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__, static_folder='../build', static_url_path='/', template_folder="../build")
# app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'YSAFDB978WH8AYIFHSNUSIJDFK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_USERNAME'] = "spareack2@gmail.com"
app.config['MAIL_PASSWORD'] = "onkthnhlmgjbibaj"
app.config['MAIL_DEFAULT_SENDER'] = ("dumka", "spareack2@gmail.com")

app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
mail = Mail(app)
token_key = URLSafeTimedSerializer(app.config['SECRET_KEY'])

from sweater import models, routes

# app.run(debug=True)
