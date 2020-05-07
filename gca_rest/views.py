"""GeoGebra Classroom Activities REST views."""
from .models import Activity
from .serializers import ActivitySerializer
from rest_framework import generics


class ActivityListCreate(generics.ListCreateAPIView):
    """API view for all activities."""

    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
