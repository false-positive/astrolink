# Generated by Django 4.0.3 on 2022-03-11 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_person_uuid_alter_team_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='description',
            field=models.CharField(max_length=300),
        ),
    ]
