from rest_framework import serializers

from files.models import File, Rev

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['pk', 'name', 'project', 'file']


class RevSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rev
        fields = ['name', 'parent', 'file']



