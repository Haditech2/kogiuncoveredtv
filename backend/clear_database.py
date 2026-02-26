"""
Script to clear all posts from the database
Run this once to remove old posts with blob URLs
"""
from app import app, db, Post

with app.app_context():
    # Delete all posts
    num_deleted = Post.query.delete()
    db.session.commit()
    print(f"✅ Deleted {num_deleted} posts from database")
    print("Database is now clean. You can create new posts with Cloudinary images.")
