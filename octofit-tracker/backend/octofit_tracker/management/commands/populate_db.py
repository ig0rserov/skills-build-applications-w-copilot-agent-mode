from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models

from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from django.db import connection
        db = connection.cursor().db_conn.client["octofit_db"]
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboards.delete_many({})
        db.workouts.delete_many({})

        # Insert teams
        marvel_id = db.teams.insert_one({"name": "Marvel"}).inserted_id
        dc_id = db.teams.insert_one({"name": "DC"}).inserted_id

        # Insert users
        users = [
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team_id": marvel_id},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team_id": marvel_id},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team_id": dc_id},
            {"name": "Batman", "email": "batman@dc.com", "team_id": dc_id},
        ]
        user_ids = [db.users.insert_one(u).inserted_id for u in users]

        # Insert activities
        activities = [
            {"user_id": user_ids[0], "type": "Running", "duration": 30},
            {"user_id": user_ids[1], "type": "Cycling", "duration": 45},
            {"user_id": user_ids[2], "type": "Swimming", "duration": 60},
            {"user_id": user_ids[3], "type": "Yoga", "duration": 20},
        ]
        db.activities.insert_many(activities)

        # Insert workouts
        workouts = [
            {"user_id": user_ids[0], "description": "5K run"},
            {"user_id": user_ids[1], "description": "HIIT session"},
            {"user_id": user_ids[2], "description": "Pool laps"},
            {"user_id": user_ids[3], "description": "Morning yoga"},
        ]
        db.workouts.insert_many(workouts)

        # Insert leaderboard
        db.leaderboards.insert_many([
            {"team_id": marvel_id, "points": 100},
            {"team_id": dc_id, "points": 90},
        ])

        # Ensure unique index on email
        db.users.create_index("email", unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
