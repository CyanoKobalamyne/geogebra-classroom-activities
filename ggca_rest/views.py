"""GeoGebra Classroom Activities REST views."""
from .models import Activity, Screen
from .serializers import ActivitySerializer, ActivityWithScreensSerializer, ScreenSerializer
from rest_framework import generics


class ActivityList(generics.ListCreateAPIView):
    """API view for all activities."""

    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    """API view for a single activity."""

    queryset = Activity.objects.all()
    serializer_class = ActivityWithScreensSerializer


class ScreenList(generics.ListCreateAPIView):
    """API view for all screens."""

    queryset = Screen.objects.all()
    serializer_class = ScreenSerializer
