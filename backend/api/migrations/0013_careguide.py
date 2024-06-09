# Generated by Django 4.2.11 on 2024-06-09 18:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_delete_plantguide'),
    ]

    operations = [
        migrations.CreateModel(
            name='CareGuide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('common_name', models.CharField(max_length=255)),
                ('scientific_name', models.CharField(max_length=255)),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('species', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='care_guides', to='api.species')),
            ],
        ),
    ]
