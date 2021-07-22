from requests.serializers.populated import PopulatedRequestSerializer
from .common import AnimalSerializer
from activities.serializer.common import ActivitySerializer
from jwt_auth.serializers.common import UserSerializer
from schedules.serializers.common import ScheduleSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    requests = PopulatedRequestSerializer(many=True)
    owner = UserSerializer()
    activity = ActivitySerializer(many=True)
    schedule = ScheduleSerializer(many=True)
