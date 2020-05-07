"""GeoGebra Classroom Activities student views."""
from django.shortcuts import render


def join(request):
    """View when a student joins a class."""
    return render(request, 'student/join.html')


def activity(request, id):
    """View for the actual class activity."""
    return render(request, 'student/activity.html', context={'id': id})
