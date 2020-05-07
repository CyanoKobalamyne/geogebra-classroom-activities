"""URLs for the teacher app."""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<int:id>/', views.activity),
    path('class/<int:id>/', views.dashboard),
]
