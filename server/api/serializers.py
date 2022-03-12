from re import search
from wsgiref import validate
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


class WriteTeamSerializer(serializers.ModelSerializer):
    projects = serializers.StringRelatedField(source='project_set',many=True, required=False)


    def __get_members(self, member_ids):
        members = []
        for member_id in member_ids:
            member = get_object_or_404(User, pk=member_id)
            print("heree")
            members.append(member)
        return members

    def create(self, validated_data):
        members_data = validated_data.pop('members')
        team = Team.objects.create(**validated_data)
        team.members.set(members_data)
        return team


    def update(self, instance, validated_data):
        print(validated_data)
        members_data = validated_data.pop('members')
        fields = ['name', 'description']
        for field in fields:
            try:
                setattr(instance, field, validated_data[field])
                print("success!")
            except KeyError:
                pass
        instance.members.set(members_data)
        
        instance.save()
        return instance

    class Meta:
        model = Team
        fields = ['name', 'description', 'projects', 'members', 'uuid']


class ReadTeamSerializer(serializers.ModelSerializer):
    projects = serializers.StringRelatedField(source='project_set',many=True, required=False)
    members = UserSerializer(many=True, read_only=True)
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
    files = serializers.StringRelatedField(source='file_set', many=True)
    
    class Meta:
        model = Project
        fields = ['name', 'team', 'description', 'milestones', 'files', 'uuid']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description']
