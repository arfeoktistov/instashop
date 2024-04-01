from rest_framework.routers import DefaultRouter as DR
from django.urls import path, include, re_path
from .views import CategoryViewSet, SubCategoryViewSet, SellerCategoriesViewSet


router = DR()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'sellers', SellerCategoriesViewSet, basename='sellers')


urlpatterns = [

]

urlpatterns += router.urls
