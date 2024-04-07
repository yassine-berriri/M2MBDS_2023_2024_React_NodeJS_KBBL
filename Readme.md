# 2024 MBDS project PixelBoard

## Introduction
this is a mono-repo project for the 2024 MBDS project PixelBoard. It contains the following packages:
- `client`: the frontend of the project
- `api`: the backend of the project

You can use this skeleton to start your project.    
You have to edit the root package.json file : 
- replace the name property (replace xxxx by the first letter of each member of your group)
- set the repository by setting the url of your project  


## Installation
To install the project, you need to clone the repository and install the dependencies. You can do this by running the following commands in the root directory of the project:
``` js
yarn
```

## Usage
To start the project, you need to run the following commands in the root directory of the project (in two separate terminals):
``` js
yarn start:client 
```
*call start script in ./packages/client package.json (to start the react client)*  

``` js
yarn start:api 
```
*call start script in ./packages/api package.json (to start the api)*


## Adding libraries

If you want to add library you can use the following commands (in the root directory of the project) :
``` js
yarn workspace <client|api> add <package-name> 
```
For example to add `express` to the api package you can run:
``` js
yarn workspace api add express
```
fortawesome
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

For example to add a librairy for devDependencies to the client package you can run:
``` js
yarn workspace client add -D <package-name>
```


## Test de la base de données MongoDB avec Docker
 

1/ Positionnez-vous dans le répertoire du service API : cd packages/api

2/ Lancez votre conteneur Docker avec docker-compose : docker-compose -d 

3/ Vérifiez l'état de vos conteneurs Docker et
   Pour récupérer l'ID de conteneur MongoDB, exécutez : docker ps 

4/ Accédez au shell MongoDB : docker exec -it [id_contenaire] mongosh -u yassineberriri -p vHBIl1JGB46EUnlq --authenticationDatabase admin 

5/ Affichez les bases de données disponibles : show dbs

6/ Sélectionnez la base de données : use test

7/ Affichez les collections : show collections

8/ Interrogez une collection : db.pixelboards.find()

9/ Sortie de MongoDB Shell : exit

## Migration des données de MongoDB Atlas vers la base de données dans Docker


1/ Installer mongorestore

2/  Configurer Docker Compose:
    Ajouter dans docker-compose  
     volumes:
      - mongodb_data_container:/data/db
      - D:/mongoRestore/mongoMigration:/mongoMigration

3/ Exporter les données depuis MongoDB Atlas:
mongodump --uri="mongodb+srv://yassineberriri:vHBIl1JGB46EUnlq@cluster0.axncp8h.mongodb.net/" --collection=pixelboards --collection=users --db=MBDS --out= PathLocale

4/ Restaurer les données dans Docker: 
    docker exec -it [id_contenaire] mongorestore --uri="mongodb://yassineberriri:vHBIl1JGB46EUnlq@localhost:27017/" mongoMigration/
    




