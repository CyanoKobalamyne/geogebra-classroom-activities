# Generated by Django 3.0.6 on 2020-05-07 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ggca_rest', '0003_studentscreen_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentscreen',
            name='geogebra_data',
            field=models.TextField(blank=True),
        ),
    ]