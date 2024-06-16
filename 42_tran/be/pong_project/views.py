# views.py

from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount.models import SocialLogin, SocialToken, SocialApp
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class FortyTwoOAuth2Adapter(OAuth2Adapter):
    provider_id = '42'

    def complete_login(self, request, app, token, response):
        extra_data = token.get('extra_data', {})
        login = self.get_provider().sociallogin_from_response(request, extra_data)
        return login

class FortyTwoLogin(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        app = SocialApp.objects.get(provider='42')
        redirect_uri = '<your-redirect-uri>'
        token = SocialToken(app=app, token='<access-token>', token_secret='<secret-token>')
        login = SocialLogin(account=None, token=token)
        login.state = SocialLogin.state_from_request(request)
        login.save(request, connect=True)
        return Response({'detail': 'Successfully authenticated.'})
