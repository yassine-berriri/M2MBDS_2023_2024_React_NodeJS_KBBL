import React from 'react';

import { colorsPalette} from './Colors';

function ColorPalette({ onSelectColor }) {

  const colors = colorsPalette;

  const paletteStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Permet aux éléments de passer à la ligne suivante
    justifyContent: 'space-around',
    padding: '10px',
    border: '1px solid black',
    marginBottom: '29px',
    maxWidth: '1940px' // Ajustez cette largeur selon le nombre de couleurs par ligne que vous souhaitez
  };

  const colorStyle = (color) => ({
    width: '40px',
    height: '40px',
    backgroundColor: color,
    cursor: 'pointer',
    margin: '5px' // Ajouter un peu d'espace autour de chaque couleur
  });
  return (
    <div style={paletteStyle}>
      {colors.map((color, index) => (
        <div
          key={`${color}-${index}`} // Utilisation de l'index pour garantir l'unicité de la clé
          style={colorStyle(color)}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
}

export default ColorPalette;
