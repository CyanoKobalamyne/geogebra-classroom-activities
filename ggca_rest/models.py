"""GeoGebra Classroom Activities REST models."""
from django.db import models


class Activity(models.Model):
    """Reusable activity (series of screens)."""

    name = models.CharField(max_length=255)


class Screen(models.Model):
    """Single screen of an activity with prompt and embedded GeoGebra."""

    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()
    prompt = models.TextField()


class Class(models.Model):
    """Instance of activity in a class."""

    code = models.SlugField(max_length=6)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Student(models.Model):
    """Student participant in a class."""

    name = models.CharField(max_length=100)
    activity_class = models.ForeignKey(Class, on_delete=models.CASCADE)


class StudentScreen(models.Model):
    """One screen of an activity belonging to a student."""

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    geogebra_data = models.TextField()
