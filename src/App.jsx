// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AlphabetPage from './pages/AlphabetPage';
import LetterPage from './pages/LetterPage';
import NotFoundPage from './pages/NotFoundPage';
import InitialAnimation from './components/InitialAnimation';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setIsFirstVisit(true);
      localStorage.setItem('visited', 'true');
    } else {
      setShowAnimation(false);
    }
  }, []);

  // Se è la prima visita e l'animazione è ancora da mostrare
  if (isFirstVisit && showAnimation) {
    return <InitialAnimation onAnimationEnd={() => setShowAnimation(false)} />;
  }

  // Contenuto normale del sito con le rotte
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/alphabet/:alphabetName" element={<AlphabetPage />} />
        <Route path="/alphabet/:alphabetName/:letterName" element={<LetterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
