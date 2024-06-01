from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Plant, Post, Species

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ["id", "title", "content", "created_at", "author"]


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = [
            'id', 
            'common_name', 
            'scientific_name', 
            'family', 
            'type', 
            'dimensions', 
            'cycle', 
            'watering_requirements', 
            'sunlight_preferences', 
            'pruning_information', 
            'seeds', 
            'propagation_methods', 
            'hardiness_zones', 
            'flowers', 
            'fruits', 
            'foliage', 
            'care_level', 
            'description', 
            'images'
        ]