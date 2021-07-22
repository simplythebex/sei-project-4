from django.db import models

class Animal(models.Model):
    animal_name = models.CharField(max_length=50, default=None)
    animal_type = models.CharField(max_length=50, default=None)
    animal_bio = models.CharField(max_length=300, default=None)
    animal_age = models.PositiveIntegerField(default=None)
    animal_image = models.CharField(max_length=300)
    activity = models.ManyToManyField(
        "activities.Activity",
        related_name="animals"
    )
    schedule = models.ManyToManyField(
        "schedules.Schedule",
        related_name="animals"
    )
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name="animals",
      on_delete = models.CASCADE
    )
    def __str__(self):
        return f"{self.animal_name} - {self.animal_type}"
        