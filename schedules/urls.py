from django.urls import path
from django.urls.resolvers import URLPattern
from .views import ScheduleListView

urlpatterns = [
    path('', ScheduleListView.as_view())
]