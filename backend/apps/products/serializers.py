from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    """Сериализатор для модели изображений продуктов."""

    class Meta:
        model = ProductImage
        fields = ['image']


class ProductSerializer(serializers.ModelSerializer):
    """Сериализатор для модели продуктов.

    Включает вложенный сериализатор для изображений продуктов, позволяя отображать связанные изображения.
    """
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'seller', 'price', 'image', 'images']
