from flask import *

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/")
def index():
    url = url_for("templates", filename="landing_page.html")
    return render_template(url)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
