# Generated by Django 4.0.3 on 2022-03-12 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0012_alter_rev_date_added_alter_rev_date_changed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='name',
            field=models.CharField(max_length=60),
        ),
        migrations.AlterField(
            model_name='rev',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='rev',
            name='date_changed',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
