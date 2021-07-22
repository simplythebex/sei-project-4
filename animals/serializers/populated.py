from requests.serializers.populated import PopulatedRequestSerializer
from .common import AnimalSerializer
from activities.serializer.common import ActivitySerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    requests = PopulatedRequestSerializer(many=True)
    owner = UserSerializer()
    activity = ActivitySerializer(many=True)
