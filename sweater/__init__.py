from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from flask_cors import CORS
from flask_socketio import SocketIO
from sqlalchemy import create_engine
import argparse

app = Flask(__name__, static_folder='../build', static_url_path='/static', template_folder="../build")


# CORS CONFIG
app.config['CORS_HEADERS'] = 'Content-Type'

# DB CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://tdgstkkyczujlt:852ab945f253745eeca395825dee53182360dcaf8277cccccd86fc30683f233c@ec2-34-242-89-204.eu-west-1.compute.amazonaws.com:5432/d29h35ednv6at3'
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


socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
db = SQLAlchemy(app)
login_manager = LoginManager(app)
mail = Mail(app)
token_key = URLSafeTimedSerializer(app.config['SECRET_KEY'])


# engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
# conn = engine.connect()
#
# for i in conn.execute('SELECT * FROM pg_catalog.pg_tables'):
#     print(i)


# import psycopg2
# from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
#
# # Устанавливаем соединение с postgres
# connection = psycopg2.connect(user="postgres", password="zxcursed")
# connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
#
# # Создаем курсор для выполнения операций с базой данных
# cursor = connection.cursor()
# # sql_create_database =
# # Создаем базу данных
# cursor.execute('create database sqlalchemy_tuts')
# # Закрываем соединение
# cursor.close()
# connection.close()


from sweater import models, routes

# app.run(debug=True)
socketio.run(app, debug=True, host='0.0.0.0', port=8080)
