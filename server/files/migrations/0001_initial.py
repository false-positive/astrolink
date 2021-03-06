# Generated by Django 4.0.3 on 2022-03-12 00:47

from django.db import migrations, models
import django.db.models.deletion
import files.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('file', models.FileField(blank=True, upload_to=files.models.get_project_directory)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.project')),
            ],
        ),
    ]
