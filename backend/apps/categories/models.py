from django.db import models


class Category(models.Model):
    """ Модель категорий.

    ### Атрибуты:
    - name (str): Название категории.
    """
    name = models.CharField(max_length=127, verbose_name='Название', db_index=True)

    def __str__(self) -> str:
        """Возвращает название категории."""
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        indexes = [
            models.Index(fields=['name']),
        ]


class SubCategory(models.Model):
    """ Модель подкатегорий.

    Каждая подкатегория принадлежит одной категории и представляет более конкретный
    тип продукта или услуги внутри этой категории.

    ### Атрибуты:
    - category (ForeignKey): Связанная категория, к которой принадлежит подкатегория.
    - name (str): Название подкатегории.
    """
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='Категория', related_name='sub_categories')
    name = models.CharField(max_length=127, verbose_name='Название подкатегории', db_index=True)

    def __str__(self) -> str:
        """Возвращает строковое представление подкатегории, включая связанную категорию."""
        return f'{self.category.name} - {self.name}'

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['category', 'name']),
        ]
