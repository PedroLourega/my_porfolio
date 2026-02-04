from flask import Flask
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "dev"

    from.routes import bp
    app.register_blueprint(bp)

    return app
