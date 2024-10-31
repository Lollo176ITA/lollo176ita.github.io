import React, { useState, useEffect } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const IntroAnimation = ({ onAnimationEnd }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLines, setShowLines] = useState(true);

  useEffect(() => {
    if (currentLetterIndex < letters.length) {
      const timeout = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
        setShowLines(!showLines);  // Alterna i trattini per creare l'animazione
      }, 200 / (currentLetterIndex + 1));  // Aumenta la velocità
      return () => clearTimeout(timeout);
    } else {
      onAnimationEnd();
    }
  }, [currentLetterIndex, showLines, onAnimationEnd]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      {currentLetterIndex < letters.length ? (
        <>
          <div className="absolute top-10 left-10 text-4xl">
            {letters[Math.max(0, currentLetterIndex - 1)]}
          </div>
          <div className="absolute top-10 right-10 text-4xl">
            {letters[currentLetterIndex]}
          </div>
          {showLines && (
            <div className="absolute w-full h-full top-0 left-0">
              {/* Linee animate */}
              <div className="border-t border-white w-full opacity-50 animate-pulse" style={{ transform: `rotate(${Math.random() * 180}deg)` }} />
            </div>
          )}
        </>
      ) : (
        <div className="text-9xl font-bold transition-opacity duration-700 opacity-100">
          Z
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;
