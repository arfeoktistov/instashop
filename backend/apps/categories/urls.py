from rest_framework.routers import DefaultRouter as DR
from django.urls import path, include
from .views import CategoryViewSet, SubCategoryViewSet

router = DR()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)

urlpatterns = [
]

urlpatterns += router.urls
