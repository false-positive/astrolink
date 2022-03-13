from django.urls import include, path

from api import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/', views.UserList.as_view(), name='users'),
    path('users/<uuid:pk>/', views.UserDetail.as_view(), name='userdetail'),

    path('teams/', views.TeamList.as_view(), name='teams'),
    path('teams/<uuid:pk>/', views.TeamDetail.as_view(), name='teamdetail'),

    path('projects/', views.ProjectList.as_view(), name='projects'),
    path('projects/<uuid:pk>/', views.ProjectDetail.as_view(), name='projectdetail'),
    path('projects/<uuid:pk>/milestones/',
         views.MilestoneList.as_view(), name='milestones'),
    path('projects/<uuid:pk>/milestones/<int:mk>/',
         views.MilestoneDetail.as_view(), name='milestone_detail'),

    path('projects/<uuid:pk>/files/', include('files.urls'), name='files'),

    path('projects/<uuid:pk>/milestones/<int:mk>/tasks/',
         views.TaskList.as_view(), name='tasks'),

    path('files/', include('files.urls'), name='files'),

    path('users/login/', obtain_auth_token, name='login'),
    path('users/me/', views.UserAuthToken.as_view(), name='get_token'),
]
