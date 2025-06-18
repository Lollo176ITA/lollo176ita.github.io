import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
//import Projects from './components/Projects';
import Footer from './components/Footer';
import WorkInProgress from './components/WorkInProgress';
import About from './components/About';
//import ThemeSwitch from './components/ThemeSwitch';
import History from './components/History';
import CreationsPage from './components/CreationsPage';
import Stocazzato from './components/Stocazzato';
import BooksRouter from './components/books/BooksRouter';
// import RouteDebugger from './components/RouteDebugger'; // Removed for production


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
