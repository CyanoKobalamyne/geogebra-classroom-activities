"""GeoGebra Classroom Activities REST models."""
from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentManager(models.Manager):
    def create(self, name, activity_class):
        student = Student(
            name=name, activity_class=activity_class)
        student.save()
        for screen in student.activity_class.activity.screens.all():
            student_screen = StudentScreen(student=student, screen=screen)
            student_screen.save()
        return student


class Activity(models.Model):
    """Reusable activity (series of screens)."""

    name = models.CharField(max_length=255)


class Screen(models.Model):
    """Single screen of an activity with prompt and embedded GeoGebra."""

    activity = models.ForeignKey(
        Activity, related_name='screens', on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()
    prompt = models.TextField()


class Class(models.Model):
    """Instance of activity in a class."""

    code = models.SlugField(max_length=6)
    activity = models.ForeignKey(
        Activity, related_name='classes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Student(models.Model):
    """Student participant in a class."""

    name = models.CharField(max_length=100)
    activity_class = models.ForeignKey(
        Class, related_name='students', on_delete=models.CASCADE)
    objects = StudentManager()


class StudentScreen(models.Model):
    """One screen of an activity belonging to a student."""

    class ScreenState(models.TextChoices):
        EMPTY = 'E', _('Empty')
        STARTED = 'S', _('Started')
        DONE = 'D', _('Done')

    student = models.ForeignKey(
        Student, related_name='screens', on_delete=models.CASCADE)
    screen = models.ForeignKey(
        Screen, related_name='student_screens', on_delete=models.CASCADE)
    geogebra_data = models.TextField(blank=True)
    status = models.TextField(
        choices=ScreenState.choices, default=ScreenState.EMPTY)
