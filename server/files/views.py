import os
import filecmp
import shutil
import gzip


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
            
            tmp_query_id = self.__get_file_id__(project)
            if temp_serializer.is_valid():
                temp_serializer.save(project=project, query_id=tmp_query_id)
            

            tmp_file_ptr = get_object_or_404(project.file_set, query_id=tmp_query_id)
            tmp_path = tmp_file_ptr.file.path
            
            if not filecmp.cmp(tmp_path, rev_file.file.path, shallow=True):
                tmp_file_ptr.delete()

                f_tmp =  open(rev_file.file.path, 'rb')
                raw_name = rev_file.name.replace(rev_file.name.split('.', 10)[-1], '')
                zipped_file = gzip.open(raw_name + 'gz', 'wb', compresslevel=5)
                shutil.copyfileobj(f_tmp, zipped_file)
                f_tmp.close()
                zipped_file.close()
                zipped_file = open(raw_name + 'gz', 'rb')

                FILE = FileObject(zipped_file)
                serializer = RevSerializer(data={'name': rev_file.name, 'parent': rev_file.pk, 'file': FILE, 'mimetype': rev_file.mimetype})
                
                if not serializer.is_valid():
                    print(serializer.errors)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
                serializer.save(revision=self.__get_revision__(rev_file))
                os.remove(raw_name + 'gz')
                zipped_file.close()
                FILE.close()
                rev_file.file.delete()
                serializer = FileSerializer(rev_file, data=request.data)
                
                if serializer.is_valid():
                    serializer.save(query_id=self.__get_file_id__(project))
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            tmp_file_ptr.delete()
            return Response({"result": "file already exists and its contents are the same"}, status=status.HTTP_400_BAD_REQUEST)
        
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
        shutil.rmtree('./files/media/temp')
        os.mkdir('./files/media/temp')
        project = get_object_or_404(Project, pk=pk)
        file = get_object_or_404(project.file_set.all(), query_id=fk)
        rev = file.rev_set.filter(revision=rk)[0]
        ret_file_ptr = open('files/media/temp/' + rev.name, 'wb+')
        ret_data_ptr = gzip.open(rev.file.path, 'rb+', compresslevel=5)
        shutil.copyfileobj(ret_data_ptr, ret_file_ptr)
        ret_data_ptr.close()
        ret_file_ptr.seek(0)
        FILE = FileObject(ret_file_ptr)
        return FileResponse(FILE,  as_attachment=True)




