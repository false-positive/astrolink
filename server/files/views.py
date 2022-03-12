from django.shortcuts import get_object_or_404
from django.core.files.storage import FileSystemStorage
from django.core.files import File as FileObject
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from api.models import Project
from files.models import File
from files.serializers import FileSerializer, RevSerializer


class FileList(APIView):
    def __get_revision__(self, rev_file):
        last = rev_file.rev_set.last()
        if last:
            return last.revision + 1
        return 1


    def __get_file_id__(self, project):
        last = project.file_set.last()
        if last:
            return last.revision + 1
        return 1

    def get(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        files = project.file_set.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        rev_file = project.file_set.filter(name=request.data['name']).first()
        if rev_file:
            f_tmp = open(rev_file.file.path, 'rb')
            FILE = FileObject(f_tmp)
            #FILE.name = '{0}.{1}'.format(rev_file.name, rev_file.extension)
            serializer = RevSerializer(data={'name': rev_file.name, 'parent': rev_file.pk, 'file': FILE, 'extension': rev_file.extension})
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer.save(revision=self.__get_revision__(rev_file))
            FILE.close()
            rev_file.file.delete()
            serializer = FileSerializer(rev_file, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = FileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project, query_id=self.__get_file_id__(project))
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):
    def get(self, request, pk, fk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        serializer = FileSerializer(file)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, pk, fk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)