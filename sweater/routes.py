import datetime
import json
import os
import io

from flask import render_template, request, redirect, send_from_directory, jsonify, url_for, send_file
from flask_login import login_user, current_user, logout_user
from flask_mail import Message as Mesage
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from sweater import app, db, mail, token_key
from sweater.models import User, Talk, Message, Dialog, Media


@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')


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
                        cur_user = User.query.filter_by(id=user.id).first_or_404()
                        login_user(cur_user, duration=datetime.timedelta(hours=24))
                        return jsonify({"status": 0,
                                        "id": user.id,
                                        "dialogs": json.loads(user.dialogs),
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
                dialogs = db.session.query(Dialog).filter_by(
                    id=Dialog.id.in_(dialogs_ids)).order_by(Dialog.date_update.desc()).all()

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

                        talk = db.session.query(Talk).filter_by(id=Talk.id.in_(talks_ids)).order_by(
                            Talk.date_update.desc()).first_or_404()

                        messages_ids = json.loads(talk.messages)
                        if len(messages_ids) > 0:
                            message = db.session.query(Message).filter_by(id=Message.id.in_(messages_ids)).order_by(
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
            users = db.session.query(User).filter(User.name.startswith(value)).limit(10).all()
            response = list({"id": user.id, "name": user.name} for user in users)
            return jsonify({"status": 0, "users": response})
        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/create_dialog', methods=['POST'])
def create_dialog():
    if request.method == "POST":

        try:
            data = request.get_json()
            title = data["title"]
            members = data["members"]

            dialog = Dialog(members=json.dumps(members))
            db.session.add(dialog)
            db.session.commit()

            for user_id in members:
                user = db.session.query(User).filter_by(id=user_id).first_or_404()
                user.dialogs = json.dumps(json.loads(user.dialogs).append(dialog.id))
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
            members = data["members"]
            dialog_id = data["dialog_id"]

            talk = Talk(title=title)
            db.session.add(talk)
            db.session.commit()

            dialog = db.session.query(Dialog).filter_by(id=dialog_id).first_or_404()
            dialog.talks = json.dumps(json.loads(dialog.talks).append(talk.id))
            db.session.commit()

            return jsonify({"status": 0, "id": dialog_id})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/send_message', methods=['POST'])
def send_message():
    if request.method == "POST":
        try:
            data = request.get_json()
            sender_id = data["sender_id"]
            talk_id = data["talk_id"]
            message_type = data["type"]
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
            talk.messages = json.dumps(json.loads(talk.messages).append(message.id))
            db.session.commit()

            return jsonify({"status": 0, "id": message.id, "date": message.date_create})

        except Exception as e:
            return jsonify({"status": 666, "info": str(e)})


@app.route('/get_dialogs', methods=['GET'])
def get_dialog():
    if request.method == "GET":

        try:
            user_id = request.args.get("user_id")

            user = User.query.filter_by(id=user_id).first_or_404()
            dialogs_ids = json.loads(user.dialogs)
            dialogs = db.session.query(Dialog).filter_by(
                id=Dialog.id.in_(dialogs_ids)).order_by(Dialog.date_update.desc()).all()

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

                    talk = db.session.query(Talk).filter_by(id=Talk.id.in_(talks_ids)).order_by(
                        Talk.date_update.desc()).first_or_404()

                    messages_ids = json.loads(talk.messages)
                    if len(messages_ids) > 0:
                        message = db.session.query(Message).filter_by(id=Message.id.in_(messages_ids)).order_by(
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

            talks = db.session.query(Talk).filter_by(id=Talk.id.in_(talks_ids)).order_by(
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

            messages = db.session.query(Message).filter_by(id=Message.id.in_(messages_ids)).order_by(
                Message.date_create.desc()).all()

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

                messages = db.session.query(Message).filter_by(id=Message.id.in_(messages_ids)).order_by(
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

