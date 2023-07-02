from rest_framework import generics
from .serializers import ProfileSerializer
from rest_framework.response import Response
from .models import Profile

class ProfileView(generics.ListCreateAPIView):
	serializer_class = ProfileSerializer
	queryset = Profile
