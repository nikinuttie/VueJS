from django.db import models

# Create your models here.
class CartItem(models.Model):
    
    product_name = models.CharField(max_length=200)
    product_price = models.FloatField()
    product_quantity = models.PositiveIntegerField()
    product_type = models.CharField(max_length=50,default='Home')
    product_priority = models.CharField(max_length=10,default='Low')
    product_date_created = models.DateField(auto_now=True)