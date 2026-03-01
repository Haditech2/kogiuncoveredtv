"""
Quick test to verify the custom editor setup
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kogiuncovered.settings')
django.setup()

from blog.models import Post
from django.contrib.auth.models import User

print("Testing Custom Editor Setup")
print("=" * 50)

# Check if admin user exists
admin = User.objects.filter(username='admin').first()
if admin:
    print("✅ Admin user exists")
else:
    print("❌ Admin user not found")
    print("   Run: python create_admin.py")

# Check Post model
print("\n📝 Post Model Check:")
print(f"   - Model: {Post.__name__}")
print(f"   - Content field type: {Post._meta.get_field('content').__class__.__name__}")
print(f"   - Total posts: {Post.objects.count()}")

# Check if we can create a test post
if admin:
    test_content = """
    <h2>Test Heading</h2>
    <p>This is a <strong>test post</strong> with <em>formatted</em> content.</p>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
    </ul>
    <p>This verifies the custom Quill.js editor is working correctly.</p>
    """
    
    # Check if test post exists
    test_post = Post.objects.filter(title="Editor Test Post").first()
    if test_post:
        print("\n✅ Test post already exists")
        print(f"   - Title: {test_post.title}")
        print(f"   - Slug: {test_post.slug}")
        print(f"   - Content length: {len(test_post.content)} characters")
    else:
        print("\n📝 Creating test post...")
        try:
            test_post = Post.objects.create(
                title="Editor Test Post",
                slug="editor-test-post",
                excerpt="A test post to verify the custom Quill.js editor",
                content=test_content,
                author=admin,
                tags="Test, Editor, Quill",
                published=False  # Draft mode
            )
            print("✅ Test post created successfully!")
            print(f"   - Title: {test_post.title}")
            print(f"   - Slug: {test_post.slug}")
            print(f"   - URL: http://localhost:8000/articles/{test_post.slug}/")
        except Exception as e:
            print(f"❌ Error creating test post: {e}")

print("\n" + "=" * 50)
print("Setup Verification Complete!")
print("\nNext Steps:")
print("1. Run: python manage.py runserver")
print("2. Visit: http://localhost:8000/login/")
print("3. Login with: admin / admin123")
print("4. Go to: http://localhost:8000/dashboard/")
print("5. Click 'Create New Post' to test the editor")
print("=" * 50)
