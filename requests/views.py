from requests.models import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import RequestSerializer

class RequestListView(APIView):

    def post(self, request):
        request_to_create = RequestSerializer(data=request.data)
        if request_to_create.is_valid():
            request_to_create.save()
            return Response(request_to_create.data, status=status.HTTP_201_CREATED)
        return Response(request_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class RequestDetailedView(APIView):
    def delete(self, _request, pk):
        try:
            request_to_delete = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            raise NotFound(detail="Request not found")
        request_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)