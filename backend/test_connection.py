import requests

try:
    response = requests.get('http://localhost:5000/api/posts')
    print(f"✅ Backend is running!")
    print(f"Status: {response.status_code}")
    print(f"Posts: {len(response.json())} posts found")
except Exception as e:
    print(f"❌ Backend is NOT running!")
    print(f"Error: {e}")
    print("\nTo start the backend, run:")
    print("  cd kogiuncoveredtv/backend")
    print("  python app.py")
