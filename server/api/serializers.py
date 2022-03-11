from rest_framework import serializers
from api.models import User, Team, Project, Milestone, Task


class UserSerializer(serializers.ModelSerializer):
    teams = serializers.StringRelatedField(source='team_set',many=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'teams', 'uuid']


class TeamSerializer(serializers.ModelSerializer):
    members =  serializers.StringRelatedField(many=True)
    projects = serializers.StringRelatedField(source='project_set', many=True)
    class Meta:
        model = Team
        fields = ['name', 'description', 'projects', 'members']


class ProjectSerializer(serializers.ModelSerializer):
    milestones = serializers.StringRelatedField(source='milestone_set', many=True)
    class Meta:
        model = Project
        fields = ['name', 'team', 'description', 'milestones']
        depth = 2


class MilestoneSerializer(serializers.ModelSerializer):
    tasks = serializers.StringRelatedField(source='task_set', many=True)
    class Meta:
        model = Milestone
        fields = ['name', 'description', 'tasks']
        depth = 1


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description']