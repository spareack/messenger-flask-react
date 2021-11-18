import datetime
import json
import os
import io
import traceback

from flask import render_template, request, redirect, send_from_directory, jsonify, url_for, send_file
from flask_login import login_user, current_user, logout_user
from flask_mail import Message as Mesage
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
from flask_socketio import emit, send, join_room, leave_room
from sqlalchemy.sql import func

from sweater import app, db, mail, token_key, socketio
from sweater.models import User, Talk, Message, Dialog, Media


rooms_list = []


@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')


@socketio.on('authorize')
# @cross_origin()
def handle_connection(data):
    user_id = data['id']
    join_room(user_id)
    rooms_list.append(user_id)
    print("connect!", user_id)

    # emit('server-client', 'Test message')


@socketio.on('connect')
# @cross_origin()
def disconnect_socket():
    print("first-connect!")


@socketio.on('disconnect')
# @cross_origin()
def disconnect_socket():
    user_id = current_user.get_id()
    leave_room(user_id)
    print("disconnect(", user_id)


@socketio.on('client-server')
# @cross_origin()
def handle_client_msg(msg):
    print("\n" + str(msg))


# @app.before_request
# def before_request():
#     if not request.is_secure:
#         url = request.url.replace('http://', 'https://', 1)
#         code = 301
#         return redirect(url, code=code)


@app.route('/check_name', methods=['GET'])
def check_name():
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
            return jsonify({"status": 666, "info": str(e)})


@app.route('/check_mail', methods=['GET'])
def check_mail():
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
            return jsonify({"status": 666, "info": str(e)})


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
            return jsonify({"status": 666, "info": str(e)})


@app.route('/confirm_email/<token>', methods=['GET'])
def confirm_token(token):
    if request.method == 'GET':
        try:
            email = token_key.loads(token, max_age=3600)
            user = db.session.query(User).filter_by(email=email).first_or_404()
            if user is None:
                return "There is no token like that"

            user.is_activated = True
            db.session.commit()
        except Exception as e:
            return str(e)
        return redirect("/")


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
                        login_user(user, duration=datetime.timedelta(hours=24))

                        user_id = user.id

                        dialogs_ids = json.loads(user.dialogs)
                        dialogs = db.session.query(Dialog).filter(
                            Dialog.id.in_(dialogs_ids)).order_by(Dialog.date_update.desc()).all()

                        response_list = []
                        for dialog in dialogs:
                            members_list = []
                            members = json.loads(dialog.members)
                            members.remove(user_id)
                            for member_id in members:
                                member = db.session.query(User).filter_by(id=member_id).first_or_404()
                                members_list.append(member.name)

                            talks_ids = json.loads(dialog.talks)
                            last_message_value = None
                            if len(talks_ids) > 0:

                                talk = db.session.query(Talk).filter(Talk.id.in_(talks_ids)).order_by(
                                    Talk.date_update.desc()).first_or_404()

                                messages_ids = json.loads(talk.messages)
                                if len(messages_ids) > 0:
                                    message = db.session.query(Message).filter(Message.id.in_(messages_ids)).order_by(
                                        Message.date_create.desc()).first_or_404()
                                    if message.type == "text":
                                        last_message_value = message.value
                                    else:
                                        last_message_value = message.type

                            response_list.append({"id": dialog.id,
                                                  "other_members": members_list,
                                                  "last_message": last_message_value})

                        return jsonify({"status": 0,
                                        "id": user.id,
                                        "name": user.name,
                                        "dialogs": response_list,
                                        "info": "authorization successful"})
                    else:
                        return jsonify({"status": 1, "info": "email not activated"})

            return jsonify({"status": 1, "info": "user not found"})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/is_authorized', methods=['GET'])
def is_authorized():
    if request.method == 'GET':
        try:
            if current_user.is_authenticated:
                user_id = int(current_user.get_id())
                user = db.session.query(User).filter_by(id=user_id).first_or_404()

                dialogs_ids = json.loads(user.dialogs)
                dialogs = db.session.query(Dialog).filter(
                    Dialog.id.in_(dialogs_ids)).order_by(Dialog.date_update.desc()).all()

                response_list = []
                for dialog in dialogs:
                    members_list = []
                    members = json.loads(dialog.members)
                    members.remove(user_id)
                    for member_id in members:
                        member = db.session.query(User).filter_by(id=member_id).first_or_404()
                        members_list.append(member.name)

                    talks_ids = json.loads(dialog.talks)
                    last_message_value = None
                    if len(talks_ids) > 0:

                        talk = db.session.query(Talk).filter(Talk.id.in_(talks_ids)).order_by(
                            Talk.date_update.desc()).first_or_404()

                        messages_ids = json.loads(talk.messages)
                        if len(messages_ids) > 0:
                            message = db.session.query(Message).filter(Message.id.in_(messages_ids)).order_by(
                                Message.date_create.desc()).first_or_404()
                            if message.type == "text":
                                last_message_value = message.value
                            else:
                                last_message_value = message.type

                    response_list.append(
                        {"id": dialog.id, "other_members": members_list, "last_message": last_message_value})

                return jsonify({"status": 0,
                                "is_auth": True,
                                "id": user_id,
                                "name": user.name,
                                "dialogs": response_list})
            else:
                return jsonify({"status": 0, "is_auth": False})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/un_authorize', methods=['GET'])
