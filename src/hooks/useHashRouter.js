import React from 'react';
import { HashRouter } from '../utils/hashRouter';

export function useHashParams(pattern) {
  const [params, setParams] = React.useState({});
  
  React.useEffect(() => {
    const updateParams = () => {
      const match = HashRouter.matchPath(pattern);
      setParams(match || {});
    };
    
    updateParams();
    window.addEventListener('hashchange', updateParams);
    return () => window.removeEventListener('hashchange', updateParams);
  }, [pattern]);
  
  return params;
}

export function useHashNavigation() {
  return {
    navigate: HashRouter.navigate,
    replace: HashRouter.replaceHash,
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    buildUrl: HashRouter.buildUrl
  };
}
