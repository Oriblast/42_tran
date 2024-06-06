from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def index(request):
    return render(request, 'pong/index.html')

@csrf_exempt
def score(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Logique pour mettre à jour les scores dans la base de données
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'failed'})