def log_out():
    if request.method == 'GET':
        try:
            logout_user()
            return redirect("/")
        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/static/<path:static_type>/<path:filename>')
def serve_static(static_type, filename):
    # root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(os.path.join('../', 'build', 'static', static_type), filename)


@app.route('/search_user', methods=['GET'])
def search_user():
    if request.method == "GET":

        value = request.args.get("value")
        try:
            cur_user = db.session.query(User).filter_by(id=int(current_user.get_id())).first_or_404()
            dialogs = db.session.query(Dialog).filter(Dialog.id.in_(json.loads(cur_user.dialogs))).all()

            own_members = set()
            for dialog in dialogs:
                members_list = json.loads(dialog.members)
                if len(members_list) < 3:
                    for member in members_list:
                        own_members.add(member)

            users = db.session.query(User).filter(User.name.startswith(value)).filter(
                User.id.not_in(own_members)).limit(10).all()

            response = list({"id": user.id, "name": user.name} for user in users)
            return jsonify({"status": 0, "users": response})
        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


def add_to_json(obj, count):
    lst = json.loads(obj)
    lst.append(count)
    return json.dumps(lst)


@app.route('/create_dialog', methods=['POST'])
def create_dialog():
    if request.method == "POST":

        try:
            data = request.get_json()
            title = data["title"]
            members = data["members"]

            cur_id = int(current_user.get_id())
            cur_user = db.session.query(User).filter_by(id=cur_id).first_or_404()
            dialogs = db.session.query(Dialog).filter(Dialog.id.in_(json.loads(cur_user.dialogs))).all()

            own_members = set()
            for dialog in dialogs:
                members_list = json.loads(dialog.members)
                if len(members_list) < 3:
                    for member in members_list:
                        own_members.add(member)

            if len(members) < 3:
                if all(member_id in own_members for member_id in members):
                    return jsonify({"status": 1, "info": "already have dialog with that user"})

            dialog = Dialog(members=json.dumps(members))
            db.session.add(dialog)
            db.session.commit()

            for user_id in members:
                user = db.session.query(User).filter_by(id=user_id).first_or_404()
                user.dialogs = add_to_json(user.dialogs, dialog.id)

            db.session.commit()

            return jsonify({"status": 0, "id": dialog.id})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/create_talk', methods=['POST'])
def create_talk():
    if request.method == "POST":
        try:
            data = request.get_json()
            title = data["title"]
            # members = data["members"]
            dialog_id = data["dialog_id"]

            talk = Talk(title=title)
            db.session.add(talk)
            db.session.commit()

            dialog = db.session.query(Dialog).filter_by(id=dialog_id).first_or_404()
            dialog.talks = add_to_json(dialog.talks, talk.id)

            db.session.commit()

            return jsonify({"status": 0, "id": talk.id})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/send_message', methods=['POST'])
def send_message():
    if request.method == "POST":
        try:
            # print(type(func.utcnow()))
            data = request.get_json()
            sender_id = data["sender_id"]
            talk_id = data["talk_id"]
            dialog_id = data["dialog_id"]
            message_type = data["message_type"]
            value = None

            if message_type == "media":
                file = request.files["value"]
                allowed_extension = {'txt', 'png', 'jpg', 'jpeg'}
                if file and '.' in file.filename:
                    filename = secure_filename(file.filename)
                    split_name = filename.rsplit('.', 1)
                    if split_name[1] in allowed_extension:
                        media = Media(name=split_name[0], type=split_name[1], data=file.read())
                        db.session.add(media)
                        db.session.commit()
                        value = media.id
            else:
                value = data["value"]

            message = Message(sender=sender_id, type=message_type, value=value)
            db.session.add(message)
            db.session.commit()

            talk = db.session.query(Talk).filter_by(id=talk_id).first_or_404()
            talk.messages = add_to_json(talk.messages, message.id)

            dialog = db.session.query(Dialog).filter_by(id=dialog_id).first_or_404()
            dialog.date_update = func.now()

            db.session.commit()

            users = db.session.query(User).all()
            for user in users:
                dialogs_ids = json.loads(user.dialogs)
                if dialog.id in dialogs_ids:
                    if user.id in rooms_list:
                        emit('info', jsonify({'info': 'new Messages in dialog', 'dialog_id': dialog.id}), to=str(user.id), namespace='/')

            return jsonify({"status": 0, "id": message.id, "date": message.date_create})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e) + traceback.format_exc()})


