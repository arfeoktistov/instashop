# Generated by Django 3.2.7 on 2024-04-11 13:16

from django.db import migrations
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20240404_1415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format='JPEG', keep_meta=True, quality=75, scale=0.8, size=[1440, 2560], upload_to='products/images', verbose_name='Фото'),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format='JPEG', keep_meta=True, quality=75, scale=0.8, size=[1440, 2560], upload_to='products/images', verbose_name='Фото'),
        ),
    ]