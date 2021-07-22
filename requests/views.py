from requests.models import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .serializers.common import RequestSerializer

class RequestListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data["owner"] = request.user.id
        request_to_create = RequestSerializer(data=request.data)
        if request_to_create.is_valid():
            request_to_create.save()
            return Response(request_to_create.data, status=status.HTTP_201_CREATED)
        return Response(request_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class RequestDetailedView(APIView):

    def get_request(self, pk):
        try:
            return Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            raise NotFound(detail="🆘 That pet cannot be found! 🆘")

    def get(self, _request, pk):
        request = self.get_request(pk=pk)
        serialized_request = RequestSerializer(request)
        return Response(serialized_request.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            request_to_delete = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            raise NotFound(detail="Request not found")
        if request_to_delete.owner != request.user:
            raise PermissionDenied()
        request_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        request_to_edit = self.get_request(pk=pk)
        updated_request = RequestSerializer(request_to_edit, data=request.data)
        if updated_request.is_valid():
            updated_request.save()
            return Response(updated_request.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_request.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        