from rest_framework.routers import DefaultRouter as DR
from .views import ProductViewSet
from django.urls import path

router = DR()
router.register(r'products', ProductViewSet)
urlpatterns = [

]

urlpatterns += router.urls
