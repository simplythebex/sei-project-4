from activities.serializer.populated import PopulatedActivitySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status

from .serializer.common import ActivitySerializer
from .serializer.populated import PopulatedActivitySerializer
from .models import Activity

class ActivityListView(APIView):

    def get(self, _request):
        activities = Activity.objects.all()
        serialized_activities = PopulatedActivitySerializer(activities, many=True)
        return Response(serialized_activities.data, status=status.HTTP_200_OK)
