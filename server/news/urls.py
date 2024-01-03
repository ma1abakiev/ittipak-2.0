from django.urls import path, include
from rest_framework import routers

from news import views

router = routers.DefaultRouter()
router.register(r"categories", views.CategoryViewSet)
router.register(r"^(?P<post_id>\d+)/comment", views.CommentViewSet)
router.register(r'like', views.PostLikeViewSet, basename='post-like')
router.register(r'2', views.Post2ViewSet, basename='post2')
router.register(r'', views.PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]
