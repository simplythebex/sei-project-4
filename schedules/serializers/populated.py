from animals.serializers.common import AnimalSerializer
from .common import ScheduleSerializer

class PopulatedScheduleSerializer(ScheduleSerializer):
    animals = AnimalSerializer(many=True)