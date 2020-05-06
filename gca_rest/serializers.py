"""GeoGebra Classroom Activities REST Serializers."""
from rest_framework import serializers
from .models import Activity, Screen, Class, Student, StudentScreen


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'name')


class ScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screen
        fields = ('id', 'activity', 'order', 'prompt')


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ('id', 'code', 'activity', 'created_at')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'activity_class')


class StudentScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentScreen
        fields = ('id', 'student', 'screen', 'geogebra_data')
