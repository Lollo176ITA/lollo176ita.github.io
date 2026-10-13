import { useLocation } from 'react-router-dom';
import { HashRouter } from '../utils/hashRouter';

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
