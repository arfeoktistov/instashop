from rest_framework.routers import DefaultRouter as DR
from django.urls import path, include, re_path
from .views import ApplicationsViewSet, FooterInfoViewSet


router = DR()
router.register(r'applications', ApplicationsViewSet)
router.register(r'footerinfo', FooterInfoViewSet)


urlpatterns = [

]

urlpatterns += router.urls
