from django.contrib import admin
from .models import Plant, Post, Comment, Species, PlantDisease, FAQ

# Register your models here.
admin.site.register(Plant)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Species)
admin.site.register(PlantDisease)
admin.site.register(FAQ)