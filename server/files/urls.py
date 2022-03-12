from django.urls import include, path

from files import views

urlpatterns = [
    path('', views.FileList.as_view(), name='listfiles'),
    path('<int:fk>/', views.FileDetail.as_view(), name='filedetail'),
]
