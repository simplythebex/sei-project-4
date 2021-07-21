from requests.serializers.common import RequestSerializer
from .common import AnimalSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    requests = RequestSerializer(many=True)

