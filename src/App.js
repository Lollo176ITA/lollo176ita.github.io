import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/projects" element={<WorkInProgress />} />
        {/* Rotte per le pagine in costruzione */}
        <Route path="/about" element={<WorkInProgress />} />
        {/* Rotta per gestire percorsi non definiti */}
        <Route path="*" element={<WorkInProgress />} />
      </Routes>
      <Footer />
    </Router>
  );
}
