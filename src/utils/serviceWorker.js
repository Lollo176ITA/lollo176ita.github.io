// Registrazione Service Worker e gestione performance

/**
 * Registra il Service Worker con configurazione GitHub Pages
 */
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
    console.log('SW: Not registering - not in production or not supported');
    return;
  }

  try {
    // Su GitHub Pages, il path potrebbe essere diverso
    const swPath = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/sw.js` : '/sw.js';
    
    // Verifica che il SW esista prima di registrarlo
    const swResponse = await fetch(swPath, { method: 'HEAD' }).catch(() => null);
    if (!swResponse || !swResponse.ok) {
      console.warn('SW: Service worker file not found:', swPath);
      return;
    }
    
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: process.env.PUBLIC_URL || '/'
    });
    
    console.log('SW: Registered successfully', registration.scope);
    
    // Gestisci aggiornamenti SW
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nuovo SW disponibile
            showUpdateNotification(registration);
          }
        });
      }
    });
    
    // Background sync per statistiche (se supportato)
    if ('sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await registration.sync.register('stats-sync');
      } catch (err) {
        console.warn('SW: Background sync not supported', err);
      }
    }
    
    return registration;
    
  } catch (error) {
    console.error('SW: Registration failed', error);
    return null;
  }
};

/**
 * Mostra notifica di aggiornamento disponibile
 */
const showUpdateNotification = (registration) => {
  // Crea banner di aggiornamento
  const banner = document.createElement('div');
  banner.className = 'fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 z-50 text-center';
  banner.innerHTML = `
    <span>🚀 Nuova versione disponibile!</span>
    <button id="sw-update-btn" class="ml-3 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
      Aggiorna
    </button>
    <button id="sw-dismiss-btn" class="ml-2 text-blue-200 text-sm">
      ✕
    </button>
  `;
  
  document.body.appendChild(banner);
  
  // Gestisci click aggiornamento
  document.getElementById('sw-update-btn').addEventListener('click', () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  });
  
  // Gestisci dismissal
  document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
    banner.remove();
  });
  
  // Auto-dismiss dopo 10 secondi
  setTimeout(() => {
    if (banner.parentNode) {
      banner.remove();
    }
  }, 10000);
};

/**
 * Ottieni statistiche cache per monitoraggio performance
 */
export const getCacheStats = async () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.stats);
      };
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_STATS' },
        [messageChannel.port2]
      );
    });
  }
  
  return {};
};

/**
 * Preload risorse critiche
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/project-stats.json',
    '/textures/paper.webp'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.endsWith('.json')) {
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
    } else if (resource.endsWith('.webp') || resource.endsWith('.jpg')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Monitora Web Vitals e invia metriche
 */
export const monitorWebVitals = () => {
  // Lazy load web-vitals per non impattare performance iniziale
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }).catch(error => {
    console.warn('Web Vitals monitoring failed:', error);
  });
};

const sendToAnalytics = (metric) => {
  // In produzione, invia a servizio di analytics
  console.log('Web Vital:', metric.name, metric.value);
  
  // Opzionale: invia a Google Analytics, Lighthouse CI, etc.
};

/**
 * Ottimizzazioni specifiche per performance
 */
export const applyPerformanceOptimizations = () => {
  // Preconnect a domini esterni
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Lazy load immagini non critiche
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};
