import React, { useState, useEffect } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const IntroAnimation = ({ onAnimationEnd }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    let animationSpeed = 1000; // Velocità iniziale
    if (currentLetterIndex >= 2) {
      // Accelera dopo la lettera 'C'
      animationSpeed = 500 / (currentLetterIndex - 1);
    }

    if (currentLetterIndex < letters.length) {
      const interval = setInterval(() => {
        setLineProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLineProgress(0);
            setCurrentLetterIndex((prevIndex) => prevIndex + 1);
            return 0;
          }
          return prev + 2;
        });
      }, animationSpeed / 50);
      return () => clearInterval(interval);
    } else {
      setShowStars(true);
      setTimeout(() => {
        setIsAnimating(false);
        onAnimationEnd();
      }, 3000); // Mostra le stelle per 3 secondi
    }
  }, [currentLetterIndex, onAnimationEnd]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      {isAnimating && currentLetterIndex < letters.length && (
        <>
          {/* Prima Lettera */}
          <div className="absolute top-1/4 left-1/4 text-[10vw] font-bold">
            {letters[currentLetterIndex]}
          </div>

          {/* Seconda Lettera */}
          <div className="absolute top-3/4 right-1/4 text-[10vw] font-bold">
            {currentLetterIndex < letters.length - 1
              ? letters[currentLetterIndex]
              : 'Z'}
          </div>

          {/* Linea Tratteggiata */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="30%"
              y1="30%"
              x2="70%"
              y2="70%"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,5"
              strokeDashoffset={`${(100 - lineProgress) * 5}`}
            />
          </svg>
        </>
      )}

      {/* Cambia la Seconda Lettera quando la linea la raggiunge */}
      {isAnimating && lineProgress >= 100 && currentLetterIndex < letters.length && (
        <div className="absolute top-3/4 right-1/4 text-[10vw] font-bold">
          {letters[currentLetterIndex + 1] || 'Z'}
        </div>
      )}

      {/* Visualizza la "Z" con le stelle dorate */}
      {showStars && (
        <div className="relative text-[20vw] font-extrabold text-white">
          Z
          {/* Stelle Dorate */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  animation: `starTwinkle 2s infinite`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: '2vw',
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;
