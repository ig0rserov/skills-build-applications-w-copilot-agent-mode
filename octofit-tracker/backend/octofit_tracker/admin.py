from django.contrib import admin

from .models import Activity, Leaderboard, Team, User, Workout

admin.site.register(Team)
admin.site.register(User)
admin.site.register(Activity)
admin.site.register(Workout)
admin.site.register(Leaderboard)
