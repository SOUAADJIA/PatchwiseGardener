# Generated by Django 4.2.11 on 2024-06-10 20:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_delete_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlantActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('notes', models.TextField()),
                ('plant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='api.plant')),
            ],
        ),
    ]
