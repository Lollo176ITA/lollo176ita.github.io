import React, { useState, useEffect } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const gridSize = 20; // Definisci la dimensione della griglia

const IntroAnimation = ({ onAnimationEnd }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [pathIndex, setPathIndex] = useState(0);
  const [path, setPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: gridSize - 1, y: gridSize - 1 });
  const [showFirstLetter, setShowFirstLetter] = useState(true);

  useEffect(() => {
    if (currentLetterIndex < letters.length) {
      // Calcola il percorso dalla posizione corrente a quella target
      const newPath = calculatePath(currentPosition, targetPosition);
      setPath(newPath);
      setPathIndex(0);
    } else {
      // Animazione completata
      setIsAnimating(false);
      onAnimationEnd();
    }
  }, [currentLetterIndex]);

  useEffect(() => {
    if (pathIndex < path.length) {
      const timer = setTimeout(() => {
        setCurrentPosition(path[pathIndex]);
        setPathIndex(pathIndex + 1);
      }, 50); // Velocità dell'animazione
      return () => clearTimeout(timer);
    } else if (currentLetterIndex < letters.length) {
      // Una volta raggiunta la posizione target
      setShowFirstLetter(false);
      setTimeout(() => {
        // Aggiorna per la prossima lettera
        setCurrentLetterIndex(currentLetterIndex + 1);
        setShowFirstLetter(true);
        setCurrentPosition(targetPosition);
        setTargetPosition({
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        });
      }, 500); // Pausa prima di iniziare il prossimo movimento
    }
  }, [pathIndex, path]);

  // Funzione per calcolare il percorso lungo la griglia
  const calculatePath = (start, end) => {
    const path = [];
    const xDirection = start.x <= end.x ? 1 : -1;
    const yDirection = start.y <= end.y ? 1 : -1;

    for (let x = start.x; x !== end.x; x += xDirection) {
      path.push({ x, y: start.y });
    }
    for (let y = start.y; y !== end.y; y += yDirection) {
      path.push({ x: end.x, y });
    }
    path.push({ x: end.x, y: end.y });
    return path;
  };

  // Calcola la posizione in percentuale per posizionare gli elementi
  const getPositionStyle = (position) => ({
    left: `${(position.x / gridSize) * 100}%`,
    top: `${(position.y / gridSize) * 100}%`,
  });

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Linea tratteggiata */}
      {pathIndex > 0 && (
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1={`${(currentPosition.x / gridSize) * 100}%`}
            y1={`${(currentPosition.y / gridSize) * 100}%`}
            x2={`${(targetPosition.x / gridSize) * 100}%`}
            y2={`${(targetPosition.y / gridSize) * 100}%`}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}

      {/* Prima lettera */}
      {showFirstLetter && (
        <div
          className="absolute text-white text-5xl font-bold transform -translate-x-1/2 -translate-y-1/2"
          style={getPositionStyle(currentPosition)}
        >
          {letters[currentLetterIndex]}
        </div>
      )}

      {/* Seconda lettera */}
      <div
        className="absolute text-white text-5xl font-bold transform -translate-x-1/2 -translate-y-1/2"
        style={getPositionStyle(targetPosition)}
      >
        {letters[currentLetterIndex + 1] || 'Z'}
      </div>
    </div>
  );
};

export default IntroAnimation;
