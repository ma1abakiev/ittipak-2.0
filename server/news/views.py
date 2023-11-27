from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from news.models import Post, Post2
from news.serializers import PostSerializer


class PostVAPIViewPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostAPIView(ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = PostVAPIViewPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')

        queryset = Post.objects.all()
        if category_id is not None:
            queryset = Post.objects.filter(category_id=category_id)
        return queryset


class Post2APIView(ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = PostVAPIViewPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')

        queryset = Post2.objects.all()
        if category_id is not None:
            queryset = Post2.objects.filter(category_id=category_id)
        return queryset
