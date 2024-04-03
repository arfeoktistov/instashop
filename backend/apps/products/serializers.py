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
    sub_category = SubCategorySerializer()  # Сериализатор подкатегории включен для вложенности
    category = serializers.SerializerMethodField()  # Добавляем метод для получения категории
    images = serializers.ListField(
        child=serializers.ImageField(), required=False, write_only=True
    )
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'images', 'sub_category', 'category', 'seller']

    def get_category(self, obj):
        # Возвращаем сериализованные данные категории через объект подкатегории
        if obj.sub_category and obj.sub_category.category:
            return CategorySerializer(obj.sub_category.category).data
        return None  # Или вернуть пустое значение, если категории нет

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        product = Product.objects.create(**validated_data)

        for image_data in images_data:
            # Для каждого файла создаем новый объект ProductImage
            ProductImage.objects.create(product=product, image=image_data)

        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)

        # Обновление основных атрибутов продукта
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Обработка новых изображений, если они есть
        if images_data is not None:
            # Удаляем существующие изображения, если это необходимо
            instance.images.all().delete()
            for image_data in images_data:
                # Для каждого файла создаем новый объект ProductImage
                ProductImage.objects.create(product=instance, image=image_data)

        return instance