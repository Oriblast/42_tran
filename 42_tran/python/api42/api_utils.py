from urllib import request, parse
import json

def get_access_token(client_id, client_secret):
    token_url = "https://api.intra.42.fr/oauth/token"
    data = parse.urlencode({
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }).encode()
    req = request.Request(token_url, data=data, method='POST')
    try:
        with request.urlopen(req) as response:
            response_data = response.read()
            if response.status == 200:
                token_info = json.loads(response_data.decode('utf-8'))
                return token_info.get('access_token')
            else:
                print(f"Réponse non réussie de l'API Token: {response.status}")
                return None
    except Exception as e:
        print(f"Erreur lors de la récupération du token: {e}")
        return None


def get_api_42_data(access_token, endpoint):
    url = f"https://api.intra.42.fr/v2/{endpoint}"
    headers = {'Authorization': f'Bearer {access_token}'}
    req = request.Request(url, headers=headers)
    try:
        with request.urlopen(req) as response:
            if response.status == 200:
                response_data = response.read()
                return json.loads(response_data.decode('utf-8'))
            else:
                return None
    except Exception as e:
        print(f"Erreur lors de la requête API: {e}")
        return None

