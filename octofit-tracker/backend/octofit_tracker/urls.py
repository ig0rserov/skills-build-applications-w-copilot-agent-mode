"""octofit_tracker URL Configuration."""

import os

from django.contrib import admin
from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.routers import DefaultRouter

from .views import ActivityViewSet, LeaderboardViewSet, TeamViewSet, UserViewSet, WorkoutViewSet


router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'users', UserViewSet, basename='user')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutViewSet, basename='workout')


codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"


@api_view(['GET'])
def api_root(request, format=None):
    return Response(
        {
            'base_url': base_url,
            'teams': reverse('team-list', request=request, format=format),
            'users': reverse('user-list', request=request, format=format),
            'activities': reverse('activity-list', request=request, format=format),
            'leaderboard': reverse('leaderboard-list', request=request, format=format),
            'workouts': reverse('workout-list', request=request, format=format),
        }
    )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='root'),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
