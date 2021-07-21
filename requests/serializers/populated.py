from jwt_auth.serializer import UserSerializer
from .common import RequestSerializer

class PopulatedRequestSerializer(RequestSerializer):
    owner = UserSerializer()
    