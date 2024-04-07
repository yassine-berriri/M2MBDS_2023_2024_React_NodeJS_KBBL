const mongoose = require('mongoose');
const PixelBoard = require('../models/pxBoardModel');
require('dotenv').config();
const { URL_Mongo_DOCKER, URL_MONGO_ATLAS } = process.env;
const { exec } = require('child_process');

const uri = URL_Mongo_DOCKER;
const uriAtlas = URL_MONGO_ATLAS;
const dumpPath = '';

async function migrateData() {
    try {
        const countPx = await PixelBoard.countDocuments();
        if (countPx === 0) {
            console.log('La base de données est vide. Début de la migration des données...');

            // Exporter les données depuis MongoDB Atlas
            exec(`mongodump --uri=mongodb+srv://yassineberriri:vHBIl1JGB46EUnlq@cluster0.axncp8h.mongodb.net/MBDS?retryWrites=true --collection=pixelboards --collection=users --out=C:/mongoRestore/mongoMigration`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'exportation des données depuis MongoDB Atlas: ${error.message}`);
                    return;
                }

                console.log('Exportation des données depuis MongoDB Atlas terminée avec succès.');

                // Restaurer les données dans Docker
                exec(`mongorestore --uri=${uri} ${dumpPath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Erreur lors de la restauration des données dans Docker: ${error.message}`);
                        return;
                    }

                    console.log('Restauration des données dans Docker terminée avec succès.');
                });
            });
        } else {
            console.log('La base de données contient déjà des données. Aucune migration nécessaire.');
        }
    } catch (err) {
        console.error('Erreur lors de la migration des données:', err);
    }
}

module.exports = migrateData;