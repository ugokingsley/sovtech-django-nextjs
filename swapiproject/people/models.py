from django.db import models

class Actor(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    height = models.CharField(max_length=255, blank=True, null=True)
    mass = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=255, blank=True, null=True)
    homeworld = models.CharField(max_length=255, blank=True, null=True)
    insert_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Actors'
    def __str__(self):
        return self.name