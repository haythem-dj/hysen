from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

	class Meta:
		model = User
		fields = ["id", "username", "email", "first_name", "last_name"]

		extra_kwargs = {'first_name': {'required': True, 'allow_blank': False}}
		extra_kwargs = {'last_name': {'required': True,'allow_blank': False}}
		extra_kwargs = {'email': {'required': True,'allow_blank': False}}

class ProfileSerializer(serializers.ModelSerializer):
	user = UserSerializer()

	class Meta:
		model = Profile
		fields = ["id", "user", "bio"]