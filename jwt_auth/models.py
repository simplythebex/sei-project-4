from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    account_type = models.CharField(max_length=50)
    bio = models.CharField(max_length=300)
    profile_picture = models.CharField(max_length=300)
    activity = models.ManyToManyField(
      "activities.Activity",
      related_name="users"
    )
    schedule = models.ManyToManyField(
        "schedules.Schedule",
        related_name="users"
    )

