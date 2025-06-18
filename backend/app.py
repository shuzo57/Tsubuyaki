from flask import Flask, request, jsonify
from flask_cors import CORS
from models import Post, add_post, get_posts


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/posts', methods=['GET', 'POST'])
    def posts():
        if request.method == 'POST':
            data = request.get_json() or {}
            post = Post(
                content=data.get('content', ''),
                reply_to=data.get('reply_to'),
            )
            add_post(post)
            return jsonify(post.to_dict()), 201
        posts = get_posts()
        return jsonify([p.to_dict() for p in posts])

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
