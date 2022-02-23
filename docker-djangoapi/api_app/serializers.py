from email.policy import default
from rest_framework import serializers
from .models import CartItem

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