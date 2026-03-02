// Registrazione Service Worker per GitHub Pages

/**
 * Registra il Service Worker con configurazione GitHub Pages
 */
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
    return;
  }

  try {
    const swPath = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/sw.js` : '/sw.js';
    
    // Verifica che il SW esista prima di registrarlo
    const swResponse = await fetch(swPath, { method: 'HEAD' }).catch(() => null);
    if (!swResponse || !swResponse.ok) {
      return;
    }
    
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: process.env.PUBLIC_URL || '/'
    });
    
    // Gestisci aggiornamenti SW
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateNotification(registration);
          }
        });
      }
    });
    
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
  
  document.getElementById('sw-update-btn').addEventListener('click', () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  });
  
  document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
    banner.remove();
  });
  
  setTimeout(() => {
    if (banner.parentNode) {
      banner.remove();
    }
  }, 10000);
};