@app.route('/get_dialogs', methods=['GET'])
def get_dialog():
    if request.method == "GET":

        try:
            user_id = request.args.get("user_id")

            user = User.query.filter_by(id=user_id).first_or_404()
            dialogs_ids = json.loads(user.dialogs)
            dialogs = db.session.query(Dialog).filter(
                Dialog.id.in_(dialogs_ids)).order_by(Dialog.date_update.desc()).all()

            response_list = []

            for dialog in dialogs:
                members_list = []
                members = json.loads(dialog.members)
                members.remove(user_id)
                for member_id in members:
                    member = db.session.query(User).filter_by(id=member_id).first_or_404()
                    members_list.append(member.name)

                talks_ids = json.loads(dialog.talks)
                last_message_value = None
                if len(talks_ids) > 0:

                    talk = db.session.query(Talk).filter(Talk.id.in_(talks_ids)).order_by(
                        Talk.date_update.desc()).first_or_404()

                    messages_ids = json.loads(talk.messages)
                    if len(messages_ids) > 0:
                        message = db.session.query(Message).filter(Message.id.in_(messages_ids)).order_by(
                            Message.date_create.desc()).first_or_404()
                        if message.type == "text":
                            last_message_value = message.value
                        else:
                            last_message_value = message.type

                response_list.append({"id": dialog.id, "members": members_list, "last_message": last_message_value})

            return jsonify({"status": 0, "dialogs": response_list})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/get_talks', methods=['GET'])
def get_talks():
    if request.method == "GET":
        try:
            dialog_id = request.args.get("dialog_id")
            dialog = db.session.query(Dialog).filter_by(id=dialog_id).first_or_404()
            talks_ids = json.loads(dialog.talks)

            talks = db.session.query(Talk).filter(Talk.id.in_(talks_ids)).order_by(
                Talk.date_update.desc()).all()

            response_list = list({"id": talk.id, "title": talk.title} for talk in talks)

            return jsonify({"status": 0, "talks": response_list})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


# @app.route('/upload_file', methods=['POST'])
# def upload_file():
#     if request.method == 'POST':
#         allowed_extension = {'txt', 'png', 'jpg', 'jpeg'}
#         response_list = []
#
#         for message in allowed_extension:
#             if message.type == "text":
#                 value = message.value
#             else:
#                 media = db.session.query(Media).filter_by(id=12).first()
#                 value = send_file(io.BytesIO(media.data), attachment_filename=(media.name + "." + media.type))
#
#         # file.save(os.path.join(app.config['UPLOAD_FOLDER'], str(media.id) + "." + split_name[1]))
#         # media = db.session.query(Media).filter_by(id=12).first()
#         # return send_file(io.BytesIO(media.data), attachment_filename=(media.name + "." + media.type))
#
#         return jsonify({"status": 0, "info": "successful"})
#     else:
#         return jsonify({"status": 1, "info": "invalid file"})


@app.route('/get_messages', methods=['GET'])
def get_messages():
    if request.method == "GET":
        try:
            talk_id = request.args.get("talk_id")
            talk = db.session.query(Talk).filter_by(id=talk_id).first_or_404()
            messages_ids = json.loads(talk.messages)

            messages = db.session.query(Message).filter(Message.id.in_(messages_ids)).order_by(
                Message.id).all()

            response_list = []
            for message in messages:
                if message.type == "text":
                    value = message.value
                else:
                    media = db.session.query(Media).filter_by(id=12).first()
                    value = send_file(io.BytesIO(media.data), attachment_filename=(media.name + "." + media.type))

                response_list.append({"id": message.id,
                                      "sender": message.sender,
                                      "type": message.type,
                                      "value": value,
                                      "date": message.date_create})

            return jsonify({"status": 0, "messages": response_list})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/get_last_messages', methods=['GET'])
def get_last_messages():
    if request.method == "GET":
        try:
            dialog_id = request.args.get("dialog_id")

            talk = db.session.query(Talk).order_by(Talk.date_update.desc()).first()
            if talk is not None:

                messages_ids = json.loads(talk.messages)

                messages = db.session.query(Message).filter(Message.id.in_(messages_ids)).order_by(
                    Message.date_create.desc()).all()

                response_list = list({"id": message.id,
                                      "sender": message.sender,
                                      "type": message.type,
                                      "value": message.value,
                                      "date": message.date_create} for message in messages)

                return jsonify({"status": 0, "messages": response_list, "dialog_id": dialog_id})
            else:
                return jsonify({"status": 1, "info": "no founded dialogs..."})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.errorhandler(404)
def page_not_found(e):
    return redirect('/')

