import React from 'react';
import { HashRouter } from '../utils/hashRouter';

/**
 * Componente di debug per visualizzare lo stato corrente del routing
 * Rimuovi questo componente in produzione
 */
export default function RouteDebugger() {
  const [currentPath, setCurrentPath] = React.useState(() => HashRouter.getCurrentPath());
  
  React.useEffect(() => {
    const handleHashChange = () => {
      const path = HashRouter.getCurrentPath();
      setCurrentPath(path);
      console.log('🚀 Route changed:', {
        hash: window.location.hash,
        currentPath: path,
        pathType: typeof path,
        pathLength: path.length,
        isEmpty: path === '',
        isRoot: path === '/' || path === ''
      });
    };
    
    // Log initial state
    console.log('🎯 Initial route:', {
      hash: window.location.hash,
      currentPath,
      pathType: typeof currentPath,
      pathLength: currentPath.length,
      isEmpty: currentPath === '',
      isRoot: currentPath === '/' || currentPath === ''
    });
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs font-mono z-50 max-w-sm">
      <div><strong>Debug Route:</strong></div>
      <div>Hash: "{window.location.hash}"</div>
      <div>Path: "{currentPath}"</div>
      <div>Length: {currentPath.length}</div>
      <div>Is Empty: {currentPath === '' ? 'Yes' : 'No'}</div>
      <div>Is Root: {(currentPath === '/' || currentPath === '') ? 'Yes' : 'No'}</div>
    </div>
  );
}
