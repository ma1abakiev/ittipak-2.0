from rest_framework import serializers

from .models import Post, Post2, Category, Comment

SITE_DOMAIN = "http://localhost:8000"

SEARCH_PATTERN = 'src="/media/uploads/'
REPLACE_WITH = f'src="{SITE_DOMAIN}/media/uploads/'

SEARCH_PATTERN2 = 'src=\\"/media/uploads2/'
REPLACE_WITH2 = f'src="\\{SITE_DOMAIN}/media/uploads2/'


class FixAbsolutePathSerializer2(serializers.Field):
    def to_representation(self, value):
        text = value.replace(SEARCH_PATTERN2, REPLACE_WITH2)
        return text


class FixAbsolutePathSerializer(serializers.Field):
    def to_representation(self, value):
        text = value.replace(SEARCH_PATTERN, REPLACE_WITH)
        return text


class CategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    content = FixAbsolutePathSerializer()
    categories = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    photo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Post
        fields = "__all__"

    def get_categories(self, obj):
        categories = list(
            cat.name for cat in obj.categories.get_queryset().only("name")
        )
        return categories

    def get_likes(self, obj):
        likes = list(
            like.username for like in obj.likes.get_queryset().only("username")
        )
        return likes


class CommentReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"


class CommentWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = "__all__"


class Post2Serializer(serializers.ModelSerializer):
    content = FixAbsolutePathSerializer2()

    class Meta:
        model = Post2
        fields = '__all__'
