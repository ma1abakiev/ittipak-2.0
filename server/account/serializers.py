from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.relations import ManyRelatedField

from account.models import User
from news.serializers import PostSerializer


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize CustomUser model.
    """
    favorite_posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize registration requests and create a new user.
    """
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", 'password_confirm')
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        password = data.get('password')
        password_confirm = data.get('password_confirm')

        if password != password_confirm:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer class to authenticate users with email and password.
    """

    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


# class FavoriteListSerializer(serializers.ModelSerializer):
#     favorite_posts = PostSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = User
#         fields = ('id', 'favorite_posts',)

class FavoriteListSerializer(serializers.ModelSerializer):
    favorite_posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'favorite_posts',)

    def get_favorite_posts(self, obj):
        favorite_posts = obj.favorite_posts.all()
        return PostSerializer(instance=favorite_posts, many=True, context=self.context).data
