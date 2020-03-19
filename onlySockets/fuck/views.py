from django.db.models import Q
from django.http import HttpResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from . import serializers
from rest_framework import (
    generics, permissions, status
)

User = get_user_model()


def room(request, token, id):
    return HttpResponse('ok!')


def online(request):
    return HttpResponse('ok!')


class TokenCreateAPIView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'id': user.id})


class TokenDestroyAPIView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.auth_token


class FriendList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(~Q(id=self.request.user.id))
        return queryset


class Subscribe(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        self.request.user.subscribe(request.data.get('id'))
        return Response({'detail': 'Subscribe success'},
                        status=status.HTTP_200_OK)
