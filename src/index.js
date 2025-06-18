import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Performance monitoring ottimizzato
reportWebVitals((metric) => {
  // In produzione, invia a servizio di analytics
  console.log('Performance Metric:', metric.name, metric.value);
});

// Lazy load Service Worker solo se necessario
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Attendi che React si sia inizializzato completamente
    setTimeout(() => {
      import('./utils/serviceWorker').then(({ registerServiceWorker }) => {
        registerServiceWorker();
      }).catch(err => {
        console.warn('Service Worker non disponibile:', err);
      });
    }, 1000);
  });
} else {
  console.log('Service Worker skipped (development mode or not supported)');
}
reportWebVitals();
