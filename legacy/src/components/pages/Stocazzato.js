import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Stocazzato() {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer === 0) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Rickroll
      return;
    }
    const int = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(int);
  }, [timer]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t('stocazzato.title')}
      </h1>
      <button
        onClick={() => window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
        className="px-8 py-4 text-2xl bg-red-600 rounded-full mb-4 animate-pulse"
      >
        {t('stocazzato.button', { timer })}
      </button>
    </div>
  );
}
