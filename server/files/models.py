from django.db import models
from django.core.files.storage import FileSystemStorage

from api.models import Project


def get_project_directory(instance, filename):
    return './files/media/{0}/{1}/{2}'.format(instance.project.team.name, instance.project.name, instance.name)


def get_rev_directory(instance, filename):
    return './files/media/{0}/{1}/revs/{2}'.format(instance.parent.project.team.name, instance.parent.project.name, filename)


class Rev(models.Model):
    name = models.CharField(max_length=60)
    parent = models.ForeignKey('files.File', on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_rev_directory, max_length=500)
    revision = models.IntegerField(editable=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_modified = models.DateTimeField(auto_now=True, null=True)
    mimetype = models.CharField(max_length=256, blank=False)

    def __str__(self):
        return self.parent.name + ', revision: ' + str(self.revision)


class File(models.Model):
    name = models.CharField(max_length=60)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_project_directory, max_length=500)
    query_id = models.IntegerField(editable=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_modified = models.DateTimeField(auto_now=True, null=True)
    mimetype = models.CharField(max_length=256, blank=False)

    def __str__(self):
        return self.project.name + ': ' + self.name


