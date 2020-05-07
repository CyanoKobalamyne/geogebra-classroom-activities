"""GeoGebra Classroom Activities REST Serializers."""
from rest_framework import serializers
from .models import Activity, Screen, Class, Student, StudentScreen


class ActivitySerializer(serializers.ModelSerializer):
    classes = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Class.objects.all())
    screens = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Screen.objects.all())

    class Meta:
        model = Activity
        fields = ('id', 'name', 'classes', 'screens')


class ScreenSerializer(serializers.ModelSerializer):
    student_screens = serializers.PrimaryKeyRelatedField(
        many=True, queryset=StudentScreen.objects.all())

    class Meta:
        model = Screen
        fields = ('id', 'activity', 'order', 'prompt', 'student_screens')


class ClassSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Student.objects.all())

    class Meta:
        model = Class
        fields = ('id', 'code', 'activity', 'students', 'created_at')


class StudentSerializer(serializers.ModelSerializer):
    screens = serializers.PrimaryKeyRelatedField(
        many=True, queryset=StudentScreen.objects.all())

    class Meta:
        model = Student
        fields = ('id', 'name', 'activity_class', 'screens')

    def create(self, validated_data):
        return Student.objects.create(
            name=validated_data['name'],
            activity_class=validated_data['activity_class'],
        )


class StudentScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentScreen
        fields = ('id', 'student', 'screen', 'geogebra_data', 'status')
