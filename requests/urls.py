from django.urls import path
from .views import RequestListView, RequestDetailedView

urlpatterns = [
    path('', RequestListView.as_view()),
    path('<int:pk>/', RequestDetailedView.as_view())
]