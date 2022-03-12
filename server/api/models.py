import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user



#class Person(models.Model):
#    class Meta:
#        verbose_name_plural = 'people'
#
#    name = models.CharField(max_length=60, blank=True, default='')       
#    user = models.OneToOneField(User, on_delete=models.CASCADE)
#    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#    
#    def __str__(self):
#        return self.user.username
class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    first_name = models.CharField(max_length=60, blank=False)
    last_name = models.CharField(max_length=60, blank=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Team(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=300, blank=True)
    members = models.ManyToManyField(User, blank=True)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=60)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name



class Milestone(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    query_id = models.IntegerField(editable=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=500, blank=True)
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE)

    def __str__(self):
        return self.name