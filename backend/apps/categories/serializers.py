from rest_framework import serializers
from typing import Any, List, Optional

from .models import Category, SubCategory
from ..products.models import Product


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model: Any = SubCategory
        fields: List[str] = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    sub_categories: serializers.SerializerMethodField = serializers.SerializerMethodField()

    class Meta:
        model: Any = Category
        fields: List[str] = ['id', 'name', 'sub_categories']

    def get_sub_categories(self, obj: Category) -> List[SubCategorySerializer]:
        """Возвращает сериализованный список подкатегорий для категории,
        фильтруя их на основе продуктов продавца, если продавец указан в контексте."""
        seller: Optional[Any] = self.context.get('seller')

        if seller:
            products: Any = Product.objects.filter(seller=seller, sub_category__category=obj)
            sub_categories_ids: Any = products.values_list('sub_category', flat=True).distinct()
            sub_categories: Any = SubCategory.objects.filter(id__in=sub_categories_ids)
        else:
            sub_categories: Any = obj.sub_categories.all()

        return SubCategorySerializer(sub_categories, many=True, context=self.context).data
