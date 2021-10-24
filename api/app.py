from flask import Flask, render_template, request, flash, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
import datetime
import os


app = Flask(__name__, static_folder='../build', static_url_path='/')
# app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'YSAFDB978WH8AYIFHSNUSIJDFK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)


@app.route('/')
@app.route('/home')
def index():
    app.logger.info('asdasddsa')

    if current_user.is_authenticated:
        return render_template("profile.html")
    else:
        # return render_template("index.html")
        return render_template('index2.html')

        # return send_from_directory(os.path.join('/build'), 'index2.html')


@app.route('/text')
def text_return():
    return 'React здесь'


@app.route('/static/<path:static_type>/<path:filename>')
def serve_static(static_type, filename):
    root_dir = os.path.dirname(os.getcwd())
    # print(root_dir)
    # root_dir = root_dir.replace('\\', '/')
    # print(os.path.join(root_dir, 'flaskTest', 'build', 'static', static_type))
    return send_from_directory(os.path.join('build', 'static', static_type), filename)

    # return send_from_directory('C:/Users/user/PycharmProjects/flaskTest/build/static/css', filename)


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


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    # date = db.Column(db.String(20), default=datetime.utcnow)

    def __repr__(self):
        return 'Article %r' % self.id


@app.route('/registration', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        name = request.form['userName']
        email = request.form['email']
        password = request.form['password']
        password2 = request.form['password2']

        if name == "" or password == "" or email == "":
            flash('Пустые ячейки', category='alert-danger')
            return render_template("registration.html", data=[name, email, password, password2])

        if password == password2:
            article = Article(userName=name, email=email, password=password)
            db.session.add(article)
            db.session.commit()
            flash('Успешная регистрация', category='alert-success')
            return redirect('/login')
        else:
            flash('Пороли не совпадают', category='alert-danger')
            return render_template("registration.html", data=[name, email, password, password2])
    else:
        return render_template("registration.html", data=["", "", "", ""])


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        password = request.form['password']
        email = request.form['email']

        articles = Article.query.all()
        for data in articles:
            if data.email == email and data.password == password:
                login_user(UserLogin(data.id), duration=datetime.timedelta(hours=24))
                flash('Успешный вход', category='alert-success')
                return redirect('/')
        flash('Некорректные данные', category='alert-danger')
        return render_template("login.html", email=email)
    else:
        return render_template("login.html", email="")


@app.route('/logout')
def logout():
    logout_user()
    return redirect("/")


@login_manager.user_loader
def load_user(user_id):
    return UserLogin(user_id)


if __name__ == "__main__":
    app.run(debug=True)
