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