from schedules.serializers.populated import PopulatedScheduleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status

from .serializers.common import ScheduleSerializer
from .serializers.populated import PopulatedScheduleSerializer
from .models import Schedule

class ScheduleListView(APIView):
    def get(self, _request):
        schedules = Schedule.objects.all()
        serialized_schedules = PopulatedScheduleSerializer(schedules, many=True)
        return Response(serialized_schedules.data, status=status.HTTP_200_OK)