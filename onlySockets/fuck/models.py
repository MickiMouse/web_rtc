from django.db import models
from django.contrib.auth.models import AbstractUser


class FuckUser(AbstractUser):
    friends = models.ManyToManyField("self")

    def subscribe(self, user):
        self.friends.add(user)

    def unsubscribe(self, user):
        self.friends.remove(user)


class Conversation(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=256)
    users = models.ManyToManyField(FuckUser)


class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    user = models.ForeignKey(
        FuckUser, on_delete=models.CASCADE,
        related_name='message_set', null=True
    )
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE,
        related_name='messages'
    )

    class Meta:
        ordering = ['created']
