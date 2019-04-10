from fin.models import Fin 
from rest_framework import viewsets, permissions
from .serializers import FinSerializer

 # Fin Viewset

class FinViewSet(viewsets.ModelViewSet):
    queryset = Fin.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FinSerializer