# Generated by Django 4.0.3 on 2022-03-12 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0003_file_extension'),
    ]

    operations = [
        migrations.AddField(
            model_name='rev',
            name='extension',
            field=models.CharField(default='jpg', max_length=10),
            preserve_default=False,
        ),
    ]
