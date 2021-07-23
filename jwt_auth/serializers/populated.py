from .profile import ProfileSerializer
from animals.serializers.common import AnimalSerializer
from activities.serializer.common import ActivitySerializer
from schedules.serializers.common import ScheduleSerializer

class PopulatedUserSerializer(ProfileSerializer):
    animals = AnimalSerializer(many=True)
    activity = ActivitySerializer(many=True)
    schedule = ScheduleSerializer(many=True)
