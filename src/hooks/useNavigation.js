import { useState, useEffect } from 'react';
import { HashRouter } from '../utils/hashRouter';
import { analytics } from '../utils/analytics';

/**
 * Hook per gestire lo stato attivo delle route
 */
export function useActiveRoute() {
  const [currentPath, setCurrentPath] = useState(() => HashRouter.getCurrentPath());
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(HashRouter.getCurrentPath());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);  const isActive = (path) => {
    // Normalize both paths to compare consistently
    const normalizedPath = path.replace(/^\//, ''); // Remove leading slash
    const normalizedCurrent = currentPath.replace(/^\//, ''); // Remove leading slash
    
    // Special case for homepage
    if (path === '/' || normalizedPath === '') {
      return normalizedCurrent === '';
    }
    
    return normalizedCurrent === normalizedPath;
  };
  
  const isActivePartial = (path) => {
    // Normalize both paths to compare consistently
    const normalizedPath = path.replace(/^\//, ''); // Remove leading slash
    const normalizedCurrent = currentPath.replace(/^\//, ''); // Remove leading slash
    
    // Special case for homepage - don't match partial for root
    if (path === '/' || normalizedPath === '') {
      return normalizedCurrent === '';
    }
    
    // Only match if current path starts with the normalized path AND it's not empty
    return normalizedCurrent.startsWith(normalizedPath) && normalizedCurrent !== '';
  };
  
  return {
    currentPath,
    isActive,
    isActivePartial
  };
}

/**
 * Hook per la gestione avanzata della navigazione con analytics
 */
export function useNavigationTracking() {
  const [history, setHistory] = useState([]);
    useEffect(() => {
    const handleHashChange = () => {
      const currentPath = HashRouter.getCurrentPath();
      const previousPath = history[history.length - 1];
      
      setHistory(prev => [...prev.slice(-9), currentPath]); // Keep last 10 entries
      
      // Track page view
      analytics.trackPageView(currentPath);
      
      // Track navigation if we have a previous path
      if (previousPath) {
        analytics.trackNavigation(previousPath, currentPath);
      }
    };
      // Add initial page
    const initialPath = HashRouter.getCurrentPath();
    setHistory([initialPath]);
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [history]); // Added history dependency
  
  const canGoBack = history.length > 1;
  const previousPath = history[history.length - 2];
  
  const goBack = () => {
    if (canGoBack) {
      HashRouter.navigate(`/${previousPath}`);
    }
  };
  
  return {
    history,
    canGoBack,
    previousPath,
    goBack
  };
}

/**
 * Hook specifico per tracciare eventi dei libri
 */
export function useBookTracking() {
  const trackBookView = (bookData) => {
    analytics.trackBookEvent('book_view', bookData);
  };
  
  const trackChapterView = (bookData, chapterSlug) => {
    analytics.trackBookEvent('chapter_view', { ...bookData, chapter: chapterSlug });
  };
  
  const trackBookStart = (bookData) => {
    analytics.trackBookEvent('book_start', bookData);
  };
  
  const trackChapterComplete = (bookData, chapterSlug) => {
    analytics.trackBookEvent('chapter_complete', { ...bookData, chapter: chapterSlug });
  };
  
  return {
    trackBookView,
    trackChapterView,
    trackBookStart,
    trackChapterComplete
  };
}
