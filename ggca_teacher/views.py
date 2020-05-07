"""GeoGebra Classroom Activities teacher views."""
from django.shortcuts import render


def index(request):
    return render(request, 'teacher/index.html')


def activity(request, id):
    return render(request, 'teacher/activity.html', context={'id': id})


def dashboard(request, id):
    return render(request, 'teacher/class.html', context={'id': id})
