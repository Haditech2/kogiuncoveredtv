from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('articles/', views.articles_list, name='articles_list'),
    path('articles/<slug:slug>/', views.article_detail, name='article_detail'),
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('dashboard/messages/', views.view_messages, name='view_messages'),
    path('dashboard/messages/<int:message_id>/', views.message_detail, name='message_detail'),
    path('dashboard/messages/<int:message_id>/delete/', views.delete_message, name='delete_message'),
    path('create-post/', views.create_post, name='create_post'),
    path('edit-post/<slug:slug>/', views.edit_post, name='edit_post'),
    path('delete-post/<slug:slug>/', views.delete_post, name='delete_post'),
    path('like/<slug:slug>/', views.toggle_like, name='toggle_like'),
    path('search/', views.search, name='search'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('privacy/', views.privacy_policy, name='privacy'),
    path('terms/', views.terms_of_service, name='terms'),
    path('login/', auth_views.LoginView.as_view(template_name='blog/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
]
