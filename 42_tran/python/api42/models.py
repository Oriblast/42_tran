from django.db import models


class User(models.Model):
    """
    User 42.
    """

    # forbidden
    username = models.CharField(max_length=255,unique=True)
    id = models.CharField(max_length=255, primary_key=True)
    email = models.EmailField(unique=True)
    due_date = models.DateField()
    # Champs facultatifs
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    token = models.CharField(max_length=255, null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.email

# ------------------------------------------

#               GAME Informations
    
# ------------------------------------------


class Game(models.Model):
    """
    A game from Pong.
    """

    # forbidden
    id = models.CharField(max_length=255, primary_key=True)
    start_date = models.DateTimeField()

    # Champs facultatifs
    player_1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="player_1")
    player_2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="player_2")
    player_1_score = models.IntegerField(default=0)
    player_2_score = models.IntegerField(default=0)
    status = models.CharField(max_length=255, default="in progress")

    def __str__(self):
        return f"Game {self.id}"



class PlayerScore(models.Model):
    """
    Take screenshot of player score.
    """

    # forbidden
    id = models.CharField(max_length=255, primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()

    def __str__(self):
        return f"Scrore from player {self.player} in the game {self.game}"



class PlayerStats(models.Model):
    """
    Stats from players.
    """

    # forbidden
    id = models.CharField(max_length=255, primary_key=True)
    player = models.ForeignKey(User, on_delete=models.CASCADE)

    # Champs facultatifs
    games_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    win_rate = models.FloatField(default=0.0)

    def __str__(self):
        return f"Stats from player {self.player}"
