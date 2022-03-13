import filecmp

from django.http import FileResponse
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
            return last.query_id + 1
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
            temp_serializer = FileSerializer(data=request.data)
            if temp_serializer.is_valid():
                temp_serializer.save(project=project, query_id=0)
            tmp_file_ptr = get_object_or_404(project.file_set, query_id=0)
            tmp_path = tmp_file_ptr.file.path
            if not filecmp.cmp(tmp_path, rev_file.file.path, shallow=True):
                tmp_file_ptr.delete()
                f_tmp = open(rev_file.file.path, 'rb')
                FILE = FileObject(f_tmp)
                serializer = RevSerializer(data={'name': rev_file.name, 'parent': rev_file.pk, 'file': FILE, 'mimetype': rev_file.mimetype})
                if not serializer.is_valid():
                    print(serializer.errors)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                serializer.save(revision=self.__get_revision__(rev_file))
                FILE.close()
                rev_file.file.delete()
                serializer = FileSerializer(rev_file, data=request.data)
                if serializer.is_valid():
                    serializer.save(query_id=self.__get_file_id__(project))
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
<<<<<<< HEAD
            tmp_file_ptr.delete()
            return Response({"result": "file already exists and its contents are the same"}, status=status.HTTP_400_BAD_REQUEST)
=======
            serializer.save(revision=self.__get_revision__(rev_file))
            FILE.close()
            rev_file.file.delete()
            serializer = FileSerializer(rev_file, data=request.data)
            if serializer.is_valid():
                serializer.save(query_id=self.__get_file_id__(project))
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 302ac92eb097925b7927215a0d082242acc0cdc8
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


class FileDownload(APIView):
    def get(self, request, pk, fk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        return FileResponse(file.file, as_attachment=True)


class RevList(APIView):
    def get(self, request, pk, fk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        serializer = RevSerializer(file.rev_set.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RevDetail(APIView):
    def get(self, request, pk, fk, rk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        rev = file.rev_set.filter(revision=rk)
        serializer = RevSerializer(rev, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, pk, fk, rk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        rev = file.rev_set.filter(revision=rk)
        rev.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RevDownload(APIView):
    def get(self, request, pk, fk, rk, format=None):
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        rev = file.rev_set.filter(revision=rk)[0]
        return FileResponse(rev.file, as_attachment=True)




