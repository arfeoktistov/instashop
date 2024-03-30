from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response

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

    swagger_auto_schema(
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
    """
    A viewset for viewing products by a specific seller.
    """
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters the queryset by 'seller_id' from the URL kwargs.
        """
        seller_id = self.kwargs.get('seller_id')
        return Product.objects.filter(seller__id=seller_id) if seller_id else Product.objects.none()

    @swagger_auto_schema(
        tags=['Получение категорий по ID'],
        operation_summary="Получить список всех продуктов продавца",
        operation_description="Возвращает список всех продуктов для заданного продавца по 'seller_id'.",
        responses={
            200: openapi.Response(
                description="Список продуктов продавца",
                schema=ProductSerializer(many=True),
            ),
            404: "Продавец с указанным ID не найден"
        }
    )
    def list(self, request, *args, **kwargs):
        """
        Returns a list of all products for a given seller identified by 'seller_id'.
        """
        return super().list(request, *args, **kwargs)
