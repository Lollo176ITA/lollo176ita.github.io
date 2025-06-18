import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common';
import { Hero } from './components/layout';
import { About, History, CreationsPage, Stocazzato, WorkInProgress } from './components/pages';
import { BooksRouter } from './components/books';
// import RouteDebugger from './utils/RouteDebugger'; // Removed for production


export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<WorkInProgress />} />
        {/* Pagina "Chi sono" */}
        <Route path="/about" element={<About />} />
        {/* Rotta per gestire percorsi non definiti */}
        <Route path="*" element={<WorkInProgress />} />
        <Route path="/creations" element={<CreationsPage />} />
        <Route path="/creations/books/*" element={<BooksRouter />} />
        <Route path="/history" element={<History />} />
         <Route path="/stocazzato" element={<Stocazzato />} />      </Routes>
      <Footer />
      {/* <RouteDebugger /> */}
    </Router>
    </div>
  );
}
