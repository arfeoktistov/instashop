from rest_framework import serializers
from typing import Any, List, Optional

from .models import Category, SubCategory
from ..products.models import Product
from ..users.models import SellerUser


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model: Any = SubCategory
        fields: List[str] = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'sub_categories']

    def get_sub_categories(self, obj: Category) -> List[SubCategorySerializer]:
        """Возвращает сериализованный список подкатегорий для категории, фильтруя их на основе продуктов
        продавца, если продавец указан в контексте."""
        seller = self.context.get('seller')

        if seller:
            sub_categories = SubCategory.objects.filter(
                id__in=Product.objects.filter(seller=seller, sub_category__category=obj)
                .values_list('sub_category', flat=True)
                .distinct()
            ).select_related('category')
        else:
            sub_categories = obj.sub_categories.all().select_related('category')

        return SubCategorySerializer(sub_categories, many=True, context=self.context).data


class SellerUserWithCategoriesSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = SellerUser
        fields = ('id', 'shop_name', 'categories')

    def get_categories(self, obj):
        products = Product.objects.filter(seller=obj).select_related('sub_category__category')
        categories_ids = products.values_list('sub_category__category', flat=True).distinct()
        categories = Category.objects.filter(id__in=categories_ids).prefetch_related('sub_categories')
        return CategorySerializer(categories, many=True, context=self.context).data