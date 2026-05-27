from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

protected_bp = Blueprint("protected", __name__)


@protected_bp.get("/protected")
@jwt_required()
def protected_route():
    return jsonify({"message": "Acesso autorizado", "user_id": get_jwt_identity()}), 200
