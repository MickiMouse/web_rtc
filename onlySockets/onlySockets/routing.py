from channels.routing import ProtocolTypeRouter, URLRouter
from channels.sessions import SessionMiddlewareStack
from fuck.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    'websocket': SessionMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    )
})
