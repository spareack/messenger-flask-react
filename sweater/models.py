from datetime import datetime

from flask_login import UserMixin

from sweater import db, login_manager

from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    # __bind_key__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(40), nullable=False)
    date_create = db.Column(db.String(30), server_default=func.now())
    is_activated = db.Column(db.Boolean, default=False)
    dialogs = db.Column(db.Text, default="[]")

    def is_active(self):
        return self.is_activated


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class Dialog(db.Model):
    # __bind_key__ = 'dialogs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=True)
    members = db.Column(db.Text)
    talks = db.Column(db.Text, default="[]")
    date_create = db.Column(db.String(30), server_default=func.now())
    date_update = db.Column(db.String(30), onupdate=func.now())


class Talk(db.Model):
    # __bind_key__ = 'talks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    messages = db.Column(db.Text, default="[]")
    date_create = db.Column(db.String(30), server_default=func.now())
    date_update = db.Column(db.String(30), onupdate=func.now())


class Message(db.Model):
    # __bind_key__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(20), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    value = db.Column(db.Text, nullable=False)
    date_create = db.Column(db.String(30), server_default=func.now())


class Media(db.Model):
    # __bind_key__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    data = db.Column(db.BLOB, nullable=False)
    date_create = db.Column(db.String(30), server_default=func.now())
