from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PlantSerializer, PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import Plant, Post, Comment
from rest_framework.exceptions import NotFound

# User view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Plant views
class PlantListCreate(generics.ListCreateAPIView):
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Plant.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PlantDelete(generics.DestroyAPIView):
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Plant.objects.filter(author=user)

# Post views
class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Comment views
class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        try:
            post = Post.objects.get(id=post_id)
            return Comment.objects.filter(post=post)
        except Post.DoesNotExist:
            raise NotFound("Post not found")

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        try:
            post = Post.objects.get(id=post_id)
            serializer.save(author=self.request.user, post=post)
        except Post.DoesNotExist:
            raise NotFound("Post not found")

class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
