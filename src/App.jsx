import React, { useState, useEffect } from 'react';
import './css/Styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import IntroAnimation from './components/IntroAnimation';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Mostra l'animazione solo la prima volta che l'utente accede al sito
  useEffect(() => {
    if (localStorage.getItem('visited')) {
      setShowIntro(false);
    } else {
      localStorage.setItem('visited', 'true');
    }
  }, []);

  const handleAnimationEnd = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {showIntro ? (
          <IntroAnimation onAnimationEnd={handleAnimationEnd} />
        ) : (
          <>
            <Navbar />
            <main className="flex-grow p-8 bg-gray-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

