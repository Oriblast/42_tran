from django.contrib import admin

from .models import User, Game, PlayerScore, PlayerStats


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('password',)

    def get_username(self, obj):
        return obj.username

    def get_list_display(self, request):
        return (self.get_username, 'email', 'is_active')

    def password(self, obj):
        return '*' * len(obj.password)

    password.allow_tags = False
    password.short_description = 'Password'
    list_display = ('username', 'email', 'is_active')
    list_filter = ('due_date','is_active',)
    search_fields = ('username', 'email')


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'player_1', 'player_2', 'status')
    fields = ('start_date', 'player_1', 'player_2', 'status')


@admin.register(PlayerScore)
class PlayerScoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'game', 'player', 'score')
    fields = ('game', 'player', 'score')


@admin.register(PlayerStats)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display = ('id', 'player', 'games_played', 'wins', 'losses', 'win_rate')
    fields = ('player', 'games_played', 'wins', 'losses', 'win_rate')
