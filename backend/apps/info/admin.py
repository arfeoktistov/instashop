from django.contrib import admin
from .models import Application, FooterInfo


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at',)
    search_fields = ('name', 'created_at',)
    ordering = ('created_at',)


@admin.register(FooterInfo)
class FooterInfoAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'instagram_link',)

