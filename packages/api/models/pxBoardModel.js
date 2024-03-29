const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pxBoardSchema = new Schema({
  
  id: { type: Number, required: false, auto: true },
  title: { type: String, required: true },
  endDate: { type: Date, required: true },
  modificationDelai: { type: Number, required: true },
  size: { type: Number, required: true }
}, {
  timestamps: true, 
});

// Création du modèle
const PxBoard = mongoose.model('pixelboards', pxBoardSchema);

module.exports = PxBoard;
