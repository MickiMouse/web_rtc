from django.urls import path
from .consumers import Consumer, Checker

websocket_urlpatterns = [
    path('ws/conversation/<int:id>/', Consumer),
    path('ws/online/', Checker)
]
