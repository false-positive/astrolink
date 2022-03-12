from django.db import models
from django.core.files.storage import FileSystemStorage

from api.models import Project


def get_project_directory(instance, filename):
    return './files/media/{0}/{1}/{2}'.format(instance.project.team.name, instance.project.name, filename)


def get_rev_directory(instance, filename):
    return './files/media/{0}/{1}/revs/{2}.{3}'.format(instance.parent.project.team.name, instance.parent.project.name, instance.parent.name, instance.parent.extension)


class Rev(models.Model):
    name = models.CharField(max_length=60)
    parent = models.ForeignKey('files.File', on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_rev_directory, blank=True)
    extension = models.CharField(max_length=10)
    revision = models.IntegerField(editable=False)
    date_added = models.DateTimeField(auto_now_add=True, null=True)
    date_changed = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.parent.name + ', revision: ' + str(self.revision)


class File(models.Model):
    name = models.CharField(max_length=60)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_project_directory, blank=True)
    extension = models.CharField(max_length=10)
    query_id = models.IntegerField(editable=False)
    date_added = models.DateTimeField(auto_now_add=True, null=True)
    date_changed = models.DateTimeField(auto_now=True, null=True)
    

    def __str__(self):
        return self.project.name + ': ' + self.name


