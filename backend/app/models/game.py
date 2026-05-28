from app.extensions import db


class Game(db.Model):
    __tablename__ = "jogos"

    id = db.Column(db.Integer, primary_key=True)
    time_casa = db.Column(db.String(120), nullable=False)
    time_fora = db.Column(db.String(120), nullable=False)
    data_jogo = db.Column(db.DateTime, nullable=False)
    gols_casa = db.Column(db.Integer, nullable=True)
    gols_fora = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(50), nullable=False)
