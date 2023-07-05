from django.contrib import admin
from django.urls import path, re_path, include
from core.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/authentication/', include("authentication.urls")),
    re_path(r'^', index),
]
