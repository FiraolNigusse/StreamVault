# Generated by Django 5.1.6 on 2025-05-05 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('firebase_url', models.URLField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
