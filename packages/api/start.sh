#!/bin/bash

# Lancer le conteneur MongoDB
docker-compose up -d

# Attendre que MongoDB soit prêt (optionnel)
sleep 5

# Démarrer l'application Node.js
node server.js
