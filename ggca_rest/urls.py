from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.ActivityListCreate.as_view()),
]
