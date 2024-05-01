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
    instagram_link = serializers.ReadOnlyField(
        source='seller.instagram_link'
    )
    whatsapp_number = serializers.ReadOnlyField(
        source='seller.whatsapp_number'
    )
    telegram_link = serializers.ReadOnlyField(
        source='seller.telegram_link'
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'images', 'sub_category', 'sub_category_name',
                  'category_name', 'instagram_link', 'whatsapp_number', 'telegram_link', 'seller']


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
        images_data = validated_data.pop('images')
        user = self.context['request'].user
        seller = user.seller_user
        product = Product.objects.create(**validated_data, seller=seller)

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
        return representation


class ProductUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'description', 'price',
            'image', 'sub_category', 'images',
        )

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # instance.name = validated_data.get('name', instance.name)
        # instance.description = validated_data.get('description', instance.description)
        # instance.price = validated_data.get('price', instance.price)
        # instance.image = validated_data.get('image', instance.image)
        # instance.sub_category = validated_data.get('sub_category', instance.sub_category)
        # instance.save()

        if images_data is not None:
            instance.images.all().delete()
            for image_file in images_data:
                ProductImage.objects.create(product=instance, image=image_file)

        return instance

    def to_representation(self, instance):
        # representation = {
        #     'id': instance.id,
        #     'name': instance.name,
        #     'description': instance.description,
        #     'image': instance.image.url if hasattr(instance.image, 'url') else None,
        #     'price': instance.price,
        #     'sub_category': instance.sub_category.id,
        #     'images': [ProductImageSerializer(image).data for image in instance.images.all()]
        # }
        # return representation
        representation = super(ProductUpdateSerializer, self).to_representation(instance)
        representation['images'] = [ProductImageSerializer(image).data for image in instance.images.all()]
        return representation
