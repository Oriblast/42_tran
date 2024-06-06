import os
from pathlib import Path
import hvac

BASE_DIR = Path(__file__).resolve().parent.parent

# Chargement des variables d'environnement pour la configuration de Django
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-j!k(#evp33l5aj+5f(9d+^6h(g_h-%^ahc6r$$n2oyx9k!z6(kt')
DEBUG = int(os.environ.get('DJANGO_DEBUG', default=1))
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost').split(' ')

# Configuration de Vault pour la gestion des secrets
try:
    client = hvac.Client(
        url=os.getenv('VAULT_ADDR', 'http://localhost:8200'),  # Valeur par défaut pour le développement local
        token=os.getenv('VAULT_TOKEN', 'root')  # Utilisation d'une variable d'environnement pour le token
    )
    secret = client.secrets.kv.read_secret_version(path='django')
    VAULT_SECRET_KEY = secret['data']['data']['SECRET_KEY']
    DB_NAME = secret['data']['data']['DB_NAME']
    DB_USER = secret['data']['data']['DB_USER']
    DB_PASSWORD = secret['data']['data']['DB_PASSWORD']
except Exception as e:
    print(f"Erreur lors de la connexion à Vault: {e}")
    VAULT_SECRET_KEY = SECRET_KEY  # Utiliser la clé par défaut si Vault n'est pas accessible
    DB_NAME = os.getenv('DB_NAME', 'app')
    DB_USER = os.getenv('DB_USER', 'groot')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '@dmin')

INSTALLED_APPS = [
    ...
    'pong',
]


SECRET_KEY = VAULT_SECRET_KEY

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'