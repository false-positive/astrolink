# Generated by Django 4.0.3 on 2022-03-13 00:04

from django.db import migrations, models
import files.models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0015_alter_file_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rev',
            name='file',
            field=models.FileField(max_length=500, upload_to=files.models.get_rev_directory),
        ),
    ]
