from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Plant, Post, Comment, Species, PlantDisease, FAQ, PlantGuide

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
        fields = ["id", "title", "content", "created_at", "author", 
                  "planting_date", "last_watered_date", "last_sunlight_exposure_date",
                  "last_pruning_date", "last_fertilizing_date", "watering_reminder_period",
                  "sunlight_exposure_reminder_period", "pruning_reminder_period",
                  "fertilizing_reminder_period"]
        extra_kwargs = {"author": {"read_only": True}}


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ["id", "title", "content", "created_at", "author"]

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "content", "created_at"]


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

class PlantGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantGuide
        fields = ['id', 'species', 'title', 'description', 'type']

        
class PlantDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantDisease
        fields = ['id', 'common_name', 'scientific_name', 'description', 'symptoms', 'control_methods']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']

