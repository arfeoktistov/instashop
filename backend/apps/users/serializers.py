from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import User, SellerUser


class SellerUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerUser
        fields = (
            'id', 'user', 'shop_name', 'main_image',
            'background_image', 'insta_image', 'mini_description',
            'instagram_link', 'product', 'followers',
        )


class UserSerializer(serializers.ModelSerializer):
    seller_user = SellerUserSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'seller_user',)  # добавьте нужные поля




