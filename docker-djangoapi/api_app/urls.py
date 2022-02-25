from django.urls import path
from .views import CartItemViews,BaseballStatViews

urlpatterns = [
    path('cart-items/', CartItemViews.as_view()),
    path('cart-items/<int:id>', CartItemViews.as_view()),
    path('bball-stats/', BaseballStatViews.as_view()),
    path('bball-stats/<int:id>', BaseballStatViews.as_view())
]