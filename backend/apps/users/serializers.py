from rest_framework import serializers


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
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'code_activation': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class SellerUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerUser
        fields = (
            'id', 'user', 'shop_name', 'main_image',
            'insta_image', 'mini_description',
        )
