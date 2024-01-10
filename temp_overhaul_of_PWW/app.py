from flask import *

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/")
def index():
    print(url_for("templates", filename="spreadsheet_view.html"))
    return render_template("landing_page.html")


if __name__ == "__main__":
    app.run(port=3000)
