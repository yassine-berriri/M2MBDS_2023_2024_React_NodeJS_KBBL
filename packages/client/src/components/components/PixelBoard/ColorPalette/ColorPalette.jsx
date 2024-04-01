import React from 'react';

function ColorPalette({ onSelectColor }) {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple','white', 'black'];

  const paletteStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    border: '1px solid black',
    marginBottom: '20px'
  };

  const colorStyle = (color) => ({
    width: '40px',
    height: '40px',
    backgroundColor: color,
    cursor: 'pointer'
  });

  return (
    <div style={paletteStyle}>
      {colors.map(color => (
        <div
          key={color}
          style={colorStyle(color)}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
}

export default ColorPalette;
