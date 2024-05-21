from django.urls import path
from api42 import views
from .views import api42_data, home_view

urlpatterns = [
    path('', views.home_view, name='home'),
    path('data', api42_data, name='api42_data'),
    # path('api/users/<str:username>/', views.api42_data, name='api42_data'),
]