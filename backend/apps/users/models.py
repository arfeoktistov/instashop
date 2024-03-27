from django.db import models

from django.contrib.auth.models import AbstractUser

from django_resized import ResizedImageField

from apps.users.config import(
    ROLE, SELLER, BUYER,
)

from django.utils import timezone

from apps.users.manager import(
    UserModelManager,
)


class User(AbstractUser):
    phone_number = models.CharField(max_length=127, verbose_name='Номер телефона', null=True, blank=True)
    role = models.CharField(
        max_length=127, verbose_name='Роль', null=True, blank=True,
        choices=ROLE, default=BUYER
    )
    username = None
    is_active = models.BooleanField(verbose_name = 'Активен ли?', default=False)
    code_activation = models.CharField(max_length=127, verbose_name='Код активации', null=True, blank=True)
    code_time = models.DateTimeField(null=True)
    email = models.EmailField(unique=True, verbose_name='Email')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.email} - {self.phone_number}'
    
    @property
    def generate_code(self):
        from random import randint
        code = ''
        for i in range(6):
            code += str(randint(0,9))
        self.code_activation = code
        self.code_time = timezone.now()
        self.save()
        return code
    
    objects = UserModelManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        indexes = [
            models.Index(fields=['email',]),
        ]
        ordering = ['email']


class SellerUser(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        verbose_name='Продавец',
        related_name='seller_user'
    )
    tin = models.CharField(max_length=127, verbose_name='ИНН', default='')
    container_number = models.CharField(max_length=127, verbose_name='Номер контейнера', default='')
    description = models.TextField(verbose_name = 'Описание магазина', default='')
    paid_status = models.BooleanField(default=False, verbose_name='Статус оплаты подписки')
    paid_date = models.DateField(verbose_name='Дата оплаты', default='')
    lat = models.FloatField(default=0.00, verbose_name='Широта')
    long = models.FloatField(default=0.00, verbose_name='Долгота')
    
    def __str__(self):
        return self.user.email
    
    class Meta:
        verbose_name = 'Продавец'
        verbose_name_plural = 'Продавцы'

