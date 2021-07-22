from django.db import models

# Create your models here.
class Request(models.Model):
    request_status = models.CharField(max_length=300)
    message = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    animal = models.ForeignKey(
      "animals.Animal",
      related_name = "requests",
      on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name="requests",
      on_delete= models.CASCADE
    )