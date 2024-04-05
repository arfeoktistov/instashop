from rest_framework.permissions import IsAuthenticated
from rest_framework.views import (
    APIView,
)
from rest_framework.response import Response
from apps.users.serializers import (
    UserSerializer
)
from rest_framework.viewsets import ModelViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import User, SellerUser
from .serializers import UserSerializer, SellerUserSerializer
from .pagination import CustomPagination

class GetUserIdView(APIView):

    permission_classes = [IsAuthenticated, ]
    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Получить информацию о пользовавтеле по токену",
        responses={200: UserSerializer(many=False)}
    )
    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = UserSerializer(instance=user, many=False).data
        return Response(user_data)


class SellerUserViewSet(ModelViewSet):
    serializer_class = SellerUserSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        if self.action == 'retrieve':
            return SellerUser.objects.all()
        SellerUser.objects.exclude(id=33)

    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Получить список всех магазинов",
        responses={200: SellerUserSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Создать новый магазинов",
        request_body=SellerUserSerializer,
        responses={201: SellerUserSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Получить детали магазина по ID пользователя",
        responses={200: SellerUserSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Обновить магазин по ID пользователя",
        request_body=SellerUserSerializer,
        responses={200: SellerUserSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Магазин'],
        operation_summary="Удалить магазин по ID пользователя",
        responses={204: 'No Content'}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
