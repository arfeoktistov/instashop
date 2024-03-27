from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="HRev V0.0.1",
        default_version='V0.0.1',
        description="Platform for fine work and friends, created by Mr_LeVaSiK and Dastanio",
        terms_of_service="#",
        contact=openapi.Contact(email="lev201611@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)