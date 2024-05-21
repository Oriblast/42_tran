#!/bin/bash
set -e

while ! nc -z db 5432; do
  echo "Attente du démarrage de la base de données PostgreSQL..."
  sleep 5
done

python manage.py makemigrations
python manage.py migrate

python manage.py shell < create_superuser.py

# Démarrer le serveur Django avec livereload
# REMOOVE livereload pour la prod
python manage.py livereload & python manage.py runserver 0.0.0.0:${DJANGO_PORT}
