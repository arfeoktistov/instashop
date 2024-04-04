# Generated by Django 3.2.7 on 2024-04-04 14:15

from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_productimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format='JPEG', keep_meta=True, quality=75, scale=0.5, size=[1440, 2560], upload_to='products/images', verbose_name='Фото'),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Цена'),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format='JPEG', keep_meta=True, quality=75, scale=0.5, size=[1440, 2560], upload_to='products/images', verbose_name='Фото'),
        ),
    ]
