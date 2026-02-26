# Kogiuncovered TV Backend API

Flask backend for the Kogiuncovered TV blog platform.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Run the app:
```bash
python app.py
```

The API will be available at http://localhost:5000

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/<slug>` - Get post by slug
- `POST /api/posts` - Create new post
- `PUT /api/posts/<id>` - Update post
- `DELETE /api/posts/<id>` - Delete post
- `GET /api/search?q=query` - Search posts

## Deploy to Vercel

```bash
vercel
```
