import React, { useState, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const IntroAnimation = ({ onAnimationEnd }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLines, setShowLines] = useState(true);
  const [showCentralLetter, setShowCentralLetter] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (currentLetterIndex < letters.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentLetterIndex((prev) => prev + 1);
        setShowLines(true);
      }, 500 / (currentLetterIndex + 1)); // Aumenta la velocità
    } else {
      setShowCentralLetter(true);
      setTimeout(onAnimationEnd, 2000); // Attendi prima di passare alla schermata principale
    }
    return () => clearTimeout(intervalRef.current);
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
          <div className="absolute top-10 left-10 text-6xl font-bold transition-all duration-300">
            {letters[currentLetterIndex]}
          </div>

          {/* Seconda Lettera */}
          <div className="absolute top-10 right-10 text-6xl font-bold transition-all duration-300">
            {letters[currentLetterIndex + 1] || letters[currentLetterIndex]}
          </div>

          {/* Linee Animate */}
          {showLines && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-white opacity-70"
                  style={{
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: 'lineAnimation 0.5s forwards',
                  }}
                />
              ))}
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
          <div className="text-9xl font-extrabold">Z</div>
        </Transition>
      )}
    </div>
  );
};

export default IntroAnimation;
