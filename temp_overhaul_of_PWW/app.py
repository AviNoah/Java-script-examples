from flask import *


import os
import tempfile

import json

app = Flask(__name__, static_folder="static", template_folder="templates")
UPLOAD_FOLDER: str = tempfile.mkdtemp()
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS: set = {".xlsx", ".csv"}


def is_allowed_file(filename: str) -> bool:
    global ALLOWED_EXTENSIONS
    _, ext = os.path.splitext(filename)
    return ext.lower() in ALLOWED_EXTENSIONS


def save_file(file) -> bool:
    # Return whether was successful and path
    try:
        parent = app["UPLOAD_FOLDER"]
        folder_name = os.path.basename(file.filename)
        folder_name, _ = os.path.splitext(file.filename)  # discard extension
        path = os.path.join(parent, folder_name)

        os.mkdir(path, exist_ok=True)  # Make sure folder exists

        file_path = os.path.join(path, file.filename)
        file.save(file, file_path)
        return True, file_path
    except Exception as e:
        print(e)
        return False, None


@app.route("/drop_files", methods=["POST"])
def saveDroppedFiles():
    # We should handle file extensions here too.
    body_json = request.get_json()
    files: list = json.load(body_json)
    files: list = filter(
        is_allowed_file(lambda file: is_allowed_file(file.filename)), files
    )

    for file in files:
        save_file(file)

    return request.referrer  # Don't move from page


@app.route("/")
def index():
    return render_template("landing_page.html")


@app.route("/select_file")
def file_select():
    return render_template("folder_file_view.html")


@app.route("/spreadsheet_view")
def show_spreadsheet():
    return render_template("spreadsheet_view.html")


@app.route("/filter_popup")
def show_filter_popup():
    return render_template("filterPopup.html")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
