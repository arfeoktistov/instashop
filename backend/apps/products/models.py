from django.db import models

from django_resized import ResizedImageField

from apps.categories.models import(
    SubCategory,
)

from apps.users.models import(
    SellerUser,
)




class Product(models.Model):
    sub_category = models.ForeignKey(
        SubCategory, on_delete=models.PROTECT,
        verbose_name = 'Подкатегория',
        related_name = 'products'
    )
    name = models.CharField(
        max_length = 127,
        verbose_name = 'Название'
    )
    description = models.TextField(
        verbose_name = 'Описание'
    )
    seller = models.ForeignKey(
        SellerUser,
        on_delete=models.CASCADE,
        verbose_name='Продавец',
        related_name='products'
    )
    price = models.IntegerField(verbose_name='Цена')
    image = ResizedImageField(
        verbose_name='Фото', upload_to='products/images',
        size=[1440, 2560], quality=100, 
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE, verbose_name='Продукт')
    image = ResizedImageField(
        size=[500, 500],
        upload_to='product_images/',
        verbose_name='Изображение'
    )

    def __str__(self):
        return f"Image for {self.product.name}"

    class Meta:
        verbose_name = 'Изображение продукта'
        verbose_name_plural = 'Изображения продуктов'