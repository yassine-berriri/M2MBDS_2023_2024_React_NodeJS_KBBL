const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pixelHistorySchema = new Schema({
  color: { type: String, required: false }, // Format hexadécimal, facultatif
  modifiedAt: { type: Date, default: Date.now, required: false },
  modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // Peut être null pour les visiteurs non enregistrés
 // userId: { type: Schema.Types.ObjectId, ref: 'User', required: false } // 

}, { _id: false }); // Ajoutez cette option si vous ne voulez pas d'_id pour chaque entrée de l'historique

const pixelSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  color: { type: String, required: true }, // Validation du format hexadécimal pour les couleurs
  history: [pixelHistorySchema] // Utilisez le schéma d'historique ici
});

const modeEnum = {
  SUPERPOSITION: "superposition",
  HISTORIQUE: "historique",
  // DEFI: "defi",
};

const pxBoardSchema = new Schema({
  title: { type: String, required: true },
  endDate: { type: Date, required: true },
  modificationDelai: { type: Number, required: true },
  size: { type: Number, required: true },
  mode: [{ 
    type: String, 
    required: false, 
    enum: Object.values(modeEnum) 
  }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },

  pixels: [{ type: pixelSchema, required: false }] // Correctement défini en tant que tableau de sous-documents
}, {
  timestamps: true, 
});

const PxBoard = mongoose.model('PixelBoard', pxBoardSchema);

module.exports = PxBoard;
