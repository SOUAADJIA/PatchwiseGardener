from django.urls import path
from . import views

urlpatterns = [
    path("plants/", views.PlantListCreate.as_view(), name="plant-list"),
    path("plants/delete/<int:pk>/", views.PlantDelete.as_view(), name="delete-plant"),
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="post-detail"),
    path("posts/<int:post_id>/comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/<int:pk>/", views.CommentRetrieveUpdateDestroy.as_view(), name="comment-detail"),
]