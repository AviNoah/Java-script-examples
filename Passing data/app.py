from flask import *

app = Flask(__name__, template_folder="templates", static_folder="static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/receiver.html", methods=["POST", "GET"])
def receive_data():
    print(request.method)
    if request.method == "GET":
        # This method is not a resource, simply show html
        return render_template("receiver.html")
    elif request.method != "POST":
        raise Exception(f"Unimplemented method {request.method} for receive_data")
    try:
        data = request.json

    except Exception:
        data = ""

    print(data)
    return data


if __name__ == "__main__":
    app.run(port=5000)
