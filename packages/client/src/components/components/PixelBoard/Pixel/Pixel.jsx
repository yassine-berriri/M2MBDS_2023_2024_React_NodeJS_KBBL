import React, { useState } from 'react';

function Pixel({ defaultColor = 'white', selectedColor }) {

  const [color, setColor] = useState(defaultColor);

    const style = {
      width: '10px',
      height: '10px',
      backgroundColor: color,
      display: 'inline-block',
      boxSizing: 'border-box',
      border: '1px solid grey' // Ajouter une bordure pour mieux distinguer les pixels
    };
    return <div style={style} onClick={() => setColor(selectedColor)}></div>;
  }

  export default Pixel;
