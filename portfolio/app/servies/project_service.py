import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "projects.json"

def get_projects():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
    
def filter_projects_by_tag(projects, tag):
    tag = tag.lower()
    return [
        p for p in projects
        if any(t.lower() == tag for t in p.get("tags", []))
    ]