from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.ActivityList.as_view()),
    path('activity/<int:pk>/', views.ActivityDetail.as_view()),
    path('screen/', views.ScreenList.as_view()),
    path('screen/<int:pk>/', views.ScreenDetail.as_view()),
    path('class/', views.ClassList.as_view()),
    path('class/<int:pk>/', views.ClassDetail.as_view()),
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('studentscreen/', views.StudentScreenList.as_view()),
    path('studentscreen/<int:pk>/', views.StudentScreenDetail.as_view()),
]
