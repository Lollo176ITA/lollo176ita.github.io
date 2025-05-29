import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
//import Projects from './components/Projects';
import Footer from './components/Footer';
import WorkInProgress from './components/WorkInProgress';
//import ThemeSwitch from './components/ThemeSwich';
import History from './components/History';
import CreationsPage from './components/CreationsPage';


export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<WorkInProgress />} />
        {/* Rotte per le pagine in costruzione */}
        <Route path="/about" element={<WorkInProgress />} />
        {/* Rotta per gestire percorsi non definiti */}
        <Route path="*" element={<WorkInProgress />} />
        <Route path="/creations" element={<CreationsPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}
