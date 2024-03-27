from django.contrib import admin
from django.urls import path, include, re_path

from core.swagger import schema_view
from django.conf import settings
from django.conf.urls.static import static

from core.views import (
    MainAPI, API
)

api_urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('categories/', include('apps.categories.urls')),
    path('products/', include('apps.products.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('auth/', include('rest_framework.urls')),
    path('api/', API.as_view()),
    path('', MainAPI.as_view()),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
