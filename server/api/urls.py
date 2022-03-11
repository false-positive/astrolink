from django.urls import URLPattern, path

from api import views

urlpatterns = [
    path('users', views.UserList.as_view(), name='users'),
]
