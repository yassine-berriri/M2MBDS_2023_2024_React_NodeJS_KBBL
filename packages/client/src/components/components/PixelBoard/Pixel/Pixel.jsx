import React, { useState } from 'react';

function Pixel({ defaultColor = 'white', selectedColor, clickOnPixel }) {

  const [color, setColor] = useState(defaultColor);

  const handleSelectPixel = () => {
    console.log('handleSelectPixel');
    clickOnPixel();
    setColor(selectedColor);
  }

    const style = {
      width: '25px',
      height: '25px',
      backgroundColor: color,
      display: 'inline-block',
      boxSizing: 'border-box',
      border: '1px solid grey' // Ajouter une bordure pour mieux distinguer les pixels
    };
    return <div style={style} onClick={handleSelectPixel}></div>;
  }

  export default Pixel;
