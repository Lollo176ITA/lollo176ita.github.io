import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildCanonicalUrl, getRouteMeta } from '../../seo/routeMeta';

export default function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const { title, description, canonicalPath } = getRouteMeta(location.pathname);
    document.title = title;

    let descriptionTag = document.head.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', buildCanonicalUrl(canonicalPath));
  }, [location.pathname]);

  return null;
}
