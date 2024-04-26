from django.urls import path
from . import views

urlpatterns = [
    path("plants/", views.PlantListCreate.as_view(), name="plant-list"),
    path("plants/delete/<int:pk>/", views.PlantDelete.as_view(), name="delete-plant"),
]