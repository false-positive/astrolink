from pyexpat import model
from django.db import models


class TestFile(models.Model):
    name = models.CharField(max_length=60)
    file = models.ImageField()

    def __str__(self):
        return self.name