# Utiliser une image de base officielle de Python
FROM python:3.9

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY . /app

# Installer les dépendances
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Définir les variables d'environnement
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Exposer le port utilisé par l'application Django
EXPOSE 8000

# Commande à exécuter pour démarrer l'application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app.wsgi:application"]
