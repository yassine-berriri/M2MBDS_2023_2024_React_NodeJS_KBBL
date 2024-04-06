import React, { useEffect, useState } from 'react';
import "./AnimatedTitle.scss";

function AnimatedTitle({ title }) {
  const [animatedTitle, setAnimatedTitle] = useState([]);

  useEffect(() => {
    const letters = title.split('').map((char, index) => ({
      char,
      delay: `${index * 0.3}s` // Changer la valeur 0.5 pour ajuster la vitesse
    }));
    setAnimatedTitle(letters);
  }, [title]);

  return (
    <h1>
      {animatedTitle.map((letter, index) => (
        <span key={index} style={{ animationDelay: letter.delay }} className="animated-letter">
          {letter.char}
        </span>
      ))}
    </h1>
  );
}
export default AnimatedTitle;
