from collections import UserList
from django.urls import path
from .views import LoginView, RegisterView, UserDetailView, UserListView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', UserListView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view())
]
