from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
database_url = os.getenv('DATABASE_URL', 'sqlite:///blog.db')
# Fix for Neon/Heroku postgres URLs
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

db = SQLAlchemy(app)

# Cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Models
class Post(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    excerpt = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    author_id = db.Column(db.String(36), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    read_time = db.Column(db.String(20), nullable=False)
    tags = db.Column(db.Text, nullable=False)  # JSON string
    image_url = db.Column(db.String(500), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    likes = db.Column(db.Text, default='[]')  # JSON string
    comments = db.Column(db.Text, default='[]')  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'id': self.id,
            'title': self.title,
            'excerpt': self.excerpt,
            'content': self.content,
            'author': self.author,
            'authorId': self.author_id,
            'date': self.date,
            'readTime': self.read_time,
            'tags': json.loads(self.tags),
            'imageUrl': self.image_url,
            'slug': self.slug,
            'likes': json.loads(self.likes),
            'comments': json.loads(self.comments)
        }

# Routes
@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/posts/<slug>', methods=['GET'])
def get_post(slug):
    post = Post.query.filter_by(slug=slug).first()
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict())

@app.route('/api/posts', methods=['POST'])
def create_post():
    import json
    data = request.json
    
    post = Post(
        id=data['id'],
        title=data['title'],
        excerpt=data['excerpt'],
        content=data['content'],
        author=data['author'],
        author_id=data['authorId'],
        date=data['date'],
        read_time=data['readTime'],
        tags=json.dumps(data['tags']),
        image_url=data['imageUrl'],
        slug=data['slug'],
        likes=json.dumps(data.get('likes', [])),
        comments=json.dumps(data.get('comments', []))
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify(post.to_dict()), 201

@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    import json
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    data = request.json
    post.title = data.get('title', post.title)
    post.excerpt = data.get('excerpt', post.excerpt)
    post.content = data.get('content', post.content)
    post.author = data.get('author', post.author)
    post.read_time = data.get('readTime', post.read_time)
    post.tags = json.dumps(data.get('tags', json.loads(post.tags)))
    post.image_url = data.get('imageUrl', post.image_url)
    
    if 'likes' in data:
        post.likes = json.dumps(data['likes'])
    if 'comments' in data:
        post.comments = json.dumps(data['comments'])
    
    db.session.commit()
    return jsonify(post.to_dict())

@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'}), 200

@app.route('/api/search', methods=['GET'])
def search_posts():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    posts = Post.query.filter(
        db.or_(
            Post.title.ilike(f'%{query}%'),
            Post.excerpt.ilike(f'%{query}%'),
            Post.content.ilike(f'%{query}%'),
            Post.tags.ilike(f'%{query}%')
        )
    ).all()
    
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Upload image or video to Cloudinary"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        # Determine resource type based on file extension
        file_ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else ''
        resource_type = 'video' if file_ext in ['mp4', 'mov', 'avi', 'mkv', 'webm'] else 'image'
        
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file,
            resource_type=resource_type,
            folder='kogiuncovered',
            transformation=[
                {'quality': 'auto', 'fetch_format': 'auto'}
            ] if resource_type == 'image' else None
        )
        
        return jsonify({
            'url': upload_result['secure_url'],
            'public_id': upload_result['public_id'],
            'resource_type': resource_type,
            'format': upload_result['format']
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/delete-upload', methods=['POST'])
def delete_upload():
    """Delete file from Cloudinary"""
    data = request.json
    public_id = data.get('public_id')
    resource_type = data.get('resource_type', 'image')
    
    if not public_id:
        return jsonify({'error': 'No public_id provided'}), 400
    
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        return jsonify({'message': 'File deleted', 'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

# For Vercel
app = app
