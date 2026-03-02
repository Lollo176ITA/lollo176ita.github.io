import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n'
import App from './App';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Service Worker solo in produzione
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Attendi che React si sia inizializzato completamente
    setTimeout(() => {
      import('./utils/serviceWorker').then(({ registerServiceWorker }) => {
        registerServiceWorker();
      }).catch(() => {
        // Service Worker non disponibile, non critico
      });
    }, 1000);
  });
}
