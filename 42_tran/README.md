## Attribution des Modules

| Nom    | Modules Mineurs |  Modules Majeurs | Modules Obligatoires        |
|--------|-----------------|------------------|-----------------------------|
| Jeremy | 1               | 2                | Tournoi                     |
| Axel   | 3               | 1                | Docker - Https - secu       |
| Nours  | 1               | 2                | Nav Google                  |
| Yass   | 1               | 2                | Docker                      |

## Jeremy
### Modules Majeurs
- Joueur multiple
- Adversaire contrôlé par IA
### Modules Mineurs
- Personnalisation du jeux

## Yassine
### Modules Majeurs
- Monitoring
### Modules Mineurs
- Back
- BDD

## Axel
### Modules Majeurs
- Monitoring
### Modules Mineurs
- Front
- BDD
- Monitoring

## Nours
### Modules Majeurs
- Implémenter une authentification à distance.
- Backend
### Modules Mineurs
- Front


<!-- 

show user name in postgres
docker-compose exec django python manage.py shell -c "import os; print(os.environ.get('POSTGRES_USER'))"

check if psql is installed
docker-compose exec django sh

check connexion in postgres
docker-compose exec db psql -U groot -d app

show list table
\l

select db
\c app

show list table
\dt

show table
SELECT * FROM nom_de_la_table;

show IP container 
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pgadmin 


Fixer le README sur projet PYTHON 
/home/groot/trans/django/dev/backend


Pour voir tous les ports ouvert
sudo netstat -tulnp

supprimer un processus qui utilise un port
kill number_port

ip route | grep default
recuperer adress ip


JSON
username
lien photo
nom
prenom



-->
