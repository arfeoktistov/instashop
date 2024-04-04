from rest_framework import serializers
from .models import Product, ProductImage
from ..categories.models import Category, SubCategory
from ..categories.serializers import SubCategorySerializer


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    sub_category_name = serializers.ReadOnlyField(
        source='sub_category.name')
    category_name = serializers.ReadOnlyField(
        source='sub_category.category.name')
    images = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'images', 'sub_category', 'sub_category_name',
                  'category_name', 'seller']


class ProductCreateSerializer(serializers.ModelSerializer):
    list_images = serializers.ListField(write_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'description', 'price',
            'image', 'sub_category', 'list_images',

        )

    def create(self, validated_data):
        list_images = validated_data.pop('list_images')
        product = Product.objects.create(
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            price=validated_data.get('price'),
            image=validated_data.get('image'),
            sub_category=validated_data.get('sub_category')
        )

        for image in list_images:
            ProductImage.objects.create(
                product=product,
                image=image.get('image')
            )
        return product

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'description': instance.description,
            'image': instance.image.url,
            'price': instance.price,
            'sub_category': instance.sub_category.id,
            'images': [ProductImageSerializer(image) for image in instance.images.all()]
        }


class ProductUpdateSerializer(serializers.ModelSerializer):
    list_images = serializers.ListField(write_only=True, required=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'description', 'price',
            'image', 'sub_category', 'list_images',
        )

    def update(self, instance, validated_data):
        print("Validated data:", validated_data)
        list_images = validated_data.pop('list_images', None)
        print("Validated data after list_images:", validated_data)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.image = validated_data.get('image', instance.image)
        instance.sub_category = validated_data.get('sub_category', instance.sub_category)
        instance.save()

        if list_images is not None:
            instance.images.all().delete()
            for img in list_images:
                ProductImage.objects.create(product=instance, image=img.get('image'))

        return instance

    def to_representation(self, instance):
        # serializer = ProductSerializer(instance)
        # return serializer.data
        representation = {
            'id': instance.id,
            'name': instance.name,
            'description': instance.description,
            'image': instance.image.url if hasattr(instance.image, 'url') else None,
            'price': instance.price,
            'sub_category': instance.sub_category.id,
            'images': [ProductImageSerializer(image).data for image in instance.images.all()]
        }

        # Логирование для отладки
        print("Representation data:", representation)

        return representation
