from flask import *

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


class static_servers:
    # Serving methods

    @app.route("/resources/<path:path>", methods=["GET"])
    def get_resource(path):
        # Serve static files from back-end
        return send_from_directory("static", path)

    @app.route("/scripts/<path:path>", methods=["GET"])
    def get_scripts(path):
        # Serve static files from back-end
        return send_from_directory("static/javascripts", path)

    @app.route("/styles/<path:path>", methods=["GET"])
    def get_styles(path):
        # Serve static files from back-end
        return send_from_directory("static/styles", path)

    @app.route("/images/<path:path>", methods=["GET"])
    def get_images(path):
        # Serve static files from back-end
        return send_from_directory("static/images", path)

    @app.route("/templates/<path:template>", methods=["GET"])
    def get_template(template):
        # Serve template files from back-end
        return render_template(template)


if __name__ == "__main__":
    port = 5000
    app.run(port=port, debug=True)
