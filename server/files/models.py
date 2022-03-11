from distutils.command.upload import upload
from django.db import models

from api.models import Project

def get_project_directory(instance, filename):
    return './files/{0}/{1}/{2}'.format(instance.project.team.name, instance.project.name, filename)

class File(models.Model):
    name = models.CharField(max_length=60)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    file = models.FileField(upload_to=get_project_directory, blank=True)

    def __str__(self):
        return self.project.name + ':' + self.name