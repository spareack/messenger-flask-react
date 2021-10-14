from flask import Flask, render_template, request, flash, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'YSAFDB978WH8AYIFHSNUSIJDFK'

db = SQLAlchemy(app)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    # date = db.Column(db.String(20), default=datetime.utcnow)

    def __repr__(self):
        return 'Article %r' % self.id


@app.route('/')
@app.route('/home')
def index():
    return render_template("index.html")


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
                flash('Успешный вход', category='alert-success')
                return redirect('/')
        flash('Некорректные данные', category='alert-danger')
        return render_template("login.html", email=email)
    else:
        return render_template("login.html", email="")


if __name__ == "__main__":
    app.run(debug=True)
