from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить список всех продуктов",
        operation_description="Возвращает список всех продуктов с их изображениями и подробностями.",
        responses={
            200: openapi.Response(
                description="Список всех продуктов.",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "name": openapi.Schema(type=openapi.TYPE_STRING),
                            "description": openapi.Schema(type=openapi.TYPE_STRING),
                            "price": openapi.Schema(type=openapi.TYPE_STRING),
                            "image": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
                            "images": openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Items(
                                    type=openapi.TYPE_OBJECT,
                                    properties={
                                        "image": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI),
                                    }
                                ),
                            ),
                        },
                    ),
                ),
            ),
        },
    )
    def list(self, request: Request, *args, **kwargs) -> Response:
        """Возвращает список всех продуктов."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Создать новый продукт",
        operation_description="Создает новый продукт с деталями и изображениями.",
        request_body=ProductSerializer,
        responses={
            201: openapi.Response(
                description="Продукт успешно создан.",
                schema=ProductSerializer,
            ),
            400: "Некорректные данные запроса"
        }
    )
    def create(self, request, *args, **kwargs):
        """Создает новый продукт."""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить детали продукта по ID",
        operation_description="Возвращает подробные сведения о продукте по его ID.",
        responses={
            200: openapi.Response(
                description="Детали продукта",
                schema=ProductSerializer,
            ),
            404: "Продукт не найден"
        }
    )
    def retrieve(self, request, *args, **kwargs):
        """Возвращает детали продукта по ID."""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Обновить продукт по ID",
        operation_description="Обновляет информацию о продукте с указанным ID.",
        request_body=ProductSerializer,
        responses={
            200: openapi.Response(
                description="Продукт обновлен.",
                schema=ProductSerializer,
            ),
            400: "Некорректные данные запроса",
            404: "Продукт не найден"
        }
    )
    def update(self, request, *args, **kwargs):
        """Обновляет продукт по ID."""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        method='patch',
        tags=['Продукты'],
        operation_summary="Частично обновить продукт по ID",
        operation_description="Обновляет часть данных продукта с указанным ID.",
        request_body=ProductSerializer,
        responses={
            200: openapi.Response(
                description="Продукт частично обновлен.",
                schema=ProductSerializer,
            ),
            400: "Некорректные данные запроса",
            404: "Продукт не найден"
        }
    )
    def partial_update(self, request, *args, **kwargs):
        """Частично обновляет продукт по ID."""
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Удалить продукт по ID",
        operation_description="Удаляет продукт с указанным ID из системы.",
        responses={
            204: "Продукт успешно удален",
            404: "Продукт не найден"
        }
    )
    def destroy(self, request, *args, **kwargs):
        """Удаляет продукт по ID."""
        return super().destroy(request, *args, **kwargs)


class SellerProductsViewSet(ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        seller_id = self.kwargs.get('seller_id')
        return Product.objects.filter(seller__id=seller_id) if seller_id else Product.objects.none()

    @action(detail=True, methods=['get'], url_path='products_by_category')
    @swagger_auto_schema(
        tags=['Получение категорий по ID'],
        operation_summary="Получить продукты продавца по категории и подкатегории",
        operation_description="Возвращает продукты заданного продавца, фильтруя по категории и подкатегории.",
        manual_parameters=[
            openapi.Parameter('category_id', openapi.IN_QUERY, description="ID категории", type=openapi.TYPE_INTEGER, required=False),
            openapi.Parameter('subcategory_id', openapi.IN_QUERY, description="ID подкатегории", type=openapi.TYPE_INTEGER, required=False),
        ],
        responses={200: ProductSerializer(many=True)}
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

