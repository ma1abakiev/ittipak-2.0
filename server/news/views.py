from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets, status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from news.models import Post, Post2, Category, Comment
from news.permissions import IsAuthorOrReadOnly
from news.serializers import PostSerializer, CategoryReadSerializer, CommentWriteSerializer, CommentReadSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and Retrieve post categories
    """

    queryset = Category.objects.all()
    serializer_class = CategoryReadSerializer
    permission_classes = (permissions.AllowAny,)


class PostVAPIViewPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = PostVAPIViewPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')

        queryset = Post.objects.all()
        if category_id is not None:
            queryset = Post.objects.filter(category_id=category_id)
        return queryset


class CommentViewSet(viewsets.ModelViewSet):
    """
    CRUD comments for a particular post
    """

    queryset = Comment.objects.all()

    def get_queryset(self):
        res = super().get_queryset()
        post_id = self.kwargs.get("post_id")
        return res.filter(post__id=post_id)

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return CommentWriteSerializer

        return CommentReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (permissions.AllowAny,)

        return super().get_permissions()


class LikePostAPIView(APIView):
    """
    Like, Dislike a post
    """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk):
        user = request.user
        post = get_object_or_404(Post, pk=pk)

        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)

        return Response(status=status.HTTP_200_OK)


class Post2APIView(ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = PostVAPIViewPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')

        queryset = Post2.objects.all()
        if category_id is not None:
            queryset = Post2.objects.filter(category_id=category_id)
        return queryset
