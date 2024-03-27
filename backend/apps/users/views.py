from rest_framework.viewsets import(
    ModelViewSet,
    ReadOnlyModelViewSet,
    GenericViewSet,
)

from rest_framework.views import(
    APIView,
)

from rest_framework.mixins import(
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)

from rest_framework.response import Response

from rest_framework.permissions import(
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)

from django_filters.rest_framework import(
    DjangoFilterBackend,
)

from rest_framework import filters

from rest_framework.decorators import action

from rest_framework.status import (
    HTTP_201_CREATED,
)

from apps.users.serializers import(
    UserRegistrationSerializer,
    VerificationUserSerializer,
    NewVerificationCodeSerializer,
)

from apps.users.models import(
    User,
)

from apps.users.email import(
    send_verification_code,
)

from datetime import(
    datetime,
    timedelta,
)

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