from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('login/', views.TokenCreateAPIView.as_view(), name='login'),
    path('logout/', views.TokenDestroyAPIView.as_view(), name='logout'),
    path('conversation/<str:token>/<int:id>/', views.room, name='room'),
    path('friends/', views.FriendList.as_view(), name='friends'),
]
