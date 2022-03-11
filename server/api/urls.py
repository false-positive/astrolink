from django.urls import include, path

from api import views

urlpatterns = [
    path('users', views.UserList.as_view(), name='users'),
    path('teams', views.TeamList.as_view(), name='teams'),
    path('projects', views.ProjectList.as_view(), name='projects'),
    path('milestones', views.MilestoneList.as_view(), name='milestones'),
    path('tasks', views.TaskList.as_view(), name='tasks'),
    path('files/', include('files.urls'), name='files'),
]
