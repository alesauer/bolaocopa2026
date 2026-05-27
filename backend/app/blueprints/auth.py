from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

import bcrypt

from app.extensions import db
from app.models import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    nome = (data.get("nome") or "").strip()
    email = (data.get("email") or "").strip().lower()
    senha = data.get("senha") or ""

    if not nome or not email or not senha:
        return jsonify({"message": "nome, email e senha são obrigatórios"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "email já cadastrado"}), 409

    hashed_password = bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user = User(nome=nome, email=email, senha=hashed_password)
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "email já cadastrado"}), 409

    return jsonify({"id": user.id, "nome": user.nome, "email": user.email, "admin": user.admin}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    senha = data.get("senha") or ""

    if not email or not senha:
        return jsonify({"message": "email e senha são obrigatórios"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.checkpw(senha.encode("utf-8"), user.senha.encode("utf-8")):
        return jsonify({"message": "credenciais inválidas"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "nome": user.nome,
            "email": user.email,
            "admin": user.admin,
        },
    }), 200
