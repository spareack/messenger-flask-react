from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    # date = db.Column(db.String(20), default=datetime.utcnow)

    def __repr__(self):
        return 'Article %r' % self.id


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        name = request.form['userName']
        password = request.form['password']
        email = request.form['email']

        article = Article(userName=name, email=email, password=password)

        db.session.add(article)
        db.session.commit()
    else:
        pass
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
