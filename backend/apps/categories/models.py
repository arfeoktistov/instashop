from django.db import models

from django_resized import ResizedImageField


class Category(models.Model):
    name = models.CharField(
        max_length=127, verbose_name = 'Название'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class SubCategory(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT,
        verbose_name = 'Категория',
        related_name = 'sub_categories'
    )
    name = models.CharField(
        max_length=127, verbose_name='Название'
    )
    

    def __str__(self):
        return f'{self.category.name} - {self.name}'

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'
