from datetime import datetime

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Game

games_bp = Blueprint("games", __name__)


SEED_GAMES = [
    {
        "time_casa": "Brasil",
        "time_fora": "Argentina",
        "data_jogo": datetime(2026, 6, 12, 21, 0),
        "gols_casa": None,
        "gols_fora": None,
        "status": "agendado",
    },
    {
        "time_casa": "França",
        "time_fora": "Alemanha",
        "data_jogo": datetime(2026, 6, 13, 18, 0),
        "gols_casa": 2,
        "gols_fora": 1,
        "status": "finalizado",
    },
    {
        "time_casa": "Espanha",
        "time_fora": "Portugal",
        "data_jogo": datetime(2026, 6, 14, 16, 0),
        "gols_casa": None,
        "gols_fora": None,
        "status": "agendado",
    },
]


def ensure_games_seeded():
    existing_matchups = {
        (game.time_casa, game.time_fora, game.data_jogo.isoformat())
        for game in Game.query.all()
    }

    created = False
    for payload in SEED_GAMES:
        matchup = (payload["time_casa"], payload["time_fora"], payload["data_jogo"].isoformat())
        if matchup in existing_matchups:
            continue
        db.session.add(Game(**payload))
        created = True

    if created:
        db.session.commit()


@games_bp.get("/jogos")
@jwt_required()
def list_games():
    ensure_games_seeded()
    games = Game.query.order_by(Game.data_jogo.asc()).all()
    return jsonify([
        {
            "id": game.id,
            "time_casa": game.time_casa,
            "time_fora": game.time_fora,
            "data_jogo": game.data_jogo.isoformat(),
            "gols_casa": game.gols_casa,
            "gols_fora": game.gols_fora,
            "status": game.status,
        }
        for game in games
    ]), 200


@games_bp.get("/jogos/<int:game_id>")
@jwt_required()
def get_game(game_id):
    ensure_games_seeded()
    game = Game.query.get_or_404(game_id)
    return jsonify({
        "id": game.id,
        "time_casa": game.time_casa,
        "time_fora": game.time_fora,
        "data_jogo": game.data_jogo.isoformat(),
        "gols_casa": game.gols_casa,
        "gols_fora": game.gols_fora,
        "status": game.status,
    }), 200
