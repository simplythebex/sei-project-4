# Generated by Django 3.2.5 on 2021-07-22 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedules', '0001_initial'),
        ('jwt_auth', '0002_user_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='schedule',
            field=models.ManyToManyField(related_name='users', to='schedules.Schedule'),
        ),
    ]
