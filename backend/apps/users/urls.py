from rest_framework.routers import DefaultRouter as DR
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from apps.users.views import(
     SellerUserViewSet,
)
from apps.users.views import GetUserIdView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

router = DR()
router.register(r'seller-users', SellerUserViewSet)

# token_obtain_pair = TokenObtainPairView.as_view()
# token_obtain_pair = swagger_auto_schema(
#     method='post',
#     responses={200: openapi.Response('Токен получен',)},
#     tags=['Магазин'],
#     operation_summary="Авторизация. Получить пару токенов",
# )(token_obtain_pair)

urlpatterns = [
    path(
        'token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path('users/token/user-id/', GetUserIdView.as_view(), name='get-user-id'),

]

urlpatterns += router.urls
