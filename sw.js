// Service Worker per caching avanzato e performance

const CACHE_NAME = 'lollo176ita-v1.1.0';
const STATIC_CACHE = 'static-v1.1.0';
const DYNAMIC_CACHE = 'dynamic-v1.1.0';

// File da cachare immediatamente
const STATIC_FILES = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/textures/paper.webp',
  '/project-stats.json'
];

// Install event - carica cache iniziale
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SW: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('SW: Installation complete');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('SW: Installation failed', err);
      })
  );
});

// Activate event - pulisci cache vecchie
self.addEventListener('activate', event => {
  console.log('SW: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (![STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - strategia di caching
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Strategy per diversi tipi di richieste
  if (request.destination === 'image') {
    // Immagini: Cache First con fallback
    event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // JS/CSS: Cache First con network fallback
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (request.destination === 'document') {
    // HTML: Network First con cache fallback
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  } else {
    // Altri: Stale While Revalidate
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  }
});

// Cache First Strategy - per risorse statiche
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('SW: Cache hit for', request.url);
      return cachedResponse;
    }
    
    console.log('SW: Cache miss, fetching', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SW: Cache first failed for', request.url, error);
    throw error;
  }
}

// Network First Strategy - per contenuto dinamico
async function networkFirstStrategy(request, cacheName) {
  try {
    console.log('SW: Network first for', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy - per API calls
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch in background per aggiornare cache
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(err => {
      console.error('SW: Background fetch failed', request.url, err);
    });
  
  // Restituisci cache se disponibile, altrimenti aspetta network
  if (cachedResponse) {
    console.log('SW: Stale cache for', request.url);
    return cachedResponse;
  }
  
  console.log('SW: No cache, waiting for network', request.url);
  return fetchPromise;
}

// Background sync per statistiche offline
self.addEventListener('sync', event => {
  if (event.tag === 'stats-sync') {
    event.waitUntil(syncStats());
  }
});

async function syncStats() {
  try {
    const response = await fetch('/project-stats.json');
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/project-stats.json', response.clone());
      console.log('SW: Stats synced');
    }
  } catch (error) {
    console.error('SW: Stats sync failed', error);
  }
}

// Push notifications (per future implementazioni)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: 'performance-update',
      renotify: true
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Message handler per comunicazione con main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    getCacheStats().then(stats => {
      event.ports[0].postMessage({ stats });
    });
  }
});

async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }
  
  return stats;
}
