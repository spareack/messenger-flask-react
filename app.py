from flask import Flask, render_template, request, flash, redirect, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from datetime import  datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os


app = Flask(__name__, static_folder='../build', static_url_path='/', template_folder="build")
# app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'YSAFDB978WH8AYIFHSNUSIJDFK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)


@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')


@app.route('/text')
def text_return():
    return 'React здесь'


@app.route('/talk1')
def talk_return():
    d = [{"from": True, "text": "privet", "time": "10:50"},
        {"from": False, "text": "zdarova bratela", "time": "10:51"},
        {"from": True, "text": "hochu kushat'", "time": "10:50"},
        {"from": False, "text": "pizzu idem kushat'?", "time": "10:50"}]
    return jsonify(d)


@app.route('/checkname', methods=['GET'])
def user_exist():
    if request.method == 'GET':
        checking_name = request.args.get("userName")
        try:
            all_names = db.session.query(Account.name).all()

            # print(any(x[0] == checking_name for x in all_names))
            if any(x[0] == checking_name for x in all_names):
                return jsonify({"status": 1, "info": "name already taken"})
            else:
                return jsonify({"status": 0, "info": "ye, this is good"})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/registernewuser', methods=['POST'])
def register_new_user():
    if request.method == 'POST':
        response = request.get_json()
        name = response['userName']
        email = response['email']
        password = response['password']
        account = Account(name=name, email=email, password=generate_password_hash(password))

        try:
            db.session.add(account)
            db.session.commit()
            last_id = db.session.query(Account.id).order_by(Account.id.desc()).first()
            return jsonify({"status": 0, "id": last_id[0]})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/createtalk', methods=['POST'])
def create_talk():
    if request.method == "POST":

        response = request.get_json()
        # {"members": [1, 2], "title": "hochu pitsu"}
        members = response["members"]
        title = response["title"]

        talk = Talk(title=title)
        try:
            db.session.add(talk)
            db.session.commit()
            last_id = db.session.query(Talk.id).order_by(Talk.id.desc()).first()

            for user_id in members:
                account = Account.query.filter_by(id=user_id).first()
                account.talks = json.dumps(json.loads(account.talks).append(last_id))
            db.session.commit()
            return jsonify({"status": 0, "id": last_id[0]})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/pushmess', methods=['POST'])
def push_message():
    if request.method == "POST":

        response = request.get_json()
        # {"sender": id, "talk": id, "type": "text", "value": "hello"}

        sender_id = response["sender"]
        talk_id = response["talk"]
        mess_type = response["type"]
        mess_value = response["value"]

        message = Message(sender=sender_id, type=mess_type, value=mess_value)
        try:
            db.session.add(message)
            db.session.commit()
            last_id = db.session.query(Message.id).order_by(Message.id.desc()).first()

            talk = Talk.query.filter_by(id=talk_id).first()
            talk.messages = json.dumps(json.loads(talk.messages).append(last_id))
            db.session.commit()
            return jsonify({"status": 0, "info": "message sended"})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/authorization', methods=['POST'])
def login():
    if request.method == 'POST':

        response = request.get_json()
        name_mail = response['email']
        password = response['password']

        accounts = Account.query.all()
        try:
            for ack in accounts:
                if (ack.name == name_mail or ack.email == name_mail) and ack.password == check_password_hash(password):
                    login_user(UserLogin(ack.id), duration=datetime.timedelta(hours=24))
                    return jsonify({"status": 0, "info": "authorization successful"})
            return jsonify({"status": 1, "info": "authorization error"})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/isauthorized', methods=['GET'])
def is_authorized():
    if request.method == 'GET':
        try:
            is_auth = current_user.is_authenticated
            return jsonify({"status": 0, "is_auth": is_auth})
        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/unauthorization', methods=['GET'])
def log_out():
    if request.method == 'GET':
        try:
            logout_user()
            return redirect("/")
        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/static/<path:static_type>/<path:filename>')
def serve_static(static_type, filename):
    root_dir = os.path.dirname(os.getcwd())
    # print(root_dir)
    # root_dir = root_dir.replace('\\', '/')
    # print(os.path.join(root_dir, 'flaskTest', 'build', 'static', static_type))

    return send_from_directory(os.path.join('build', 'static', static_type), filename)
    # return send_from_directory('C:/Users/user/PycharmProjects/flaskTest/build/static/css', filename)


class Account(db.Model):
    # __bind_key__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(40), nullable=False)
    date_create = db.Column(db.String(30), default=datetime.utcnow())
    talks = db.Column(db.Text)

    def __repr__(self):
        return 'Account %r' % self.id


class Talk(db.Model):
    # __bind_key__ = 'talks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    messages = db.Column(db.Text)
    date_create = db.Column(db.String(30), default=datetime.utcnow())
    date_update = db.Column(db.String(30), default=datetime.utcnow())

    def __repr__(self):
        return 'Talk %r' % self.id


class Message(db.Model):
    # __bind_key__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(20), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    value = db.Column(db.Text, nullable=False)
    date_create = db.Column(db.String(30), default=datetime.utcnow())

    def __repr__(self):
        return 'Message %r' % self.id


# @app.route('/<string:name>')
# def registration():
#     return redirect("/")

#     if request.method == 'POST':
#         name = request.form['userName']
#         email = request.form['email']
#         password = request.form['password']
#         password2 = request.form['password2']
#
#         if name == "" or password == "" or email == "":
#             flash('Пустые ячейки', category='alert-danger')
#             return render_template("registration.html", data=[name, email, password, password2])
#
#         if password == password2:
#             article = Article(userName=name, email=email, password=generate_password_hash(password))
#             db.session.add(article)
#             db.session.commit()
#             flash('Успешная регистрация', category='alert-success')
#             return redirect('/login')
#         else:
#             flash('Пороли не совпадают', category='alert-danger')
#             return render_template("registration.html", data=[name, email, password, password2])
#     else:
#         return render_template("registration.html", data=["", "", "", ""])


# @app.route('/login', methods=['POST', 'GET'])
# def login():
#     if request.method == 'POST':
#         password = request.form['password']
#         email = request.form['email']
#
#         articles = Article.query.all()
#         for data in articles:
#             if data.email == email and data.password == password:
#                 login_user(UserLogin(data.id), duration=datetime.timedelta(hours=24))
#                 flash('Успешный вход', category='alert-success')
#                 return redirect('/')
#         flash('Некорректные данные', category='alert-danger')
#         return render_template("login.html", email=email)
#     else:
#         return render_template("login.html", email="")


# @app.route('/logout')
# def logout():
#     logout_user()
#     return redirect("/")


@login_manager.user_loader
def load_user(user_id):
    return UserLogin(user_id)


class UserLogin:
    def __init__(self, value):
        self.userID = value

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.userID)


if __name__ == "__main__":
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)

    app.run(debug=True)
