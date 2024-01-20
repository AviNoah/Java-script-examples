from flask import *


import os
import tempfile
import base64


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
        folder_name, _ = os.path.splitext(file["name"])  # discard extension
        path = os.path.join(parent, folder_name)

        os.mkdir(path, exist_ok=True)  # Make sure folder exists

        file_path = os.path.join(path, file["name"])
        with open(file_path, "wb") as writable_file:
            writable_file.write(base64.b64decode(file["content"]))

        return True, file_path
    except Exception as e:
        print(e)
        return False, None


@app.route("/drop_files", methods=["POST"])
def saveDroppedFiles():
    # We should handle file extensions here too.
    files: list = request.get_json()
    files: list = filter(lambda file: is_allowed_file(file["name"]), files)

    try:
        for file in files:
            success, file_path = save_file(file)
            if success:
                print(f"File '{file['name']}' saved successfully at '{file_path}'")
            else:
                print(f"Failed to save file '{file['name']}': {file_path}")

        return jsonify({"message": "Files added successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to process files: {str(e)}"}), 500


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
