const mongoose = require('mongoose');
const PxBoard = require('../models/pxBoardModel'); // Assurez-vous d'ajuster le chemin vers votre modèle PxBoard
const connectDB = require('../db'); // Importez votre fonction connectDB

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const createRandomPixel = () => {
  return {
    x: getRandomInt(100), // Supposons une grille de 100x100 pour l'exemple
    y: getRandomInt(100),
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Génère une couleur hexadécimale aléatoire
    history: [{
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      modifiedAt: new Date(),
      modifiedBy: null // Simuler un visiteur non enregistré
    }]
  };
};

const createPxBoardWithPixels = (fullness) => {
  const pixels = [];
  const size = 100; // Nombre total de pixels pour cet exemple
  const numPixelsToCreate = Math.floor(size * fullness);

  for (let i = 0; i < numPixelsToCreate; i++) {
    pixels.push(createRandomPixel());
  }

  return new PxBoard({
    title: `Random Pixel Board ${new Date().getTime()}`,
    endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Fin dans une semaine
    modificationDelai: 10,
    size: 100,
    mode: ["superposition", "historique"][getRandomInt(2)], // Choisi au hasard entre deux modes
    pixels: pixels
  });
};

const populateDB = async () => {
    try {
        await connectDB(); // Établissez la connexion à la base de données

        for (let i = 0; i < 40; i++) {
            const fullness = [1, 0.5, 0][Math.floor(Math.random() * 3)]; // Choisi au hasard entre plein, à moitié, et vide
            const pxBoard = createPxBoardWithPixels(fullness);
            await pxBoard.save();
        }
        console.log('Database populated with random PixelBoards!');
    } catch (err) {
        console.error('Failed to populate the database:', err);
    } finally {
        mongoose.disconnect(); // Assurez-vous de déconnecter la base de données une fois terminé
    }
};

module.exports = populateDB;
