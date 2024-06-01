from django.db import models
from django.contrib.auth.models import User


class Plant(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="plants")

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    # Add any additional fields related to posts here

    def __str__(self):
        return self.title

class Species(models.Model):
    common_name = models.CharField(max_length=255)
    scientific_name = models.CharField(max_length=255)
    family = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    dimensions = models.CharField(max_length=255, blank=True, null=True)
    cycle = models.CharField(max_length=255, blank=True, null=True)
    watering_requirements = models.CharField(max_length=255, blank=True, null=True)
    sunlight_preferences = models.CharField(max_length=255, blank=True, null=True)
    pruning_information = models.TextField(blank=True, null=True)
    seeds = models.TextField(blank=True, null=True)
    propagation_methods = models.TextField(blank=True, null=True)
    hardiness_zones = models.CharField(max_length=255, blank=True, null=True)
    flowers = models.TextField(blank=True, null=True)
    fruits = models.TextField(blank=True, null=True)
    foliage = models.TextField(blank=True, null=True)
    care_level = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    images = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.common_name