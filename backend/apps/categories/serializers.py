from rest_framework import serializers
from .models import Category, SubCategory
from ..products.models import Product


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'sub_categories']

    def get_sub_categories(self, obj):
        # Извлечение продавца из контекста
        seller = self.context.get('seller')

        # Фильтрация подкатегорий на основе продуктов продавца
        if seller:
            products = Product.objects.filter(seller=seller, sub_category__category=obj)
            sub_categories_ids = products.values_list('sub_category', flat=True).distinct()
            sub_categories = SubCategory.objects.filter(id__in=sub_categories_ids)
        else:
            sub_categories = obj.sub_categories.all()

        return SubCategorySerializer(sub_categories, many=True).data