from rest_framework.routers import DefaultRouter as DR
from .views import ProductViewSet, SellerProductsViewSet
from django.urls import path

router = DR()
router.register(r'products', ProductViewSet)
router.register(r'seller/(?P<seller_id>\d+)/products', SellerProductsViewSet, basename='seller-products')
urlpatterns = [

]

urlpatterns += router.urls
