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
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name="animals",
      on_delete = models.CASCADE
    )
    def __str__(self):
        return f"{self.animal_name} - {self.animal_type}"

    # COM = "COMPANY"
    # PLAY = "PLAYTIME"
    # EX = "EXERCISE"
    # ACTIVITY_CHOICES = [
    #   (COM, "company"),
    #   (PLAY, "playtime"),
    #   (EX, "exercise")
    # ]
    # WDD = "WEEKDAY_DAY"
    # WDE = "WEEKDAY_EVE"
    # W = "WEEKENDS"
    # H = "HOLIDAY_OVERNIGHT"
    # AVAILABILITY_CHOICES = [
    #   (WDD, "Weekday - daytimes"),
    #   (WDE, "Weekday - evenings"),
    #   (W, "Weekends"),
    #   (H, "Holidays or overnight stays")
    # ]