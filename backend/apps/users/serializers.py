from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import User, SellerUser


class SellerUserSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = SellerUser
        fields = (
            'id', 'user', 'shop_name', 'main_image',
            'background_image', 'insta_image', 'mini_description',
            'instagram_link', 'product_count', 'followers',
        )

    def update(self, instance, validated_data):
        image_fields = ['main_image', 'background_image', 'insta_image']
        for image_field in image_fields:
            if image_field in validated_data:
                value = validated_data[image_field]
                if isinstance(value, str) or ('http' in value or 'https' in value):
                    continue
                else:
                    setattr(instance, image_field, value)

        for image_field in image_fields:
            validated_data.pop(image_field, None)

        return super().update(instance, validated_data)

    def get_product_count(self, obj):
        return obj.products.count()


class UserSerializer(serializers.ModelSerializer):
    seller_user = SellerUserSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'seller_user',)




