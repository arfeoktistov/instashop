from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


User = get_user_model()



class UserRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()


# {
#     "first_name": "Levasik",
#     "last_name": "Boiko",
#     "email": "lev201611@gmail.com",
#     "password": "qazwsx123!",
# }


class VerificationUserSerializer(serializers.Serializer):
    code = serializers.CharField()
    user_id = serializers.CharField()


# {
#     "code": "087275",
#     "user_id": 3
# }


class NewVerificationCodeSerializer(serializers.Serializer):
    user_id = serializers.CharField()


# {
#     "user_id": 3
# }


from .models import User, SellerUser


class UserSerializer(serializers.ModelSerializer):
    seller_details = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'seller_details',)  # добавьте нужные поля
        extra_kwargs = {
            'password': {'write_only': True},
            'code_activation': {'write_only': True},
        }

    def get_seller_details(self, obj):
        try:
            seller_user = SellerUser.objects.get(user=obj)
            return SellerUserSerializer(seller_user).data
        except SellerUser.DoesNotExist:
            return None



class SellerUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerUser
        fields = (
            'id', 'user', 'shop_name', 'main_image',
            'background_image', 'insta_image', 'mini_description',
            'instagram_link', 'product', 'followers',
        )

