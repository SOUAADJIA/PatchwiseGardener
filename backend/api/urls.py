from django.urls import path
from . import views
from .views import SpeciesListView, SpeciesDetailView, PlantDiseaseListView, FAQListView

urlpatterns = [
    path("plants/", views.PlantListCreate.as_view(), name="plant-list"),
    path("plants/delete/<int:pk>/", views.PlantDelete.as_view(), name="delete-plant"),
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="post-detail"),
    path("posts/delete/<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="delete-post"),
    path("comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/<int:pk>/", views.CommentRetrieveUpdateDestroy.as_view(), name="comment-detail"),
    path("species/", SpeciesListView.as_view(), name='species-list'),
    path("species/<int:id>/", SpeciesDetailView.as_view(), name='species-detail'),
    path("plant-disease-list/", PlantDiseaseListView.as_view(), name='plant-disease-list'),
    path("faq-list/", FAQListView.as_view(), name='faq-list'),
]
