export class HashRouter {
  static normalizePath(path = '') {
    if (!path) {
      return '';
    }

    return String(path)
      .replace(/^#/, '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '');
  }

  static normalizeUrlPath(path = '') {
    const normalizedPath = this.normalizePath(path);
    return normalizedPath ? `/${normalizedPath}` : '/';
  }

  static navigate(path) {
    if (typeof window === 'undefined') {
      return;
    }

    const cleanPath = this.normalizeUrlPath(path);
    window.history.pushState({}, '', cleanPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  static replaceHash(path) {
    if (typeof window === 'undefined') {
      return;
    }

    const cleanPath = this.normalizeUrlPath(path);
    window.history.replaceState({}, '', cleanPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  static buildUrl(partsOrPath) {
    const path = Array.isArray(partsOrPath)
      ? partsOrPath.filter(Boolean).join('/')
      : partsOrPath;

    return this.normalizeUrlPath(path);
  }

  static getCurrentPath(pathname = null) {
    if (pathname !== null) {
      return this.normalizePath(pathname);
    }

    if (typeof window === 'undefined') {
      return '';
    }

    return this.normalizePath(window.location.pathname);
  }

  static matchPath(pattern, path = null) {
    const currentPath = path || this.getCurrentPath();
    const patternParts = this.normalizePath(pattern).split('/').filter(Boolean);
    const pathParts = this.normalizePath(currentPath).split('/').filter(Boolean);
    const params = {};

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    for (let i = 0; i < patternParts.length; i += 1) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart.startsWith(':')) {
        params[patternPart.slice(1)] = decodeURIComponent(pathPart);
      } else if (patternPart !== pathPart) {
        return null;
      }
    }

    return params;
  }
}
