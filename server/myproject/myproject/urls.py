from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from people.views import PersonViewSet

router = DefaultRouter()
router.register(r'people', PersonViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
