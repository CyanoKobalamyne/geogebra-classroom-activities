"""GeoGebra Classroom Activities teacher views."""
from django.shortcuts import render


def index(request):
    return render(request, 'teacher/index.html')
