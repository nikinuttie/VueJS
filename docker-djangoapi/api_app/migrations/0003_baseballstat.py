# Generated by Django 3.2.12 on 2022-02-25 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0002_auto_20220223_0356'),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseballStat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.TextField()),
                ('team_name', models.TextField()),
                ('position', models.TextField()),
                ('player_age', models.PositiveIntegerField()),
                ('games_played', models.PositiveIntegerField()),
                ('at_bats', models.PositiveIntegerField()),
                ('runs', models.PositiveIntegerField()),
                ('home_runs', models.PositiveIntegerField()),
                ('rbi', models.PositiveIntegerField()),
            ],
        ),
    ]
