// migrate-data.js
const mongoose = require('mongoose');
const PixelBoard = require('../models/pxBoardModel');
require('dotenv').config();
const {  URL_Mongo_DOCKER } = process.env;
const { exec } = require('child_process');

const uri = URL_Mongo_DOCKER;
//const collectionPxBoardName = 'pixelBoards'; 
//const collectionUsersName = 'users';
const dumpPath = '/mongoMigration/MBDS';

async function migrateData() {
    try {
        const countPx = await PixelBoard.countDocuments();
        //const countUsers = await User.countDocuments();
        if (countPx === 0) {
            console.log('La base de données est vide. Début de la migration des données...');
            // Remplacer la commande ci-dessous par votre commande mongorestore correcte
            exec(`mongorestore --uri=${uri} ${dumpPath}`, (error, stdout, stderr) => {
              if (error) {
                console.error(`Erreur lors de la migration des données: ${error.message}`);
                return;
              }
              console.log('Migration des données terminée avec succès.');
            });
          } else {
            console.log('La base de données contient déjà des données. Aucune migration nécessaire.');
          }
    } catch (err) {
        console.error('Erreur lors de la migration des données:', err);
    }
}

module.exports = migrateData;
