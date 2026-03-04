import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import './i18n';
import { ThemeProvider } from './ThemeContext';
import { TrophyProvider } from './components/common/TrophySystem';
import { Header, Footer } from './components/common';
import { Hero } from './components/layout';
import About from './components/pages/About';
import CreationsPage from './components/pages/CreationsPage';
import History from './components/pages/History';
import LighthouseStats from './components/pages/LighthouseStats';
import TrophiesPage from './components/pages/TrophiesPage';
import WorkInProgress from './components/pages/WorkInProgress';
import BooksHome from './components/books/BooksHome';

const EXPLICIT_ROUTES = ['/', '/about', '/creations', '/creations/books', '/history', '/lighthouse', '/trophies'];
const SITE_URL = 'https://lollo176ita.github.io';

function normalizePathname(url = '/') {
  const [pathOnly] = String(url).split(/[?#]/);
  const normalized = `/${pathOnly}`.replace(/\/{2,}/g, '/');
  return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized;
}

function buildCanonicalUrl(pathname = '/') {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

function getRouteMeta(pathname = '/') {
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

function resolvePage(pathname) {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === '/') {
    return <Hero />;
  }

  if (normalizedPath === '/about') {
    return <About />;
  }

  if (normalizedPath === '/creations') {
    return <CreationsPage />;
  }

  if (normalizedPath === '/creations/books') {
    return <BooksHome />;
  }

  if (normalizedPath === '/history') {
    return <History />;
  }

  if (normalizedPath === '/lighthouse') {
    return <LighthouseStats />;
  }

  if (normalizedPath === '/trophies') {
    return <TrophiesPage />;
  }

  return <WorkInProgress />;
}

function PrerenderShell({ url }) {
  const page = resolvePage(url);

  return (
    <ThemeProvider>
      <MemoryRouter initialEntries={[url]}>
        <TrophyProvider>
          <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <Header />
            {page}
            <Footer />
          </div>
        </TrophyProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

export async function prerender({ url }) {
  const html = renderToString(<PrerenderShell url={url} />);
  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const routeMeta = getRouteMeta(url);

  return {
    html,
    links: new Set([...EXPLICIT_ROUTES, ...parseLinks(html)]),
    head: {
      lang: 'it',
      title: routeMeta.title,
      elements: new Set([
        {
          type: 'meta',
          props: {
            name: 'description',
            content: routeMeta.description,
          },
        },
        {
          type: 'link',
          props: {
            rel: 'canonical',
            href: buildCanonicalUrl(routeMeta.canonicalPath),
          },
        },
      ]),
    },
  };
}
