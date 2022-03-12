from django.urls import include, path

from api import views

urlpatterns = [
    path('users', views.UserList.as_view(), name='users'),
    path('users/<uuid:pk>', views.UserDetail.as_view(), name='userdetail'),
    path('teams', views.TeamList.as_view(), name='teams'),
    path('teams/<uuid:pk>', views.TeamDetail.as_view(), name='teamdetail'),
    path('projects', views.ProjectList.as_view(), name='projects'),
    path('projects/<uuid:pk>', views.ProjectDetail.as_view(), name='projectdetail'),
    path('projects/<uuid:pk>/milestones', views.MilestoneList.as_view(), name='milestones'),
    path('projects/<uuid:pk>/milestones/<int:mk>', views.MilestoneDetail.as_view(), name='milestones'),
    path('tasks', views.TaskList.as_view(), name='tasks'),
    path('files/', include('files.urls'), name='files'),
]
