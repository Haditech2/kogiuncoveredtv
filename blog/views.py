from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q, Count
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.utils import timezone
from datetime import timedelta
from .models import Post, Comment, Like, ContactMessage, PageView
from .forms import PostForm, CommentForm, ContactForm


def get_client_ip(request):
    """Get client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def home(request):
    """Home page with featured posts"""
    featured_posts = Post.objects.filter(published=True)[:6]
    latest_posts = Post.objects.filter(published=True)[:3]
    
    context = {
        'featured_posts': featured_posts,
        'latest_posts': latest_posts,
    }
    return render(request, 'blog/home.html', context)


def articles_list(request):
    """List all articles"""
    posts = Post.objects.filter(published=True)
    paginator = Paginator(posts, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
    }
    return render(request, 'blog/articles.html', context)


def article_detail(request, slug):
    """Article detail page"""
    post = get_object_or_404(Post, slug=slug, published=True)
    comments = post.comments.filter(approved=True)
    user_ip = get_client_ip(request)
    user_liked = Like.objects.filter(post=post, user_ip=user_ip).exists()
    
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.save()
            messages.success(request, 'Your comment has been posted!')
            return redirect('article_detail', slug=slug)
    else:
        comment_form = CommentForm()
    
    context = {
        'post': post,
        'comments': comments,
        'comment_form': comment_form,
        'user_liked': user_liked,
        'likes_count': post.likes.count(),
        'comments_count': comments.count(),
    }
    return render(request, 'blog/article_detail.html', context)


@login_required
def admin_dashboard(request):
    """Admin dashboard to manage all posts"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to access the admin dashboard.')
        return redirect('home')
    
    posts = Post.objects.all().order_by('-created_at')
    unread_messages = ContactMessage.objects.filter(read=False).count()
    
    # Statistics
    today = timezone.now().date()
    last_7_days = today - timedelta(days=7)
    last_30_days = today - timedelta(days=30)
    
    total_views = PageView.objects.count()
    views_today = PageView.objects.filter(created_at__date=today).count()
    views_7_days = PageView.objects.filter(created_at__date__gte=last_7_days).count()
    views_30_days = PageView.objects.filter(created_at__date__gte=last_30_days).count()
    
    unique_visitors_today = PageView.objects.filter(created_at__date=today).values('user_ip').distinct().count()
    unique_visitors_7_days = PageView.objects.filter(created_at__date__gte=last_7_days).values('user_ip').distinct().count()
    
    # Most viewed pages
    popular_pages = PageView.objects.values('page_url').annotate(
        view_count=Count('id')
    ).order_by('-view_count')[:10]
    
    context = {
        'posts': posts,
        'total_posts': posts.count(),
        'unread_messages': unread_messages,
        'total_views': total_views,
        'views_today': views_today,
        'views_7_days': views_7_days,
        'views_30_days': views_30_days,
        'unique_visitors_today': unique_visitors_today,
        'unique_visitors_7_days': unique_visitors_7_days,
        'popular_pages': popular_pages,
    }
    return render(request, 'blog/admin_dashboard.html', context)


@login_required
def view_messages(request):
    """View all contact messages"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to view messages.')
        return redirect('home')
    
    contact_messages = ContactMessage.objects.all().order_by('-created_at')
    
    context = {
        'messages_list': contact_messages,
        'unread_count': contact_messages.filter(read=False).count(),
    }
    return render(request, 'blog/view_messages.html', context)


@login_required
def message_detail(request, message_id):
    """View single message detail"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to view this message.')
        return redirect('home')
    
    message = get_object_or_404(ContactMessage, id=message_id)
    
    # Mark as read
    if not message.read:
        message.read = True
        message.save()
    
    context = {'contact_message': message}
    return render(request, 'blog/message_detail.html', context)


@login_required
def delete_message(request, message_id):
    """Delete a contact message"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to delete messages.')
        return redirect('home')
    
    message = get_object_or_404(ContactMessage, id=message_id)
    
    if request.method == 'POST':
        message.delete()
        messages.success(request, 'Message deleted successfully!')
        return redirect('view_messages')
    
    context = {'contact_message': message}
    return render(request, 'blog/delete_message_confirm.html', context)


@login_required
def create_post(request):
    """Create new post (admin only)"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to create posts.')
        return redirect('home')
    
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            messages.success(request, 'Post created successfully!')
            return redirect('admin_dashboard')
    else:
        form = PostForm()
    
    context = {'form': form}
    return render(request, 'blog/create_post.html', context)


@login_required
def edit_post(request, slug):
    """Edit existing post (admin only)"""
    post = get_object_or_404(Post, slug=slug)
    
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to edit posts.')
        return redirect('home')
    
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            form.save()
            messages.success(request, 'Post updated successfully!')
            return redirect('admin_dashboard')
    else:
        form = PostForm(instance=post)
    
    context = {'form': form, 'post': post}
    return render(request, 'blog/edit_post.html', context)


@login_required
def delete_post(request, slug):
    """Delete post (admin only)"""
    post = get_object_or_404(Post, slug=slug)
    
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to delete posts.')
        return redirect('home')
    
    if request.method == 'POST':
        post.delete()
        messages.success(request, 'Post deleted successfully!')
        return redirect('admin_dashboard')
    
    context = {'post': post}
    return render(request, 'blog/delete_confirm.html', context)


def toggle_like(request, slug):
    """Toggle like on a post"""
    post = get_object_or_404(Post, slug=slug)
    user_ip = get_client_ip(request)
    
    like, created = Like.objects.get_or_create(post=post, user_ip=user_ip)
    
    if not created:
        like.delete()
        liked = False
    else:
        liked = True
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'liked': liked,
            'likes_count': post.likes.count()
        })
    
    return redirect('article_detail', slug=slug)


def search(request):
    """Search posts"""
    query = request.GET.get('q', '')
    posts = Post.objects.none()
    
    if query:
        posts = Post.objects.filter(
            Q(title__icontains=query) |
            Q(content__icontains=query) |
            Q(tags__icontains=query),
            published=True
        ).distinct()
    
    context = {
        'posts': posts,
        'query': query,
    }
    return render(request, 'blog/search.html', context)


def about(request):
    """About page"""
    return render(request, 'blog/about.html')


def contact(request):
    """Contact page with form"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for your message! We will get back to you soon.')
            return redirect('contact')
    else:
        form = ContactForm()
    
    return render(request, 'blog/contact.html', {'form': form})


def privacy_policy(request):
    """Privacy policy page"""
    return render(request, 'blog/privacy.html')


def terms_of_service(request):
    """Terms of service page"""
    return render(request, 'blog/terms.html')



@login_required
def change_password(request):
    """Change admin password"""
    if not request.user.is_staff:
        messages.error(request, 'You do not have permission to access this page.')
        return redirect('home')
    
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password was successfully updated!')
            return redirect('admin_dashboard')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = PasswordChangeForm(request.user)
    
    return render(request, 'blog/change_password.html', {'form': form})
