from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.serializers import TeamWriteSerializer, TeamReadSerializer, ProjectSerializer, MilestoneSerializer, TaskSerializer, UserSerializer, AuthUserSerializer
from api.models import Team, Project, Milestone, Task, User


class TeamList(APIView):
    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamReadSerializer(teams, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TeamWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamDetail(APIView):
    def get(self, request, pk, format=None):
        team = get_object_or_404(Team, pk=pk)
        serializer = TeamReadSerializer(team)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        team = get_object_or_404(Team, pk=pk)
        serializer = TeamWriteSerializer(team, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        team = self.get_object(pk)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProjectList(APIView):
    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        team_id = request.data['team']
        print(team_id)
        team_object = get_object_or_404(Team, uuid=team_id)
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(team=team_object)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetail(APIView):
    def get(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        project = self.get_object(pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MilestoneList(APIView):
    def __get_unique_project_id__(self, project):
        last = project.milestone_set.last()
        if last:
            return last.query_id + 1
        return 1

    def get(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestones = project.milestone_set.all()
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = MilestoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project,
                            query_id=self.__get_unique_project_id__(project))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MilestoneDetail(APIView):
    def get(self, request, pk, mk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestone = get_object_or_404(project.milestone_set.all(), query_id=mk)
        serializer = MilestoneSerializer(milestone)
        return Response(serializer.data)

    def patch(self, request, pk, mk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestone = get_object_or_404(project.milestone_set.all(), query_id=mk)
        serializer = MilestoneSerializer(milestone, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, mk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestone = project.milestone_set.filter(query_id=mk)
        milestone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskList(APIView):
    def __get_unique_task_id__(self, milestone):
        last = milestone.task_set.last()
        if last:
            return last.query_id + 1
        return 1

    def get(self, request, pk, mk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestone = get_object_or_404(project.milestone_set.all(), query_id=mk)
        tasks = milestone.task_set.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, pk, mk, format=None):
        project = get_object_or_404(Project, pk=pk)
        milestone = get_object_or_404(project.milestone_set.all(), query_id=mk)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(milestone=milestone)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get(self, request, pk, mk, tk, format=None):
        project = get_object_or_404(Project, pk=pk)
        task = get_object_or_404(
            project.milestone_set.filter(query_id=mk), query_id=tk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def patch(self, request, pk, mk, tk, format=None):
        project = get_object_or_404(Project, pk=pk)
        task = get_object_or_404(
            project.milestone_set.filter(query_id=mk), query_id=tk)
        serializer = TaskSerializer(task, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, mk, tk, format=None):
        project = get_object_or_404(Project, pk=pk)
        task = get_object_or_404(
            project.milestone_set.filter(query_id=mk), query_id=tk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        print(users)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # TODO fix authentication
        user = User.objects.create_user(
            request.data['first_name'], request.data['last_name'], request.data['email'], request.data['password'])
        user.save()

        return Response({'Result': 'Success'}, status=status.HTTP_201_CREATED)


# class UserLogin(APIView):
#     def post(self, request, format=None):
#         user = authenticate(email=request.data['email'],
#                             password=request.data['password'])
#         if not user:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         login(request, user)

#         token = Token.objects.get(user=user).key

#         return Response({'Result': 'Success'}, status=status.HTTP_201_CREATED)


class UserDetail(APIView):
    def get(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserAuthToken(APIView):
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
