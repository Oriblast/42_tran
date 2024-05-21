# Generated by Django 5.0.1 on 2024-01-21 17:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api42", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(
                default=datetime.datetime(
                    2024, 1, 21, 17, 4, 49, 102873, tzinfo=datetime.timezone.utc
                ),
                max_length=255,
                unique=True,
            ),
            preserve_default=False,
        ),
    ]
