from flask import Flask

from app.blueprints import auth_bp, games_bp, health_bp, protected_bp
from app.config import Config
from app.extensions import db, init_extensions


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_extensions(app)

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(games_bp, url_prefix="/api")
    app.register_blueprint(protected_bp, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app
