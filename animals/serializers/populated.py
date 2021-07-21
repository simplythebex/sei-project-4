from requests.serializers.populated import PopulatedRequestSerializer
from .common import AnimalSerializer
from jwt_auth.serializer import UserSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    requests = PopulatedRequestSerializer(many=True)
    owner = UserSerializer()

