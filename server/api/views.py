from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser

from api.serializers import TeamSerializer, ProjectSerializer, MilestoneSerializer, TaskSerializer
from api.models import Team, Project, Milestone, Task

class TeamList(APIView):
    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

class ProjectList(APIView):
    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
        
class MilestoneList(APIView):
    def get(self, request, format=None):
        milestones = Milestone.objects.all()
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data)
        
class TaskList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = ProjectSerializer(tasks, many=True)
        return Response(serializer.data)

from api.serializers import UserSerializer

from api.models import User

class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        print(users)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
