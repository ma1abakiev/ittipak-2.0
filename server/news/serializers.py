from rest_framework import serializers

from .models import Post, Post2


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class Post2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Post2
        fields = '__all__'
