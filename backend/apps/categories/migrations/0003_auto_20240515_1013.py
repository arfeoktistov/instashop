# Generated by Django 3.2.7 on 2024-05-15 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_alter_subcategory_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(db_index=True, max_length=127, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='name',
            field=models.CharField(db_index=True, max_length=127, verbose_name='Название подкатегории'),
        ),
        migrations.AddIndex(
            model_name='category',
            index=models.Index(fields=['name'], name='categories__name_e3ad98_idx'),
        ),
        migrations.AddIndex(
            model_name='subcategory',
            index=models.Index(fields=['name'], name='categories__name_c6c0c6_idx'),
        ),
        migrations.AddIndex(
            model_name='subcategory',
            index=models.Index(fields=['category', 'name'], name='categories__categor_a063d0_idx'),
        ),
    ]
