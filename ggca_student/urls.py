"""URLs for the student app."""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.join),
    path('<str:code>/', views.activity),
]
