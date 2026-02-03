from flask import Blueprint, render_template, request
from .servies.project_service import get_projects, filter_projects_by_tag

bp = Blueprint("main", __name__)

@bp.get("/")
def home():
    projects = get_projects()
    featured = projects[:3]
    return render_template("home.html", featured=featured)

@bp.get("/projects")
def projects():
    tag = request.args.get("tag")
    all_projects = get_projects()

    if tag:
        all_projects = filter_projects_by_tag(all_projects, tag)

    return render_template("projects.html", projects=all_projects,active_tag=tag)

@bp.get("/about")
def about():
    return render_template("about.html")

@bp.route("/contact",methods=["GET","POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name","").strip()
        email = request.form.get("email","").strip()
        message = request.form.get("message","").strip()

        errors = []
        if not name:
            errors.append("Seu nome é obrigatório. Preencha o campo.")
        if not email or "@" not in email:
            errors.append("Digite um email válido.")
        if len(message) < 10:
            errors.append("A mensagem precisa ter pelo menos 10 caracteres...")

        if errors:
            return render_template("contact.html", errors=errors, values=request.form)
        
        return render_template("contact.html", success=True)
    
    return render_template("contact.html")