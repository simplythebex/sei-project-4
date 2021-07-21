from django.urls import path
from .views import AnimalDetailView, AnimalListView

urlpatterns = [
    path('', AnimalListView.as_view()),
    path('<int:pk>/', AnimalDetailView.as_view())
]