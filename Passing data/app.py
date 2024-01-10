from flask import *

app = Flask(__name__, template_folder="templates", static_folder="static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/receiver.html", methods=["POST"])
def receive_data():
    try:
        data = request.json

    except Exception:
        data = ""

    print(data)
    return data


if __name__ == "__main__":
    app.run(port=5000)
