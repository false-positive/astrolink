from rest_framework import serializers

from files.models import File, Rev


class RevSerializer(serializers.ModelSerializer):
    revision = serializers.IntegerField(required=False, read_only=True)

    class Meta:
        model = Rev
        fields = ['name', 'parent', 'file', 'mimetype', 'revision', 'created_at', 'last_modified']


class FileSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(read_only=True)
    revisions = RevSerializer(source='rev_set', many=True, read_only=True)

    class Meta:
        model = File
        fields = ['project', 'name', 'mimetype',
                  'file', 'revisions', 'query_id', 'created_at', 'last_modified']
