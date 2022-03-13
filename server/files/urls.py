from django.urls import include, path

from files import views

urlpatterns = [
    path('', views.FileList.as_view(), name='listfiles'),
    path('<int:fk>/', views.FileDetail.as_view(), name='filedetail'),
    path('<int:fk>/download', views.FileDownload.as_view(), name='filedownload'),
    path('<int:fk>/revisions', views.RevList.as_view(), name='listrevisions'),
    path('<int:fk>/revisions/<int:rk>/', views.RevDetail.as_view(), name='revisiondetail'),
    path('<int:fk>/revisions/<int:rk>/download', views.RevDownload.as_view(), name='revdownload')
]
