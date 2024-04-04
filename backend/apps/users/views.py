from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import (
    APIView,
)
from rest_framework.response import Response

from rest_framework.status import (
    HTTP_201_CREATED,
)
from apps.users.serializers import (
    UserRegistrationSerializer,
    VerificationUserSerializer,
    NewVerificationCodeSerializer,
)
from apps.users.models import (
    User,
)
from apps.users.email import (
    send_verification_code,
)

from datetime import (
    datetime,
    timedelta,
)


class GetUserIdView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = UserSerializer(user).data
        return Response(user_data)


class UserRegistrationView(APIView):

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        role = data.get('role')
        email = data.get('email')

        user = User.objects.filter(email=email).first()

        if user is not None:
            return Response(
                {
                    'Error': "User with such email is already exists"
                }, status=400
            )
        else:
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                role=role,
                email=email,
                is_active=False
            )

            user.set_password(data.get('password'))
            user.save()

            code = user.generate_code

            send_verification_code.delay(email, code)
            # send_verification_code(email, code)

            return Response(
                {
                    'message': 'Successfully registration',
                    'user_id': user.id
                },
                status=HTTP_201_CREATED
            )


class VerificationUserView(APIView):

    def post(self, request):
        serializer = VerificationUserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get('code')
        user_id = serializer.validated_data.get('user_id')

        user = User.objects.filter(id=user_id).first()

        if user is not None:
            if user.code_time + timedelta(minutes=10) < datetime.now():
                return Response(
                    {
                        'Error': 'Code is not active now, try again'
                    }, status=400
                )
            elif code != user.code_activation:
                return Response(
                    {
                        "Error": "Code is not valid, please try again"
                    }, status=400
                )
            elif code == user.code_activation and user.code_time + timedelta(minutes=10) > datetime.now():
                user.is_active = True
                user.save()
                return Response(
                    {
                        'Message': "Successfuly confirmation, thanks!"
                    }, status=201
                )
            else:
                return Response(
                    {
                        'Error'
                    }
                )
        else:
            return Response(
                {
                    'Error': 'User does not exists'
                }, status=400
            )


class NewVerificationCodeView(APIView):

    def post(self, request):
        serializer = NewVerificationCodeSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user_id = serializer.validated_data.get('user_id')

        user = User.objects.filter(id=user_id).first()

        if user is not None:
            new_code = user.generate_code

            send_verification_code.delay(user.email, new_code)
            # send_verification_code(user.email, new_code)
            return Response(
                {
                    'user_id': int(user_id)
                }, status=201
            )
        else:
            return Response(
                {
                    'Error': "User does not exists"
                }, status=400
            )


from rest_framework.viewsets import ModelViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import User, SellerUser
from .serializers import UserSerializer, SellerUserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @swagger_auto_schema(
        tags=['Пользователь'],
        operation_summary="Получить список всех пользователей",
        responses={200: UserSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Пользователь'],
        operation_summary="Создать нового пользователя",
        request_body=UserSerializer,
        responses={201: UserSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Пользователь'],
        operation_summary="Получить детали пользователя по ID",
        responses={200: UserSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Пользователь'],
        operation_summary="Обновить пользователя по ID",
        request_body=UserSerializer,
        responses={200: UserSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Пользователь'],
        operation_summary="Удалить пользователя по ID",
        responses={204: 'No Content'}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class SellerUserViewSet(ModelViewSet):
    queryset = SellerUser.objects.all()
    serializer_class = SellerUserSerializer

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
