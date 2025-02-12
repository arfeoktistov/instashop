from django.db import models

from django.contrib.auth.models import AbstractUser

from django_resized import ResizedImageField

from apps.users.config import (
    ROLE, SELLER, BUYER,
)

from django.utils import timezone

from apps.users.manager import (
    UserModelManager,
)


class User(AbstractUser):
    phone_number = models.CharField(max_length=127, verbose_name='Номер телефона', null=True, blank=True)
    role = models.CharField(
        max_length=127, verbose_name='Роль', null=True, blank=True,
        choices=ROLE, default=BUYER
    )
    username = None
    email = models.EmailField(unique=True, verbose_name='Email')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.email} - {self.phone_number}'

    objects = UserModelManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        indexes = [
            models.Index(fields=['email', ]),
            models.Index(fields=['phone_number']),
            models.Index(fields=['role']),
        ]
        ordering = ['email']


class SellerUser(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        verbose_name='Продавец',
        related_name='seller_user'
    )
    shop_name = models.CharField(
        max_length=100, verbose_name='Название магазина',
        default=''
        )
    background_image = ResizedImageField(
        verbose_name='Фото заднее', upload_to='users/images_back',
        size=[1440, 2560], quality=100,
        null=True, blank=True,
    )
    insta_image = ResizedImageField(
        verbose_name='Фото инста', upload_to='users/images_back',
        size=[1440, 2560], quality=100,
        null=True, blank=True,
    )
    main_image = ResizedImageField(
        verbose_name='Фото главная', upload_to='users/images_main',
        size=[1440, 2560], quality=100,
        null=True, blank=True,)
    tin = models.CharField(max_length=127, verbose_name='ИНН', default='')
    description = models.TextField(verbose_name='Описание магазина', default='')
    mini_description = models.CharField(
        max_length=150, verbose_name='Описание на главной',
        default=''
    )
    paid_status = models.BooleanField(default=False, verbose_name='Статус оплаты подписки')
    paid_date = models.DateField(verbose_name='Дата оплаты', default='')
    instagram_link = models.CharField(max_length=150, verbose_name='Ссылка инстаграм', default='')
    product = models.IntegerField(verbose_name='Количество товаров', default=0)
    followers = models.IntegerField(verbose_name='Количество подписчиков', default=0)
<<<<<<< HEAD
    whatsapp_number = models.CharField(max_length=25, verbose_name='Номер Whatsapp', default='', null=True, blank=True)
    telegram_link = models.CharField(max_length=127, verbose_name='Ссылка telegram', default='', null=True, blank=True)
=======
>>>>>>> fe2ddc59 (rework)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Продавец'
        verbose_name_plural = 'Продавцы'
        indexes = [
            models.Index(fields=['shop_name']),
        ]
