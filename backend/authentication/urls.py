from django.urls import path
from .views import login, register, validate_token

urlpatterns = [
	path("login", login, name="login"),
	path("register", register, name="register"),
	path("validate_token", validate_token, name="validate_token")
]