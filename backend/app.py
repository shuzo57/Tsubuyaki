from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import Post, add_post, get_posts


def create_app():
    app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
    CORS(app)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    @app.route('/<path:path>')
    def static_proxy(path: str):
        return send_from_directory(app.static_folder, path)

    @app.route('/posts', methods=['GET', 'POST'])
    def posts():
        if request.method == 'POST':
            data = request.get_json() or {}
            post = Post(content=data.get('content', ''))
            add_post(post)
            return jsonify(post.to_dict()), 201
        posts = get_posts()
        return jsonify([p.to_dict() for p in posts])

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
