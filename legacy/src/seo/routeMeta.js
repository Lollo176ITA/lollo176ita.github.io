const SITE_URL = 'https://lollo176ita.github.io';

export function normalizePathname(pathname = '/') {
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
      description: 'Una selezione delle creazioni principali: app Android, siti web, strumenti e giochi.',
    },
    '/history': {
      title: 'History | Lollo176ITA',
      description: 'Timeline del progetto, release, commit e statistiche storiche del sito.',
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
