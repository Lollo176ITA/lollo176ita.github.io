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
import TrophiesPage from './components/pages/TrophiesPage';
import WorkInProgress from './components/pages/WorkInProgress';
import { buildCanonicalUrl, getRouteMeta, normalizePathname } from './seo/routeMeta';

const EXPLICIT_ROUTES = ['/', '/about', '/creations', '/history', '/trophies'];

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

  if (normalizedPath === '/history') {
    return <History />;
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

function releasePrerenderHandles() {
  const activeHandles = typeof process !== 'undefined' && process._getActiveHandles
    ? process._getActiveHandles()
    : [];

  for (const handle of activeHandles) {
    if (handle?.constructor?.name !== 'MessagePort') {
      continue;
    }

    handle.unref?.();
    handle.close?.();
  }
}

export async function prerender({ url }) {
  const html = renderToString(<PrerenderShell url={url} />);
  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const routeMeta = getRouteMeta(url);

  releasePrerenderHandles();

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
