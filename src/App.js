import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common';
import { Hero } from './components/layout';

// Lazy loading per componenti non critici
const About = React.lazy(() => import('./components/pages/About'));
const History = React.lazy(() => import('./components/pages/History'));
const CreationsPage = React.lazy(() => import('./components/pages/CreationsPage'));
const Stocazzato = React.lazy(() => import('./components/pages/Stocazzato'));
const WorkInProgress = React.lazy(() => import('./components/pages/WorkInProgress'));
const BooksRouter = React.lazy(() => import('./components/books/BooksRouter'));

// Componente di loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600 dark:text-gray-400">Caricamento...</span>
  </div>
);


export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
    <Router>
      <Header /> 
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="/stocazzato" element={<Stocazzato />} />      
        </Routes>
      </Suspense>
      <Footer />
    </Router>
    </div>
  );
}
