from .common import UserSerializer
from animals.serializers.common import AnimalSerializer
from activities.serializer.common import ActivitySerializer
from schedules.serializers.common import ScheduleSerializer

class PopulatedUserSerializer(UserSerializer):
    animals = AnimalSerializer(many=True)
    activity = ActivitySerializer(many=True)
    schedule = ScheduleSerializer(many=True)
