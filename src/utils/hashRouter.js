/**
 * Centralized hash routing utilities for GitHub Pages compatibility
 */
import React from 'react';

export class HashRouter {
  static parseHash() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    return hash.split('/').filter(Boolean);
  }

  static navigate(path) {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = cleanPath;
  }

  static replaceHash(path) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.location.replace(`${window.location.pathname}${window.location.search}#${cleanPath}`);
  }

  static buildUrl(parts) {
    return `#/${parts.filter(Boolean).join('/')}`;
  }

  static getCurrentPath() {
    return this.parseHash().join('/');
  }

  static matchPath(pattern, path = null) {
    const currentPath = path || this.getCurrentPath();
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = currentPath.split('/').filter(Boolean);
    
    const params = {};
    
    if (patternParts.length !== pathParts.length) {
      return null;
    }
    
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];
      
      if (patternPart.startsWith(':')) {
        // Dynamic parameter
        params[patternPart.slice(1)] = decodeURIComponent(pathPart);
      } else if (patternPart !== pathPart) {
        return null;
      }
    }
    
    return params;
  }
}

export function useHashRouter() {
  const [path, setPath] = React.useState(() => HashRouter.getCurrentPath());
  
  React.useEffect(() => {
    const handleHashChange = () => {
      setPath(HashRouter.getCurrentPath());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return {
    path,
    navigate: HashRouter.navigate,
    replace: HashRouter.replaceHash,
    matchPath: HashRouter.matchPath,
    buildUrl: HashRouter.buildUrl
  };
}
