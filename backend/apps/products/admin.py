from django.contrib import admin
from .models import Product, ProductImage
from django.utils.html import format_html


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image_preview', 'image',)
    readonly_fields = ('image_preview',)

    def image_preview(self, instance):
        if instance.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                instance.image.url
            )
        return "Нет изображения"

    image_preview.short_description = "Предпросмотр"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sub_category', 'seller', 'price', 'image_preview')
    search_fields = ('name', 'description', 'sub_category__name', 'seller__user__username')
    list_filter = ('seller', 'sub_category',)
    inlines = [ProductImageInline, ]

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"

    image_preview.short_description = "Основное изображение"
