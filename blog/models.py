from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from cloudinary.models import CloudinaryField


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    featured_image = CloudinaryField('image', blank=True, null=True)
    
    # Video field
    video_url = models.URLField(max_length=500, blank=True, help_text='YouTube or Vimeo URL')
    
    tags = models.CharField(max_length=200, help_text='Comma-separated tags')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    def reading_time(self):
        words = len(self.content.split())
        minutes = max(1, words // 200)
        return f"{minutes} min read"


class PostAttachment(models.Model):
    """Downloadable attachments for posts"""
    ATTACHMENT_TYPES = [
        ('pdf', 'PDF Document'),
        ('doc', 'Word Document'),
        ('video', 'Video File'),
        ('audio', 'Audio File'),
        ('other', 'Other'),
    ]
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='attachments')
    title = models.CharField(max_length=200, help_text='Display name for the attachment')
    file = CloudinaryField('raw', resource_type='auto')
    file_type = models.CharField(max_length=10, choices=ATTACHMENT_TYPES, default='pdf')
    file_size = models.CharField(max_length=50, blank=True, help_text='e.g., 2.5 MB')
    description = models.TextField(blank=True, help_text='Optional description')
    download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f'{self.title} - {self.post.title}'
    
    def increment_download(self):
        self.download_count += 1
        self.save(update_fields=['download_count'])


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['created_at']
        
    def __str__(self):
        return f'Comment by {self.author_name} on {self.post.title}'


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user_ip = models.GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('post', 'user_ip')
        
    def __str__(self):
        return f'Like on {self.post.title}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f'Message from {self.name} - {self.subject}'


class PageView(models.Model):
    page_url = models.CharField(max_length=500)
    user_ip = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    referrer = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['page_url']),
        ]
        
    def __str__(self):
        return f'{self.page_url} - {self.created_at}'
