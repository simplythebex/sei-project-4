from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Animal
from .serializers.common import AnimalSerializer
from .serializers.populated import PopulatedAnimalSerializer

class AnimalListView(APIView):
    def get(self, _request):
        animals = Animal.objects.all()
        serialized_animals = PopulatedAnimalSerializer(animals, many=True)
        return Response(serialized_animals.data, status=status.HTTP_200_OK)

    def post(self, request):
        print('REQUEST DATA', request.data)
        animal_to_add = AnimalSerializer(data=request.data)
        if animal_to_add.is_valid():
            animal_to_add.save()
            return Response(animal_to_add.data, status=status.HTTP_201_CREATED)
        return Response(animal_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class AnimalDetailView(APIView):

    def get_animal(self, pk):
        try:
            return Animal.objects.get(pk=pk)
        except Animal.DoesNotExist:
            raise NotFound(detail="🆘 that pet cannot be found! 🆘")

    def get(self, _request, pk):
        animal = self.get_animal(pk=pk)
        serialized_animal = PopulatedAnimalSerializer(animal)
        return Response(serialized_animal.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        animal_to_delete = self.get_animal(pk=pk)
        animal_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        animal_to_edit = self.get_animal(pk=pk)
        updated_animal = AnimalSerializer(animal_to_edit, data=request.data)
        if updated_animal.is_valid():
            updated_animal.save()
            return Response(updated_animal.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_animal.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)