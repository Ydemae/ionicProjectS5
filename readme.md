# ionicProjetS5

Auteur : Arthur Maloron

Ce projet est mené dans le cadre du cours de développement multimédia de M.Girard

## Environnement

Afin de faire fonctionner le projet correctement, l'environnement doit être mis en place.

Pour cela, il vous faut tout d'abord **un serveur local avec une BDD MySQL**, sur lequel vous pourrez créer une database que vous remplirez à l'aide du script script.sql à la racine du projet.

Une fois cela fait, vous pourrez modifier les données de connection à la base de données présentes au chemin /backend/.env

## Installation

Pour installer le projet, placez vous à la racine du projet et entrez les commandes dans cet ordre.
Si vous ne voulez pas vous occuper de l'installation, vous pouvez lancer les scripts bat setup.bat (pour l'installation) et run.bat (pour le lancement de l'app).

En cas de problèmes avec l'installation, essayez d'installer globalement les outils suivants:
- Ionic 7.2.0
- Angular 18.2.12
- Nest 10.4.9

### Installation des dépendances
```
cd ./backend

npm install

cd ../Frontend

npm install
```

### Lancement de l'app

```
cd ./backend

nest start
```

Dans un autre terminal
```
cd ./Frontend

ionic serve
```