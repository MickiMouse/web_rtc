from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token
from . import models, serializers


class Consumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.conversation = await self.get_or_create_conversation()

        user = self.scope['user']
        print(user)

        if user.is_anonymous:
            await self.close()

        await self.channel_layer.group_add(
            self.conversation,
            self.channel_name
        )
        await self.accept()
        messages = await self.get_messages()
        await self.channel_layer.group_send(
            self.conversation,
            {
                'type': 'message',
                'message': messages
            }
        )

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        await self.save_message(text_data)
        messages = await self.get_messages()
        await self.channel_layer.group_send(
            self.conversation,
            {
                'type': 'message',
                'message': messages
            }
        )

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.conversation,
            self.channel_name
        )

    async def message(self, event):
        message = event['message']
        await self.send_json(content=message)

    @database_sync_to_async
    def get_or_create_conversation(self):
        jwt = self.scope['url_route']['kwargs']['token']
        _id = self.scope['url_route']['kwargs']['id']
        user = Token.objects.get(key=jwt).user
        self.scope['user'] = user
        name = ''.join(sorted([str(user.id), str(_id)],
                              key=lambda x: int(x)))
        conversation, created = models.Conversation.objects.get_or_create(
            name=name)
        if created:
            conversation.users.add(user.id)
            conversation.users.add(_id)
        self.scope['conv'] = conversation
        return conversation.name

    @database_sync_to_async
    def save_message(self, text):
        return models.Message.objects.create(
            text=text,
            user=self.scope['user'],
            conversation=self.scope['conv']
        )

    @database_sync_to_async
    def get_messages(self):
        return serializers.MessageSerializer(
            self.scope['conv'].messages.all(),
            many=True
        ).data
