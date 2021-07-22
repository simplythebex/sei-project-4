from .common import UserSerializer
from animals.serializers.common import AnimalSerializer
from activities.serializer.common import ActivitySerializer

class PopulatedUserSerializer(UserSerializer):
    animals = AnimalSerializer(many=True)
    activity = ActivitySerializer(many=True)
    