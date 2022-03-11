import uuid
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User


class Person(models.Model):
    class Meta:
        verbose_name_plural = 'people'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    def __str__(self):
        return self.user.first_name + self.user.last_name


class Team(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=300)
    members = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=60)
    team = models.ForeignKey(Team, blank=True, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.name

