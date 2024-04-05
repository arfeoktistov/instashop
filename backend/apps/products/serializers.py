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
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=True
    )

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'description', 'price',
            'image', 'sub_category', 'images',
        )

    def create(self, validated_data):
        print("Validated data CREATE:", validated_data)
        images_data = validated_data.pop('images')
        user = self.context['request'].user
        seller = user.seller_user
        product = Product.objects.create(**validated_data, seller=seller)
        print("Validated data after images_data:", validated_data)

        for image_data in images_data:
            ProductImage.objects.create(product=product, image=image_data)

        return product

    def to_representation(self, instance):
        representation = {
            'id': instance.id,
            'name': instance.name,
            'description': instance.description,
            'image': instance.image.url if instance.image else None,
            'price': instance.price,
            'sub_category': instance.sub_category.id,
            'images': [image.image.url for image in instance.images.all()]
        }
        print("Representation data for CREATE:", representation)

        return representation


class ProductUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'description', 'price',
            'image', 'sub_category', 'images',
        )

    def update(self, instance, validated_data):
        print("Validated data:", validated_data)
        images_data = validated_data.pop('images', None)
        print("Validated data after images_data:", validated_data)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.image = validated_data.get('image', instance.image)
        instance.sub_category = validated_data.get('sub_category', instance.sub_category)
        instance.save()

        if images_data:
            instance.images.all().delete()
            for image_file in images_data:
                ProductImage.objects.create(product=instance, image=image_file)

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
