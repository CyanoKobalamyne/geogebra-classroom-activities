from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.ActivityList.as_view()),
    path('activity/<int:pk>/', views.ActivityDetail.as_view()),
    path('screen/', views.ScreenList.as_view()),
]
