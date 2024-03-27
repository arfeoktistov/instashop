from rest_framework.routers import DefaultRouter as DR

from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from apps.users.views import(
    UserRegistrationView,
    VerificationUserView,
    NewVerificationCodeView,
)


router = DR()

urlpatterns = [
    path(
        'token/',
        TokenObtainPairView.as_view(), 
        name='token_obtain_pair'
    ),
    path(
        'registration/', 
        UserRegistrationView.as_view(), 
        name='registration'
    ),
    path(
        'verification/', 
        VerificationUserView.as_view(), 
        name='verification'
    ),
    path(
        'new_code/', 
        NewVerificationCodeView.as_view(), 
        name='new_code'
    ),
]

urlpatterns += router.urls
