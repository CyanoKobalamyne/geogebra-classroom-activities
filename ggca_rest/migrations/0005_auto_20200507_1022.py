# Generated by Django 3.0.6 on 2020-05-07 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ggca_rest', '0004_auto_20200507_0858'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentscreen',
            name='status',
            field=models.TextField(choices=[('E', 'Empty'), ('S', 'Started'), ('D', 'Done')], default='E'),
        ),
    ]