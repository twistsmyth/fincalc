from rest_framework import routers
from .api import FinViewSet

router = routers.DefaultRouter()
router.register('api/fin', FinViewSet, 'fin')

urlpatterns = router.urls