from rest_framework import serializers
from .models import Product, ProductImage
from ..categories.models import Category, SubCategory
from ..categories.serializers import SubCategorySerializer


class ProductImageSerializer(serializers.ModelSerializer):
    """Сериализатор для модели изображений продуктов."""

    class Meta:
        model = ProductImage
        fields = ['image']


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ProductImage
        fields = ['image']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    sub_category = SubCategorySerializer()  # Сериализатор подкатегории включен для вложенности
    category = serializers.SerializerMethodField()  # Добавляем метод для получения категории
    images = ProductImageSerializer(many=True, read_only=True)
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'images', 'sub_category', 'category', 'seller']

    def get_category(self, obj):
        # Возвращаем сериализованные данные категории через объект подкатегории
        if obj.sub_category and obj.sub_category.category:
            return CategorySerializer(obj.sub_category.category).data
        return None  # Или вернуть пустое значение, если категории нет

