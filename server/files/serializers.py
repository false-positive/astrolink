from rest_framework import serializers

from files.models import File, Rev


class RevSerializer(serializers.ModelSerializer):
    revision = serializers.IntegerField(required=False, read_only=True)

    class Meta:
        model = Rev
        fields = ['name', 'parent', 'file', 'extension', 'revision']


class FileSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField(read_only=True)
    revisions = RevSerializer(source='rev_set', many=True, read_only=True)

    class Meta:
        model = File
        fields = ['pk', 'project', 'name', 'extension',
                  'file', 'revisions', 'query_id']
