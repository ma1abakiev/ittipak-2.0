from rest_framework import serializers

from .models import Post, Post2

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


class PostSerializer(serializers.ModelSerializer):
    content = FixAbsolutePathSerializer()

    class Meta:
        model = Post
        fields = '__all__'


class Post2Serializer(serializers.ModelSerializer):
    content = FixAbsolutePathSerializer2()

    class Meta:
        model = Post2
        fields = '__all__'
