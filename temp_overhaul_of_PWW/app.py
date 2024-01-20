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
    filename = os.path.basename(filename)
    _, ext = os.path.splitext(filename)
    return ext.lower() in ALLOWED_EXTENSIONS


def save_file(name, content) -> bool:
    # Return whether was successful and path
    parent = app.config["UPLOAD_FOLDER"]
    folder_name, _ = os.path.splitext(name)  # discard extension

    path = os.path.join(parent, folder_name)
    os.makedirs(path, exist_ok=True)  # Make sure folder exists

    file_path = os.path.join(path, name)

    try:
        content.save(file_path)
        return True, file_path
    except Exception as e:
        print(e)
        return False, file_path


@app.route("/drop_files", methods=["POST"])
def save_dropped_files():
    try:
        files: list = request.files.values()

        # Process each file separately
        for file in files:
            if not is_allowed_file(file.filename):
                continue  # Skip any non valid extension

            success, file_path = save_file(file.filename, file)

            if not success:
                return (
                    jsonify(
                        {"error": f"Failed to save file '{file.name}': {file_path}"}
                    ),
                    500,
                )

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
