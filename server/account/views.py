from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiExample
from rest_framework import status, generics, viewsets, mixins
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from account import serializers
from news import permissions
from news.models import Post
from news.serializers import PostSerializer


@extend_schema(tags=['Auth'])
class UserRegistrationAPIView(GenericAPIView):
    """
    An endpoint for the client to create a new User.
    """

    permission_classes = (AllowAny,)
    serializer_class = serializers.UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_201_CREATED)


@extend_schema(tags=['Auth'])
class UserLoginAPIView(GenericAPIView):
    """
    An endpoint to authenticate existing users using their email and password.
    """

    permission_classes = (AllowAny,)
    serializer_class = serializers.UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = serializers.UserSerializer(user, context={'request': request})
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)


@extend_schema(tags=['Auth'])
class UserLogoutAPIView(GenericAPIView):
    """
    An endpoint to logout users.
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=['Users'])
class UserAPIView(RetrieveUpdateAPIView):
    """
    Get, Update user information
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


@extend_schema(tags=['Favorites'])
@extend_schema_view(
    list=extend_schema(
        summary='Получение избранных постов'
    ),
    create=extend_schema(
        summary='Добавлние и удаление из избранных',
        description='При запросе передается id поста и добавляется в избранные, '
                    'при повторном запросе удаляется из избранных',
        examples=[
            OpenApiExample(
                "Favorite example",
                description="Test example for the favorite",
                value=
                {
                    "post_id": 1,
                },
                status_codes=[str(status.HTTP_200_OK)],
                ),
            ],
    )
)
class UserFavoritePostsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.FavoriteListSerializer

    def get_queryset(self):
        user = self.request.user
        return user.favorite_posts.all()

    def list(self, request, *args, **kwargs):
        user = request.user
        serializer = self.serializer_class(user, context={'request': request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        user = request.user
        post = get_object_or_404(Post, pk=post_id)
        if post in user.favorite_posts.all():
            user.favorite_posts.remove(post)
            return Response({'message': 'Post removed from favorites'}, status=status.HTTP_200_OK)
        user.favorite_posts.add(post)
        return Response({'message': 'Post added to favorites'}, status=status.HTTP_200_OK)

