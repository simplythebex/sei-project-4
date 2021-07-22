from animals.serializers.common import AnimalSerializer
from .common import ActivitySerializer

class PopulatedActivitySerializer(ActivitySerializer):
    animals = AnimalSerializer(many=True)