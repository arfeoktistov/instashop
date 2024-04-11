from django.db import models


class Application(models.Model):
    name: models.CharField = models.CharField(
        max_length=127, verbose_name='Имя пользователя',
        help_text='Строковое значение имени пользователя'
    )
    phone_number: models.CharField = models.CharField(
        max_length=20, verbose_name='Номер телефона',
        help_text='Строковое значение номера телефона'
    )
    instagram_link: models.CharField = models.CharField(
        max_length=127, verbose_name='Ссылка на Instagram',
        help_text='Строковое значение ссылки на инстаграм',
        null=True, blank=True
    )
    application_text: models.TextField = models.TextField(
        verbose_name='Текст заявки',
        help_text='Тексовое значения заявки'
    )
    created_at: models.DateField = models.DateField(
        verbose_name='Дата создания заявки',
        help_text='Дата создания заявки формируется автомотически',
        auto_now_add=True
    )

    def __str__(self):
        return f'Заявка от{self.name} - {self.created_at}'

    class Meta:
        verbose_name: str = 'Заявка'
        verbose_name_plural: str = 'Заявки'
        ordering = ['-created_at']


class FooterInfo(models.Model):
    phone_number: models.CharField = models.CharField(
        max_length=25, verbose_name='Номер телефона',
        help_text='Контактный номер телефона в футере',
        unique=True
    )
    instagram_link: models.CharField = models.CharField(
        max_length=127, verbose_name='Ссылка на наш инстаграм',
        help_text='Ссылка на наш инстаграм в строковом значении',
        unique=True
    )
