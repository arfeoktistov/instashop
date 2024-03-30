from rest_framework.viewsets import ModelViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import Product
from .serializers import ProductSerializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить список всех продуктов",
        responses={200: ProductSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """Возвращает список всех продуктов."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Создать новый продукт",
        request_body=ProductSerializer,
        responses={201: ProductSerializer}
    )
    def create(self, request, *args, **kwargs):
        """Создает новый продукт."""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Получить детали продукта по ID",
        responses={200: ProductSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        """Возвращает детали продукта по ID."""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Обновить продукт по ID",
        request_body=ProductSerializer,
        responses={200: ProductSerializer}
    )
    def update(self, request, *args, **kwargs):
        """Обновляет продукт по ID."""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary="Удалить продукт по ID",
        responses={204: 'No Content'}
    )
    def destroy(self, request, *args, **kwargs):
        """Удаляет продукт по ID."""
        return super().destroy(request, *args, **kwargs)


class SellerProductsViewSet(ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Этот метод фильтрует queryset в зависимости от параметра 'seller_id' в URL.
        """
        seller_id = self.kwargs.get('seller_id')
        if seller_id is not None:
            return Product.objects.filter(seller__id=seller_id)
        return Product.objects.none()  # Возвращаем пустой queryset, если seller_id не предоставлен

    @swagger_auto_schema(
        tags=['Получение категорий по ID'],
        operation_summary="Получить список всех продуктов магазина по ID продавца",
        responses={200: ProductSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """
        Возвращает список всех продуктов магазина по ID продавца.
        """
        return super().list(request, *args, **kwargs)
