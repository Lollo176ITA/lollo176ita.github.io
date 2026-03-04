import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashRouter } from '../utils/hashRouter';

export function useHashParams(pattern) {
  const location = useLocation();

  return useMemo(
    () => HashRouter.matchPath(pattern, location.pathname) || {},
    [location.pathname, pattern]
  );
}

export function useHashNavigation() {
  const navigate = useNavigate();

  return {
    navigate: (path) => navigate(HashRouter.normalizeUrlPath(path)),
    replace: (path) => navigate(HashRouter.normalizeUrlPath(path), { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    buildUrl: HashRouter.buildUrl
  };
}
