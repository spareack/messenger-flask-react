import datetime
import json
import os

from flask import render_template, request, redirect, send_from_directory, jsonify, url_for
from flask_login import login_user, current_user, logout_user
from flask_mail import Message as Mesage
from werkzeug.security import generate_password_hash, check_password_hash

from sweater import app, db, mail, token_key
from sweater.models import User, Talk, Message


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


# @app.before_request
# def before_request():
#     if not request.is_secure:
#         url = request.url.replace('http://', 'https://', 1)
#         code = 301
#         return redirect(url, code=code)


@app.route('/check_name', methods=['GET'])
def user_exist():
    if request.method == 'GET':
        checking_name = request.args.get("userName")
        try:
            all_names = db.session.query(User.name).all()

            # print(any(x[0] == checking_name for x in all_names))
            if any(x[0] == checking_name for x in all_names):
                return jsonify({"status": 1, "info": "name already taken"})
            else:
                return jsonify({"status": 0, "info": "ye, this is good"})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/check_mail', methods=['GET'])
def email_exist():
    if request.method == 'GET':
        checking_email = request.args.get("email")
        try:
            all_emails = db.session.query(User.email).all()

            # print(any(x[0] == checking_name for x in all_names))
            if any(x[0] == checking_email for x in all_emails):
                return jsonify({"status": 1, "info": "email already taken"})
            else:
                return jsonify({"status": 0, "info": "ye, this is good"})
        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/register_new_user', methods=['POST'])
def register_new_user():
    if request.method == 'POST':
        response = request.get_json()
        name = response['userName']
        email = response['email']
        password = response['password']

        all_users = db.session.query(User).all()
        if any((x.name == name or x.email == email) for x in all_users):
            return jsonify({"status": 1, "id": "name or email already engaged"})

        user = User(name=name, email=email, password=generate_password_hash(password))
        try:
            db.session.add(user)
            db.session.commit()
            last_id = db.session.query(User.id).order_by(User.id.desc()).first()

            token = token_key.dumps(email)
            msg = Mesage('Confirm email', sender="talk", recipients=[email])
            link = url_for('confirm_token', token=str(token), _external=True)
            msg.body = 'Click this link to verify your account on Talk Messenger: ' + link
            mail.send(msg)

            return jsonify({"status": 0, "id": last_id[0]})

        except Exception as e:
            print(str(e))
            return jsonify({"status": 2, "info": str(e)})


@app.route('/confirm_email/<token>', methods=['GET'])
def confirm_token(token):
    if request.method == 'GET':
        try:
            email = token_key.loads(token, max_age=3600)
            user = db.session.query(User).filter_by(email=email).first()
            if user is None:
                return "There is no token like that"

            user.is_activated = True
            db.session.commit()
        except Exception as e:
            return str(e)
        return redirect("/")


@app.route('/create_talk', methods=['POST'])
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
                user = User.query.filter_by(id=user_id).first()
                user.talks = json.dumps(json.loads(User.talks).append(last_id))
            db.session.commit()
            return jsonify({"status": 0, "id": last_id[0]})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/push_mess', methods=['POST'])
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


@app.route('/authorize', methods=['POST'])
def login():
    if request.method == 'POST':

        response = request.get_json()
        name_mail = response['email']
        password = response['password']

        users = User.query.all()
        try:
            for user in users:
                if (user.name == name_mail or user.email == name_mail) and \
                        check_password_hash(user.password, password):

                    if user.is_activated:
                        cur_user = User.query.filter_by(id=user.id).first()
                        login_user(cur_user, duration=datetime.timedelta(hours=24))
                        return jsonify({"status": 0,
                                        "id": user.id,
                                        "talks": user.talks,
                                        "info": "authorization successful"})
                    else:
                        return jsonify({"status": 1, "info": "email not activated"})

            return jsonify({"status": 1, "info": "user not found"})

        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/is_authorized', methods=['GET'])
def is_authorized():
    if request.method == 'GET':
        try:
            is_auth = current_user.is_authenticated
            return jsonify({"status": 0, "is_auth": is_auth})
        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.route('/un_authorize', methods=['GET'])
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

    # print(os.path.join('build', 'static', static_type), filename)

    return send_from_directory(os.path.join('../', 'build', 'static', static_type), filename)
    # return send_from_directory(os.path.join('C:/Users/user/PycharmProjects/flaskStatic/build/static/', static_type), filename)


@app.route('/search_user', methods=['GET'])
def search_user():
    if request.method == "GET":
        value = request.args.get("value")
        try:
            users = db.session.query(User).filter(User.name.startswith(value)).limit(10).all()
            response = list({"id": user.id, "name": user.name} for user in users)
            return jsonify({"status": 0, "users": response})
        except Exception as e:
            return jsonify({"status": 2, "info": str(e)})


@app.errorhandler(404)
def page_not_found(e):
    return redirect('/')

