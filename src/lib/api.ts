const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getPosts() {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getPostBySlug(slug: string) {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async createPost(post: any) {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  async updatePost(id: string, post: any) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  async deletePost(id: string) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  },

  async searchPosts(query: string) {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search posts');
    return response.json();
  },

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload file');
    return response.json();
  },

  async deleteUpload(publicId: string, resourceType: string = 'image') {
    const response = await fetch(`${API_URL}/delete-upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId, resource_type: resourceType }),
    });

    if (!response.ok) throw new Error('Failed to delete file');
    return response.json();
  },
};
