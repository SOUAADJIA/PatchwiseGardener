# Generated by Django 4.2.11 on 2024-06-11 01:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_plant_fertilizing_reminder_period_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plant',
            name='planting_reminder_period',
        ),
    ]
