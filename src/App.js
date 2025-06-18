import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common';
import { Hero } from './components/layout';

// Lazy loading per componenti non critici con error boundaries
const About = React.lazy(() => import('./components/pages/About').catch(() => ({ default: () => <div>Error loading About</div> })));
const History = React.lazy(() => import('./components/pages/History').catch(() => ({ default: () => <div>Error loading History</div> })));
const CreationsPage = React.lazy(() => import('./components/pages/CreationsPage').catch(() => ({ default: () => <div>Error loading Creations</div> })));
const Stocazzato = React.lazy(() => import('./components/pages/Stocazzato').catch(() => ({ default: () => <div>Error loading Stocazzato</div> })));
const WorkInProgress = React.lazy(() => import('./components/pages/WorkInProgress').catch(() => ({ default: () => <div>Error loading WorkInProgress</div> })));
const BooksRouter = React.lazy(() => import('./components/books/BooksRouter').catch(() => ({ default: () => <div>Error loading Books</div> })));

// Componente di loading migliorato
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600 dark:text-gray-400">Caricamento...</span>
  </div>
);

// Error Boundary per gestire errori di caricamento
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[50vh] flex-col">
          <div className="text-red-500 text-xl mb-4">⚠️ Errore di caricamento</div>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Ricarica la pagina
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}


export default function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
