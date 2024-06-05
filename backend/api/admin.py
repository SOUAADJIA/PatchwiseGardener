from django.contrib import admin
from .models import Plant, Post, Species, PlantDisease

# Register your models here.
admin.site.register(Plant)
admin.site.register(Post)
admin.site.register(Species)
admin.site.register(PlantDisease)