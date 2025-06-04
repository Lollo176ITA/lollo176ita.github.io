import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
//import Projects from './components/Projects';
import Footer from './components/Footer';
import WorkInProgress from './components/WorkInProgress';
//import ThemeSwitch from './components/ThemeSwitch';
import History from './components/History';
import CreationsPage from './components/CreationsPage';
import Stocazzato from './components/Stocazzato';
import BooksHome from './components/books/BooksHome';
import BookOverview from './components/books/BookOverview';
import BookChapter from './components/books/BookChapter';


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
        <Route path="/creations/books" element={<BooksHome />} />
        <Route path="/creations/books/:type/:name/overview" element={<BookOverview />} />
        <Route path="/creations/books/:type/:name/:chapter" element={<BookChapter />} />
        <Route path="/history" element={<History />} />
         <Route path="/stocazzato" element={<Stocazzato />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}
