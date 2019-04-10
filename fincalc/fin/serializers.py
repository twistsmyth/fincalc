from rest_framework import serializers
from fin.models import Fin

# Fin Serializer

class FinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fin
        fields = '__all__'