from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from account import views

router = DefaultRouter()

router.register(r'favorite', views.UserFavoritePostsViewSet, basename='user-favorite-toggle-list')

urlpatterns = [
    path("register/", views.UserRegistrationAPIView.as_view(), name="create-user"),
    path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),
    path('', include(router.urls)),
    path("", views.UserAPIView.as_view(), name="user-info"),
]
