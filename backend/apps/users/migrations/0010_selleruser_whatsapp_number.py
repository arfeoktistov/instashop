# Generated by Django 3.2.7 on 2024-04-17 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_auto_20240411_1316'),
    ]

    operations = [
        migrations.AddField(
            model_name='selleruser',
            name='whatsapp_number',
            field=models.CharField(blank=True, default='', max_length=25, null=True, verbose_name='Номер Whatsapp'),
        ),
    ]
