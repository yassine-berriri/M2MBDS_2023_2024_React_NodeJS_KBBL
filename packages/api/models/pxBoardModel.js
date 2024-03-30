const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modeEnum = {
  SUPERPOSITION: "superposition", // Permet aux utilisateurs de superposer de nouvelles couleurs sur des pixels déjà colorés, leur donnant la possibilité de changer d'avis ou d'ajouter de la profondeur à leurs dessins.
  HISTORIQUE: "historique", //  Permet aux utilisateurs de voir l'historique des modifications d'un pixel spécifique ou de l'ensemble du tableau. Cela peut inclure qui a modifié le pixel, quand et quelles étaient les couleurs précédentes. 
  // DEFI: "defi",  Propose des défis ou des thèmes spécifiques que les utilisateurs doivent suivre, comme créer une image avec une palette de couleurs limitée ou reproduire une image célèbre pixel par pixel.


}

const pxBoardSchema = new Schema({
  
  id: { type: Number, required: false, auto: true },
  title: { type: String, required: true },
  endDate: { type: Date, required: true },
  modificationDelai: { type: Number, required: true },
  size: { type: Number, required: true },
  mode: [{ 
    type: String, 
    required: false, 
    enum: Object.values(modeEnum) 
  }],

}, {
  timestamps: true, 
});

// Création du modèle
const PxBoard = mongoose.model('pixelboards', pxBoardSchema);

module.exports = PxBoard;
