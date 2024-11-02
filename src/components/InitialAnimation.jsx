// src/components/InitialAnimation.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function InitialAnimation({ onAnimationEnd }) {
  const cells = Array.from({ length: 81 }, (_, index) => index);

  useEffect(() => {
    // Imposta un timer per la durata dell'animazione
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 2000); // Durata dell'animazione in millisecondi

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <motion.div
      className="w-screen h-screen bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-9 grid-rows-9 gap-0 w-full h-full max-w-screen-sm max-h-screen-sm">
        {cells.map((cellIndex) => (
          <div key={cellIndex} className="flex items-center justify-center">
            {(cellIndex === 0 || cellIndex === 80) && (
              <motion.span
                className="text-white text-4xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                A
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default InitialAnimation;
