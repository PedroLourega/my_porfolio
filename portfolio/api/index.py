import os
import sys
from flask import Flask

# coloca a raiz do projeto no sys.path (pra imports funcionarem na Vercel)
ROOT = os.path.dirname(os.path.dirname(__file__))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

# IMPORTA seu blueprint
from app.routes import bp  # <- ajuste "app" se sua pasta tiver outro nome

app = Flask(
    __name__,
    template_folder=os.path.join(ROOT, "app", "templates"),
    static_folder=os.path.join(ROOT, "app", "static"),
)

app.register_blueprint(bp)
