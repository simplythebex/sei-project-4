from animals.serializers.common import AnimalSerializer
from jwt_auth.serializers.common import UserSerializer
from .common import RequestSerializer
from animals.serializers.common import AnimalSerializer

class PopulatedRequestSerializer(RequestSerializer):
    owner = UserSerializer()
    animal = AnimalSerializer(many=True)
    