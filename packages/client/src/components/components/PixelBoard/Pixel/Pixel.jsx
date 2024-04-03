import React, { useState } from 'react';

function Pixel({ defaultColor , selectedColor, clickOnPixel, x, y, initColor  }) {

  const [color, setColor] = useState(defaultColor);

  const handleSelectPixel = () => {
    console.log('handleSelectPixel');
    clickOnPixel(x, y, color !== defaultColor, initColor);
    setColor(selectedColor);
  }
  
    const style = {
      width: '25px',
      height: '25px',
      backgroundColor: defaultColor,
      display: 'inline-block',
      boxSizing: 'border-box',
      border: '1px solid grey' // Ajouter une bordure pour mieux distinguer les pixels
    };
    return <div style={style} onClick={handleSelectPixel}></div>;
  }

  export default Pixel;
