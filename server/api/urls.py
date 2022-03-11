from django.urls import URLPattern, path

from api import views

urlpatterns = [
    path('test', views.ListFile.as_view(), name='test4')
]
