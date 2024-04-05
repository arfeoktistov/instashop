from django.db import models


class Category(models.Model):
    """ Модель категорий.

    ### Attrs:
    - name (str):
        -Название категории.
    """
    name: models.CharField = models.CharField(
        max_length=127, verbose_name='Название'
    )

    def __str__(self) -> str:
        """Возвращает название категории."""
        return self.name

    class Meta:
        verbose_name: str = 'Категория'
        verbose_name_plural: str = 'Категории'


class SubCategory(models.Model):
    """ Модель подкатегорий.

    Каждая подкатегория принадлежит одной категории и
    представляет более конкретный тип продукта или услуги внутри этой категории.

    ### Attrs:
    - category (ForeignKey): Связанная категория, к которой принадлежит подкатегория.
    - name (str): Название подкатегории.
    """
    category: models.ForeignKey = models.ForeignKey(
        Category, on_delete=models.PROTECT,
        verbose_name='Категория',
        related_name='sub_categories'
    )
    name: models.CharField = models.CharField(
        max_length=127, verbose_name='Название подкатегории'
    )

    def __str__(self) -> str:
        """Возвращает строковое представление подкатегории, включая связанную категорию."""
        return f'{self.category.name} - {self.name}'

    class Meta:
        verbose_name: str = 'Подкатегория'
        verbose_name_plural: str = 'Подкатегории'
