from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, ProfileSerializer
from django.conf import settings
import jwt
from django.contrib.auth.models import User
from .models import Profile

@api_view(["POST"])
def register(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		if "@" in request.data['username']:
			return Response({"username": ["username must not contain '@'"]}, status=400)

		if "password" not in request.data:
			return Response({"password": ["this field is required"]}, status=400)

		if len(request.data["password"]) < 8:
			return Response({"password": ["the password must contain 8 letters or more"]}, status=400)

		user = serializer.save()
		user.set_password(request.data["password"])
		user.save()
		profile = Profile(user=user)
		profile.save()
		token = jwt.encode({"username": request.data["username"], "password": request.data["password"]}, settings.SECRET, algorithm="HS256")
		return Response({"token": token}, status=201)
		
	else:
		return Response(serializer.errors)

@api_view(["POST"])
def login(request):
	if "username" not in request.data or "password" not in request.data:
		return Response({"error": "request must have email or username field and password field"})

	user = None

	if "@" not in request.data["username"]:
		if not User.objects.filter(username=request.data["username"]).exists():
			return Response({"error": "there is no user with this username"}, status=400)

		user = User.objects.filter(username=request.data["username"]).first()
	else:
		if not User.objects.filter(email=request.data["username"]).exists():
			return Response({"error": "there is no user with this email"}, status=400)

		user = User.objects.filter(email=request.data["username"]).first()

	if not user.check_password(request.data["password"]):
		return Response({"error": "the password is wrong"}, status=400)

	token = jwt.encode({"username": user.username, "password": request.data["password"]}, settings.SECRET, algorithm="HS256")

	return Response({"token": token}, status=200)

@api_view(["POST"])
def validate_token(request):
	if "token" not in request.data:
		return Response({"validated": False}, status=200)

	token = request.data["token"]
	try:
		payload = jwt.decode(token, settings.SECRET, algorithms=["HS256"])
	except Exception:
		return Response({"validated": False}, status=200)

	if not User.objects.filter(username=payload["username"]).exists():
		return Response({"validated": False}, status=200)

	return Response({"validated": True}, status=200)

# {"username": "haythem", "email":"haythemdjebbar5@gmail.com", "first_name": "haythem", "last_name": "djebbar", "password":"password"}
