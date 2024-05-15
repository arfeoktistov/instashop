from django.db import models
from django_resized import ResizedImageField
from apps.categories.models import SubCategory
from apps.users.models import SellerUser
from django.core.validators import MinValueValidator
from decimal import Decimal


class Product(models.Model):
    """Модель продукта.

    ### Атрибуты:
    - sub_category (ForeignKey): Подкатегория, к которой принадлежит продукт.
    - name (str): Название продукта.
    - description (str): Описание продукта.
    - seller (ForeignKey): Продавец, предлагающий продукт.
    - price (Decimal): Цена продукта.
    - image (ResizedImageField): Основное изображение продукта.
    """
    sub_category = models.ForeignKey(
        SubCategory, on_delete=models.PROTECT,
        verbose_name='Подкатегория',
        related_name='products',
        db_index=True
    )
    name = models.CharField(
        max_length=127, verbose_name='Название',
        db_index=True
    )
    description = models.TextField(
        verbose_name='Описание'
    )
    seller = models.ForeignKey(
        SellerUser, on_delete=models.CASCADE,
        verbose_name='Продавец',
        related_name='products'
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name='Цена',
        validators=[MinValueValidator(Decimal('0.01'))],
        db_index=True
    )
    image = ResizedImageField(
        verbose_name='Фото', upload_to='products/images',
        size=[1440, 2560], quality=75
    )

    def __str__(self) -> str:
        """Возвращает название продукта."""
        return self.name

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['price']),
            models.Index(fields=['sub_category']),
        ]


class ProductImage(models.Model):
    """Модель изображения продукта.

    ### Атрибуты:
    - product (ForeignKey): Продукт, к которому принадлежит изображение.
    - image (ResizedImageField): Изображение продукта.
    """
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE,
        verbose_name='Продукт'
    )
    image = ResizedImageField(
        verbose_name='Фото', upload_to='products/images',
        size=[1440, 2560], quality=75
    )

    def __str__(self) -> str:
        """Возвращает описание изображения, связанного с продуктом."""
        return f"Image for {self.product.name}"

    class Meta:
        verbose_name = 'Изображение продукта'
        verbose_name_plural = 'Изображения продуктов'
