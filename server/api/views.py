from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.serializers import TeamSerializer, ProjectSerializer, MilestoneSerializer, TaskSerializer, UserSerializer
from api.models import Team, Project, Milestone, Task, User
from api import serializers


class TeamList(APIView):
    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, pk, format=None):
        team = get_object_or_404(Team, pk=pk)
        serializer = TeamSerializer(team)
        return Response(serializer.data)


class ProjectList(APIView):
    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetail(APIView):
    def get(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)


class MilestoneList(APIView):
    def get(self, request, format=None):
        milestones = Milestone.objects.all()
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data)


class MilestoneDetail(APIView):
    def get(self, request, pk, format=None):
        milestone = get_object_or_404(Milestone, pk=pk)
        serializer = MilestoneSerializer(milestone)
        return Response(serializer.data)


class TaskList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class TaskDetail(APIView):
    def get(self, request, pk, format=None):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)


class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        print(users)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
