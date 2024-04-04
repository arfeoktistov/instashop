from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer, ProductUpdateSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .permissions import IsSellerProduct


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsSellerProduct,
    )

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve', 'destroy']:
            return ProductSerializer
        elif self.action == 'create':
            return ProductCreateSerializer
        elif self.action == 'update':
            return ProductUpdateSerializer
        else:
            pass

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить список всех продуктов",
        responses={
            200: ProductSerializer(many=True)
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить детали продукта",
        responses={
            200: ProductSerializer()
        }
    )
    def retrieve(self, request, *pk, **kwargs):
        return super().retrieve(request, *pk, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Создать новый продукт",
        operation_description="Создает новый продукт с заданными деталями.",
        request_body=ProductCreateSerializer,
        responses={
            201: openapi.Response(
                description="Продукт успешно создан.",
                schema=ProductCreateSerializer,
            ),
            400: "Некорректные данные запроса"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Обновить продукт",
        operation_description="Обновляет продукт с указанным ID.",
        request_body=ProductUpdateSerializer,
        responses={
            200: openapi.Response(
                description="Продукт успешно обновлен.",
                schema=ProductUpdateSerializer,
            ),
            400: "Некорректные данные запроса",
            404: "Продукт не найден"
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Удалить продукт",
        operation_description="Удаляет продукт с указанным ID.",
        responses={
            204: "Продукт успешно удален",
            404: "Продукт не найден"
        }
    )
    def destroy(self, request, *pk, **kwargs):
        return super().destroy(request, *pk, **kwargs)


class SellerProductsViewSet(ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        seller_id = self.kwargs.get('seller_id')
        return Product.objects.filter(seller__id=seller_id) if seller_id else Product.objects.none()

    @swagger_auto_schema(
        tags=['Получить продавцов по категории и подкатегории'],
        operation_summary="Получить товары по ID продавца и категориям",
        operation_description="Получить товары по ID продавца и категориям",
        responses={
            200: openapi.Response(
                description="Список продавцов по категории и подкатегории",
                schema=ProductSerializer(many=True),
            ),
            404: "Категория или подкатегория не найдены"
        }
    )
    def products_by_category(self, request, *args, **kwargs):
        seller_id = self.kwargs.get('seller_id')
        category_id = request.query_params.get('category_id')
        subcategory_id = request.query_params.get('subcategory_id')

        queryset = Product.objects.filter(seller__id=seller_id)

        if category_id:
            queryset = queryset.filter(sub_category__category__id=category_id)
        if subcategory_id:
            queryset = queryset.filter(sub_category__id=subcategory_id)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
