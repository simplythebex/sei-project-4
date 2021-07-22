# Generated by Django 3.2.5 on 2021-07-22 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('activities', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('animal_name', models.CharField(default=None, max_length=50)),
                ('animal_type', models.CharField(default=None, max_length=50)),
                ('animal_bio', models.CharField(default=None, max_length=300)),
                ('animal_age', models.PositiveIntegerField(default=None)),
                ('animal_image', models.CharField(max_length=300)),
                ('activity', models.ManyToManyField(related_name='animals', to='activities.Activity')),
            ],
        ),
    ]
