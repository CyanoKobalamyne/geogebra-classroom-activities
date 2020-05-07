"""URLs for the teacher app."""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
]
