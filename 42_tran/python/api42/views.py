from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from .api_utils import get_access_token, get_api_42_data
from django.conf import settings

# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status



def home_view(request):
    return HttpResponse("Bienvenue sur ma page d'accueil!")

def token_error_view(request):
    return render(request, 'token_error.html')

def api42_data(request):
    client_id = settings.FORTYTWO_API_UID
    client_secret = settings.FORTYTWO_API_SECRET
    access_token = get_access_token(client_id, client_secret)
    
    if access_token:
        endpoint = 'users/abeaugra'
        user_info = get_api_42_data(access_token, endpoint)
        if user_info:
            # Filtrer les données
            filtered_data = {
                'username': user_info['login'],
                'first_name': user_info['first_name'],
                'last_name': user_info['last_name'],
                'photo_url': user_info['image']['versions']['small']  # Lien de l'image en format 'small'
            }
            return JsonResponse(filtered_data)
        else:
            return HttpResponse("Erreur lors de la récupération des données utilisateur.")
    else:
        return HttpResponse("Erreur d'authentification avec l'API 42.")



# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def api42_data(request, username):
#     client_id = settings.FORTYTWO_API_UID
#     client_secret = settings.FORTYTWO_API_SECRET
#     access_token = get_access_token(client_id, client_secret)

#     if access_token:
#         endpoint = f'users/{username}'  # Construire l'endpoint avec le username
#         user_info = get_api_42_data(access_token, endpoint)
#         if user_info:
#             # Filtrer les données
#             filtered_data = {
#                 'username': user_info['login'],
#                 'first_name': user_info['first_name'],
#                 'last_name': user_info['last_name'],
#                 'photo_url': user_info['image']['versions']['small']
#             }
#             return JsonResponse(filtered_data)
#         else:
#             return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)
#     else:
#         return Response({"error": "Erreur d'authentification avec l'API 42"}, status=status.HTTP_401_UNAUTHORIZED)
