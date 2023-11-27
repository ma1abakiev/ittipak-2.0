from django.urls import path, include
from rest_framework import routers

from news.views import PostAPIView, Post2APIView

router = routers.DefaultRouter()
router.register(r'1', PostAPIView, basename='post')
router.register(r'2', Post2APIView, basename='post')

urlpatterns = [
    path('', include(router.urls))
]
