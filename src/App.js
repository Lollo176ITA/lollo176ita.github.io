import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import WorkInProgress from './components/WorkInProgress';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<Projects />} />
        {/* Aggiungi le rotte dei link non funzionanti */}
        <Route path="/about" element={<WorkInProgress />} />
        <Route path="/services" element={<WorkInProgress />} />
        {/* Rotta per gestire percorsi non definiti */}
        <Route path="*" element={<WorkInProgress />} />
      </Routes>
      <Footer />
    </Router>
  );
}
