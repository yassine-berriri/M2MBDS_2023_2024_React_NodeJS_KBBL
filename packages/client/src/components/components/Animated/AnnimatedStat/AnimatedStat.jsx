import React, { useEffect, useState } from 'react';
import "./AnimatedStat.scss";

function AnimatedStat({ label, value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Crée une animation de comptage pour la valeur
    const end = value;
    let startTimestamp = null;
    const duration = 2000; // Durée de l'animation en ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <div className="animated-stat-container">
      <span className="label">{label}</span>
      <span className="value">{displayValue}</span>
    </div>
  );
}
export default AnimatedStat;
