from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import permissions, viewsets, status, generics
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from news.models import Post, Post2, Category, Comment
from news.permissions import IsAuthorOrReadOnly
from news.serializers import PostSerializer, CategoryReadSerializer, CommentWriteSerializer, CommentReadSerializer


@extend_schema(tags=['Categories'])
@extend_schema_view(
    list=extend_schema(
        summary='Получить список категорий'
    ),
    retrieve=extend_schema(
        summary='Получение одной категории'
    )
)
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and Retrieve post categories
    """

    queryset = Category.objects.all()
    serializer_class = CategoryReadSerializer
    permission_classes = (permissions.AllowAny,)


class PostViewSetPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100


@extend_schema(tags=['Posts'])
@extend_schema_view(
    list=extend_schema(
        summary='Получить список постов'
    ),
    retrieve=extend_schema(
        summary='Получение детальной информации о посте'
    )
)
class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostViewSetPagination
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ('categories', )
    search_fields = ('title', 'subtitle')

    def get_queryset(self):
        return Post.objects.filter(is_active=True)


@extend_schema(tags=['Comments'])
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


@extend_schema(tags=['Likes'])
@extend_schema_view(
    retrieve=extend_schema(
        summary='Лайк поста',
        description='При запросе лайк добавляется к посту по id, повторный запрос удаляет лайк'
    ),
)
class PostLikeViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk):
        user = request.user
        post = get_object_or_404(Post, pk=pk)

        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)

        return Response(status=status.HTTP_200_OK)


@extend_schema(tags=['Posts 2'])
class Post2ViewSet(ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = PostViewSetPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')

        queryset = Post2.objects.all()
        if category_id is not None:
            queryset = Post2.objects.filter(category_id=category_id)
        return queryset
