/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pixelSchema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: 'PxBoard' },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  color: { type: String, required: true },
  history: [{
    color: String,
    modifiedAt: { type: Date, default: Date.now },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' } // Si vous avez un modèle d'utilisateur
  }]
}, {
  timestamps: true
});

const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Pixel;
*/