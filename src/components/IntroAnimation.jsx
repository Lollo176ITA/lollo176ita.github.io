import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const IntroAnimation = ({ onAnimationEnd }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLines, setShowLines] = useState(true);
  const [showCentralLetter, setShowCentralLetter] = useState(false);

  useEffect(() => {
    if (currentLetterIndex < letters.length) {
      const timeout = setTimeout(() => {
        setCurrentLetterIndex((prev) => prev + 1);
        setShowLines(true);
      }, 500 / (currentLetterIndex + 1)); // Aumenta la velocità
      return () => clearTimeout(timeout);
    } else {
      setShowCentralLetter(true);
      setTimeout(onAnimationEnd, 2000); // Attendi prima di passare alla schermata principale
    }
  }, [currentLetterIndex, onAnimationEnd]);

  useEffect(() => {
    if (showLines) {
      const timeout = setTimeout(() => setShowLines(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [showLines]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      {currentLetterIndex < letters.length && (
        <>
          {/* Prima Lettera */}
          <div className="absolute top-0 left-0 m-8 text-[15vw] font-bold transition-all duration-300">
            {letters[currentLetterIndex]}
          </div>

          {/* Seconda Lettera */}
          <div className="absolute bottom-0 right-0 m-8 text-[15vw] font-bold transition-all duration-300">
            {letters[currentLetterIndex + 1] || letters[currentLetterIndex]}
          </div>

          {/* Linee Animate */}
          {showLines && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(10)].map((_, i) => {
                const angle = Math.random() * 360;
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-full bg-white opacity-50"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      animation: `lineFadeOut 0.5s forwards`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Lettera Centrale Finale */}
      {showCentralLetter && (
        <Transition
          show={showCentralLetter}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
        >
          <div className="text-white text-[20vw] font-extrabold">Z</div>
        </Transition>
      )}
    </div>
  );
};

export default IntroAnimation;
