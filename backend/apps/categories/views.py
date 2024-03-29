from rest_framework.viewsets import (
    ModelViewSet,
    ReadOnlyModelViewSet,
    GenericViewSet,
)

from rest_framework.views import (
    APIView,
)

from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)

from rest_framework.response import Response

from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)

from django_filters.rest_framework import (
    DjangoFilterBackend,
)

from rest_framework import filters

from rest_framework.decorators import action

from rest_framework import viewsets
from .models import Category, SubCategory
from drf_yasg.utils import swagger_auto_schema
from .serializers import CategorySerializer, SubCategorySerializer
from ..products.models import Product
from ..users.models import SellerUser



class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Получить список категорий",
        responses={200: CategorySerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """Возвращает список всех категорий."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Создать новую категорию",
        request_body=CategorySerializer,
        responses={201: CategorySerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Получить детали категории по ID",
        responses={200: CategorySerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Обновить категорию по ID",
        request_body=CategorySerializer,
        responses={200: CategorySerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Удалить категорию по ID",
        responses={204: 'No content'}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class SubCategoryViewSet(ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Получить список всех подкатегорий",
        responses={200: SubCategorySerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """Возвращает список всех подкатегорий."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Создать новую подкатегорию",
        request_body=SubCategorySerializer,
        responses={201: SubCategorySerializer}
    )
    def create(self, request, *args, **kwargs):
        """Создает новую подкатегорию."""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Получить детали подкатегории по ID",
        responses={200: SubCategorySerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        """Возвращает детали подкатегории по ID."""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Обновить подкатегорию по ID",
        request_body=SubCategorySerializer,
        responses={200: SubCategorySerializer}
    )
    def update(self, request, *args, **kwargs):
        """Обновляет подкатегорию по ID."""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Удалить подкатегорию по ID",
        responses={204: 'No Content'}
    )
    def destroy(self, request, *args, **kwargs):
        """Удаляет подкатегорию по ID."""
        return super().destroy(request, *args, **kwargs)


class SellerCategoriesViewSet(ReadOnlyModelViewSet):
    queryset = SellerUser.objects.all()
    serializer_class = CategorySerializer  # Это всё ещё заглушка для DRF

    @action(detail=True, methods=['get'], url_path='categories')
    @swagger_auto_schema(
        tags=['Получение категорий по ID'],
        operation_summary="Получить категории и подкатегории товаров магазина по ID пользователя",
        responses={200: CategorySerializer(many=True)}
    )
    def get_categories(self, request, pk=None):
        seller = self.get_object()

        products = Product.objects.filter(seller=seller)
        categories_ids = products.values_list('sub_category__category', flat=True).distinct()
        categories = Category.objects.filter(id__in=categories_ids)

        # Передаем экземпляр продавца в контекст сериализатора
        context = {'request': request, 'seller': seller}
        serializer = CategorySerializer(categories, many=True, context=context)
        return Response(serializer.data)

