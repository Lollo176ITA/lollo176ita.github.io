const SITE_URL = 'https://lollo176ita.github.io';

function normalizePathname(pathname = '/') {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const [pathOnly] = String(pathname).split(/[?#]/);
  const normalized = `/${pathOnly}`.replace(/\/{2,}/g, '/');
  return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized;
}

export function buildCanonicalUrl(pathname = '/') {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export function getRouteMeta(pathname = '/') {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath.startsWith('/creations/books')) {
    return {
      title: 'Books | Lollo176ITA',
      description: 'Libri, capitoli e racconti pubblicati da Lollo176ITA.',
      canonicalPath: normalizedPath,
    };
  }

  const routeMeta = {
    '/': {
      title: 'Lollo176ITA | Web & Game Developer',
      description: 'Portfolio personale di Lorenzo Censi: sviluppo web, giochi, esperimenti e progetti in evidenza.',
    },
    '/about': {
      title: 'About | Lollo176ITA',
      description: 'Profilo, stack tecnico e panoramica rapida sul lavoro di Lollo176ITA.',
    },
    '/creations': {
      title: 'Creations | Lollo176ITA',
      description: 'Una selezione delle creazioni principali: giochi, codice, libri e progetti interattivi.',
    },
    '/history': {
      title: 'History | Lollo176ITA',
      description: 'Timeline del progetto, release, commit e statistiche storiche del sito.',
    },
    '/lighthouse': {
      title: 'Lighthouse Stats | Lollo176ITA',
      description: 'Andamento delle metriche Lighthouse del progetto con riepilogo performance e accessibilita.',
    },
    '/trophies': {
      title: 'Trophies | Lollo176ITA',
      description: 'Collezione trofei, progressi e obiettivi sbloccabili del sito.',
    },
  };

  const fallbackMeta = {
    title: 'Lollo176ITA | Portfolio',
    description: 'Portfolio personale e raccolta progetti di Lollo176ITA.',
  };

  return {
    ...(routeMeta[normalizedPath] || fallbackMeta),
    canonicalPath: normalizedPath,
  };
}
