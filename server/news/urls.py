from django.urls import path, include
from rest_framework import routers

from news.views import PostAPIView, Post2APIView, CategoryViewSet, CommentViewSet, LikePostAPIView

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"^(?P<post_id>\d+)/comment", CommentViewSet)
router.register(r'2', Post2APIView, basename='post')
router.register(r'', PostAPIView, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path("like/<int:pk>/", LikePostAPIView.as_view(), name="like-post"),
]

