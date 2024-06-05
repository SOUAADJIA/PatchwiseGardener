from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PlantSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import Plant, Post
from .permissions import IsAuthorOrReadOnly  # Import the custom permission

import requests
from rest_framework.response import Response
from .models import Species, PlantDisease, FAQ
from .serializers import SpeciesSerializer, PlantDiseaseSerializer, FAQSerializer




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
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]




#Species views

class SpeciesListView(generics.ListAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        api_key = settings.PERENUAL_API_KEY
        page = request.GET.get('page', 1)
        q = request.GET.get('q')
        order = request.GET.get('order')
        edible = request.GET.get('edible')
        poisonous = request.GET.get('poisonous')
        cycle = request.GET.get('cycle')
        watering = request.GET.get('watering')
        sunlight = request.GET.get('sunlight')
        indoor = request.GET.get('indoor')
        hardiness = request.GET.get('hardiness')

        url = f"https://perenual.com/api/species-list?key={api_key}&page={page}"
        if q:
            url += f"&q={q}"
        if order:
            url += f"&order={order}"
        if edible:
            url += f"&edible={edible}"
        if poisonous:
            url += f"&poisonous={poisonous}"
        if cycle:
            url += f"&cycle={cycle}"
        if watering:
            url += f"&watering={watering}"
        if sunlight:
            url += f"&sunlight={sunlight}"
        if indoor:
            url += f"&indoor={indoor}"
        if hardiness:
            url += f"&hardiness={hardiness}"

        response = requests.get(url)
        data = response.json()

        for item in data['data']:
            Species.objects.get_or_create(
                common_name=item['common_name'],
                scientific_name=item['scientific_name'],
                family=item.get('family', None),
                # Map other fields as necessary
            )

        return Response(data['data'])

class SpeciesDetailView(generics.RetrieveAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        api_key = settings.PERENUAL_API_KEY
        species_id = kwargs.get('id')  # Corrected from 'pk' to 'id'
        url = f"https://perenual.com/api/species/details/{species_id}?key={api_key}"
        response = requests.get(url)
        data = response.json()

        Species.objects.update_or_create(
            id=data['id'],
            defaults={
                'common_name': data['common_name'],
                'scientific_name': data['scientific_name'],
                'family': data.get('family', None),
                # Map other fields as necessary
            }
        )

        return Response(data)
    

# Plant Disease views
class PlantDiseaseListView(generics.ListAPIView):
    queryset = PlantDisease.objects.all()
    serializer_class = PlantDiseaseSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        api_key = settings.PERENUAL_API_KEY
        page = request.GET.get('page', 1)
        q = request.GET.get('q')

        url = f"https://perenual.com/api/pest-disease-list?key={api_key}&page={page}"
        if q:
            url += f"&q={q}"

        response = requests.get(url)
        data = response.json()

        for item in data['data']:
            PlantDisease.objects.get_or_create(
                common_name=item['common_name'],
                scientific_name=item.get('scientific_name', None),
                description=item.get('description', None),
                symptoms=item.get('symptoms', None),
                control_methods=item.get('control_methods', None),
            )

        return Response(data['data'])

# FAQ views
class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        api_key = settings.PERENUAL_API_KEY
        page = request.GET.get('page', 1)
        q = request.GET.get('q')

        url = f"https://perenual.com/api/article-faq-list?key={api_key}&page={page}"
        if q:
            url += f"&q={q}"

        response = requests.get(url)
        data = response.json()

        for item in data['data']:
            FAQ.objects.get_or_create(
                question=item['question'],
                answer=item['answer']
            )

        return Response(data['data'])