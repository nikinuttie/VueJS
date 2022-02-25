from email.policy import default
from rest_framework import serializers
from .models import CartItem,BaseballStat

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(max_length=200)
    product_price = serializers.FloatField()
    product_quantity = serializers.IntegerField(required=False, default=1)
    product_type = serializers.CharField(max_length=50,default='Home')
    product_priority = serializers.CharField(max_length=10,default='Low')
    product_date_created = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = CartItem
        fields = ('__all__')

class BaseballStatSerializer(serializers.ModelSerializer):
    player_name = serializers.TextField()
    team_name = serializers.TextField()
    position = serializers.TextField()
    player_age = serializers.PositiveIntegerField()
    games_played = serializers.PositiveIntegerField()
    at_bats = serializers.PositiveIntegerField()
    runs = serializers.PositiveIntegerField()
    home_runs = serializers.PositiveIntegerField()
    rbi = serializers.PositiveIntegerField()

    class Meta:
        model = BaseballStat
        fields = ('__all__')