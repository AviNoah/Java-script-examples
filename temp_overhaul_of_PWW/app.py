from flask import *

app = Flask(__name__, static_folder="static", template_folder="templates")


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
