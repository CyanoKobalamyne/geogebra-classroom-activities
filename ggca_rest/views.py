"""GeoGebra Classroom Activities REST views."""
from .models import Activity, Screen, Class, Student, StudentScreen
from .serializers import ActivitySerializer, ScreenSerializer, ClassSerializer, StudentSerializer, StudentScreenSerializer
from rest_framework import generics


class ActivityList(generics.ListCreateAPIView):
    """API view for all activities."""

    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single activity."""

    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ScreenList(generics.ListCreateAPIView):
    """API view for all screens."""

    queryset = Screen.objects.all()
    serializer_class = ScreenSerializer


class ScreenDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single screen."""

    queryset = Screen.objects.all()
    serializer_class = ScreenSerializer


class ClassList(generics.ListCreateAPIView):
    """API view for all classes."""

    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class ClassDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single class."""

    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class ClassDetailFromCode(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single class obtained from class code."""

    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    lookup_field = 'code'


class StudentList(generics.ListCreateAPIView):
    """API view for all students."""

    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single student."""

    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentScreenList(generics.ListCreateAPIView):
    """API view for all student screens."""

    queryset = StudentScreen.objects.all()
    serializer_class = StudentScreenSerializer


class StudentScreenDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single student screen."""

    queryset = StudentScreen.objects.all()
    serializer_class = StudentScreenSerializer
