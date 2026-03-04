import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashRouter } from '../utils/hashRouter';
import { analytics } from '../utils/analytics';

/**
 * Hook per gestire lo stato attivo delle route
 */
export function useActiveRoute() {
  const location = useLocation();
  const currentPath = HashRouter.getCurrentPath(location.pathname);

  const isActive = (path) => {
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
    return (
      normalizedCurrent !== '' &&
      (normalizedCurrent === normalizedPath || normalizedCurrent.startsWith(`${normalizedPath}/`))
    );
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
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const previousPathRef = useRef(null);

  useEffect(() => {
    const currentPath = HashRouter.getCurrentPath(location.pathname);

    setHistory(prevHistory => {
      if (prevHistory[prevHistory.length - 1] === currentPath) {
        return prevHistory;
      }

      return [...prevHistory.slice(-9), currentPath];
    });

    analytics.trackPageView(currentPath);

    if (previousPathRef.current && previousPathRef.current !== currentPath) {
      analytics.trackNavigation(previousPathRef.current, currentPath);
    }

    previousPathRef.current = currentPath;
  }, [location.pathname]);
  
  const canGoBack = history.length > 1;
  const previousPath = history[history.length - 2];
  
  const goBack = () => {
    if (canGoBack) {
      navigate(-1);
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
