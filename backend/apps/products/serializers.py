from rest_framework import serializers
from .models import Product, ProductImage
from ..categories.models import Category, SubCategory
from ..categories.serializers import SubCategorySerializer


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
    sub_category = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), write_only=True)
    category = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, required=False)
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'images', 'sub_category', 'category', 'seller']

    def get_category(self, obj):
        if obj.sub_category and obj.sub_category.category:
            return CategorySerializer(obj.sub_category.category).data
        return None

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        product = Product.objects.create(**validated_data)

        for image_data in images_data:
            ProductImage.objects.create(product=product, **image_data)

        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)

        # Обновление основных атрибутов продукта
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Обновление изображений, если они есть в запросе
        if images_data is not None:
            # Здесь может быть разная логика: полное удаление и создание, обновление существующих и т.д.
            # Пример ниже - полное удаление и создание новых
            instance.images.all().delete()
            for image_data in images_data:
                ProductImage.objects.create(product=instance, **image_data)

        return instance