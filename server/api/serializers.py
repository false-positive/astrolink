from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import serializers


from api.models import User, Team, Project, Milestone, Task

class TeamField(serializers.RelatedField):

    queryset = Team.objects.all()

    def to_representation(self, team):
        return team.name
    
    def to_internal_value(self, uuid):
        try:
            return get_object_or_404(self.get_queryset(), pk=uuid)
        except Http404:
            raise serializers.ValidationError({'team': f'Team with"{uuid}" not found'})


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']


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
        fields = ['name', 'description', 'projects', 'members', 'uuid']


class MilestoneSerializer(serializers.ModelSerializer):
    tasks = serializers.StringRelatedField(source='task_set', many=True, required=False)
    
    class Meta:
        model = Milestone
        fields = ['name', 'description', 'tasks', 'query_id']
        depth = 1


class ProjectSerializer(serializers.ModelSerializer):
    team = TeamField()
    milestones = MilestoneSerializer(source='milestone_set', many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['name', 'team', 'description', 'milestones', 'uuid']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description']
