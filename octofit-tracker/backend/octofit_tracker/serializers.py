from __future__ import annotations

from bson import ObjectId
from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        if value is None:
            return None
        return str(value)

    def to_internal_value(self, data):
        if data in (None, ""):
            return None
        try:
            return ObjectId(str(data))
        except Exception as exc:
            raise serializers.ValidationError("Invalid ObjectId") from exc


class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)

    class Meta:
        model = Team
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team_id = ObjectIdField(source="team_id")

    class Meta:
        model = User
        fields = ["id", "name", "email", "team_id"]


class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user_id = ObjectIdField(source="user_id")

    class Meta:
        model = Activity
        fields = ["id", "user_id", "type", "duration"]


class WorkoutSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user_id = ObjectIdField(source="user_id")

    class Meta:
        model = Workout
        fields = ["id", "user_id", "description"]


class LeaderboardSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team_id = ObjectIdField(source="team_id")

    class Meta:
        model = Leaderboard
        fields = ["id", "team_id", "points"]
