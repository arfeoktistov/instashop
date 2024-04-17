from rest_framework.viewsets import (
    ModelViewSet,
    ReadOnlyModelViewSet,
    GenericViewSet,
)
from drf_yasg import openapi
from rest_framework.request import Request
from rest_framework.response import Response
from typing import Any
from rest_framework.decorators import action

from .models import Category, SubCategory
from drf_yasg.utils import swagger_auto_schema
from .serializers import CategorySerializer, SubCategorySerializer, SellerUserWithCategoriesSerializer
from ..products.models import Product
from ..users.models import SellerUser
from ..users.serializers import SellerUserSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=['get'], url_path='sellers')
    @swagger_auto_schema(
        tags=['Получить продавцов по категории и подкатегории'],
        operation_summary="Получить продавцов по категории и подкатегории",
        operation_description="Возвращает список продавцов, у которых есть товары в указанной категории и, опционально, подкатегории.",
        manual_parameters=[
            openapi.Parameter(
                'subcategory_id',
                in_=openapi.IN_QUERY,
                description="ID подкатегории",
                type=openapi.TYPE_INTEGER,
                required=False
            ),
        ],
        responses={
            200: openapi.Response(
                description="Список продавцов по категории и подкатегории",
                schema=SellerUserSerializer(many=True),
            ),
            404: "Категория или подкатегория не найдены"
        }
    )
    def get_sellers(self, request, pk=None):
        category_id = self.kwargs.get('pk')
        subcategory_id = request.query_params.get('subcategory_id')

        if subcategory_id:
            sellers_queryset = SellerUser.objects.filter(
                products__sub_category__id=subcategory_id,
                products__sub_category__category_id=category_id
            ).distinct()
        else:
            sellers_queryset = SellerUser.objects.filter(
                products__sub_category__category_id=category_id
            ).distinct()

        serializer = SellerUserSerializer(sellers_queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Получить список категорий",
        operation_description="Возвращает список всех доступных категорий.",
        responses={
            200: openapi.Response(
                description="Список всех категорий.",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "name": openapi.Schema(type=openapi.TYPE_STRING),
                            "sub_categories": openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Items(
                                    type=openapi.TYPE_OBJECT,
                                    properties={
                                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                                        "name": openapi.Schema(type=openapi.TYPE_STRING),
                                    }
                                ),
                            ),
                        },
                    ),
                ),
            ),
        },
    )
    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Возвращает список всех категорий."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Создать новую категорию",
        operation_description="c.",
        request_body=CategorySerializer,
        responses={
            201: openapi.Response(
                description="Категория успешно создана.",
                schema=CategorySerializer,
            ),
            400: "Некорректные данные запроса"
        }
    )
    def create(self, request, *args, **kwargs):
        """Создает новую категорию."""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Получить детали категории по ID",
        operation_description="Возвращает детали конкретной категории по её ID.",
        responses={
            200: openapi.Response(
                description="Детали категории.",
                schema=CategorySerializer,
            ),
            404: "Категория не найдена"
        }
    )
    def retrieve(self, request, *args, **kwargs):
        """Возвращает детали категории по ID."""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Обновить категорию по ID",
        operation_description="Обновляет существующую категорию на основе предоставленных данных.",
        request_body=CategorySerializer,
        responses={
            200: openapi.Response(
                description="Категория успешно обновлена.",
                schema=CategorySerializer,
            ),
            400: "Некорректные данные запроса",
            404: "Категория не найдена"
        }
    )
    def update(self, request, *args, **kwargs):
        """Обновляет категорию по ID."""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Категории'],
        operation_summary="Удалить категорию по ID",
        operation_description="Удаляет категорию по указанному ID. Удаление невозможно, если категория используется.",
        responses={
            204: "Категория успешно удалена",
            400: "Невозможно удалить категорию, используемую в системе",
            404: "Категория не найдена"
        }
    )
    def destroy(self, request, *args, **kwargs):
        """Удаляет категорию по ID."""
        return super().destroy(request, *args, **kwargs)


class SubCategoryViewSet(ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

    @swagger_auto_schema(
        tags=['Подкатегории'],
            operation_summary="Получить список всех подкатегорий",
            operation_description="Возвращает список всех доступных подкатегорий в системе.",
            responses={
                200: openapi.Response(
                    description="Список подкатегорий успешно получен.",
                    schema=SubCategorySerializer(many=True),
                ),
            }
    )
    def list(self, request, *args, **kwargs):
        """Возвращает список всех подкатегорий."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Создать новую подкатегорию",
        operation_description="Создает новую подкатегорию на основе предоставленных данных.",
        request_body=SubCategorySerializer,
        responses={
            201: openapi.Response(
                description="Подкатегория успешно создана.",
                schema=SubCategorySerializer,
            ),
            400: "Некорректные данные запроса"
        }
    )
    def create(self, request, *args, **kwargs):
        """Создает новую подкатегорию."""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Получить детали подкатегории по ID",
        operation_description="Возвращает детали конкретной подкатегории по её ID.",
        responses={
            200: openapi.Response(
                description="Детали подкатегории.",
                schema=SubCategorySerializer,
            ),
            404: "Подкатегория не найдена"
        }
    )

    def retrieve(self, request, *args, **kwargs):
        """Возвращает детали подкатегории по ID."""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Обновить подкатегорию по ID",
        operation_description="Обновляет существующую подкатегорию с указанным ID на основе предоставленных данных.",
        request_body=SubCategorySerializer,
        responses={
            200: openapi.Response(
                description="Подкатегория успешно обновлена.",
                schema=SubCategorySerializer,
            ),
            400: "Некорректные данные запроса",
            404: "Подкатегория не найдена"
        }
    )
    def update(self, request, *args, **kwargs):
        """Обновляет подкатегорию по ID."""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Подкатегории'],
        operation_summary="Удалить подкатегорию по ID",
        operation_description="Удаляет подкатегорию по указанному ID. Удаление невозможно, если подкатегория используется.",
        responses={
            204: "Подкатегория успешно удалена",
            400: "Невозможно удалить подкатегорию, используемую в системе",
            404: "Подкатегория не найдена"
        }
    )
    def destroy(self, request, *args, **kwargs):
        """Удаляет подкатегорию по ID."""
        return super().destroy(request, *args, **kwargs)


class SellerCategoriesViewSet(ReadOnlyModelViewSet):
    queryset = SellerUser.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=['get'], url_path='categories')
    @swagger_auto_schema(
        tags=['Получение категорий по ID'],
        operation_summary="Получить категории и подкатегории товаров магазина по ID продавца",
        operation_description="Возвращает список категорий и соответствующих подкатегорий, "
                              "для которых у продавца есть товары.",
        responses={
            200: openapi.Response(
                description="Список категорий и подкатегорий продавца",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "name": openapi.Schema(type=openapi.TYPE_STRING),
                            "sub_categories": openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Items(
                                    type=openapi.TYPE_OBJECT,
                                    properties={
                                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                                        "name": openapi.Schema(type=openapi.TYPE_STRING),
                                    }
                                ),
                            ),
                        },
                    ),
                ),
            ),
            404: "Продавец не найден"
        }
    )
    def get_categories(self, request, pk=None):
        seller = self.get_object()
        products = Product.objects.filter(seller=seller)
        categories_ids = products.values_list('sub_category__category', flat=True).distinct()
        categories = Category.objects.filter(id__in=categories_ids)
        serializer = CategorySerializer(categories, many=True, context={'request': request, 'seller': seller})
        return Response(serializer.data)


