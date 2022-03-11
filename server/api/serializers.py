from rest_framework import serializers
from api.models import User, Team, Project, Milestone, Task


class UserSerializer(serializers.ModelSerializer):
    teams = serializers.StringRelatedField(source='team_set',many=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'teams', 'uuid']

class TeamSerializer(serializers.ModelSerializer):
    members =  serializers.StringRelatedField(many=True)
    projects = serializers.StringRelatedField(many=True)
    class Meta:
        model = Team
        fields = ['name', 'description', 'project_set']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'team']
        depth = 1

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['name']

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['name', 'description', 'milestone']