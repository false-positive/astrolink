from rest_framework import serializers
from api.models import Milestone, Person, Task, Team, Project

class PersonSerializer(serializers.ModelSerializer):
    pass


class TeamSerializer(serializers.ModelSerializer):
    members =  serializers.StringRelatedField(many=True)
    projects = serializers.StringRelatedField(many=True)
    class Meta:
        model = Team
        fields = ['name', 'description', 'project_set']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'description', 'team', 'files', 'milestones']

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['name']

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['name', 'description', 'milestone']