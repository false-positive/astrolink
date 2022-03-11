from rest_framework import serializers
from api.models import TestFile

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestFile
        fields = ['name', 'file']