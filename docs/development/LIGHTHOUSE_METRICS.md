# 🚀 Lighthouse Metrics Automation

## Overview

Il progetto ora include un sistema automatizzato per raccogliere metriche reali di performance usando Lighthouse. Le metriche vengono utilizzate nella pagina `/creations` per mostrare dati concreti invece di valori stimati.

## 📊 Metriche Raccolte

- **Performance** (0-100): Velocità di caricamento e ottimizzazioni
- **Accessibility** (0-100): Compatibilità con screen reader e WCAG
- **Best Practices** (0-100): Sicurezza, HTTPS, console errors
- **SEO** (0-100): Ottimizzazione per motori di ricerca

## 🛠️ Scripts Disponibili

### Generazione Statistiche Base
```bash
npm run stats
```
Genera le statistiche del progetto senza metriche Lighthouse.

### Generazione Completa con Lighthouse
```bash
npm run stats:lighthouse
```
Esegue build completo + audit Lighthouse + generazione statistiche.

### Copia File Pubblico
```bash
npm run stats:copy
```
Copia il file delle statistiche nella cartella public per l'uso runtime.

### Test Metriche
```bash
npm run stats:test
```
Verifica che le metriche siano valide e complete.

## 📈 Integrazione nel Progetto

### Script generate-stats.js

Il file `scripts/generate-stats.js` ora include una funzione `getLighthouseScores()` che:

1. **Avvia un server locale** della build in produzione
2. **Esegue audit Lighthouse** automaticamente
3. **Estrae le metriche** (Performance, Accessibility, Best Practices, SEO)
4. **Salva i risultati** in `src/data/project-stats.json`

### Utilizzo nelle Componenti

```javascript
// src/hooks/useStats.js
import { useState, useEffect } from 'react';

export const useStats = () => {
  const [stats, setStats] = useState({
    lighthouse: {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0
    }
  });

  useEffect(() => {
    fetch('/project-stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.warn('Stats not available:', err));
  }, []);

  return stats;
};
```

### Visualizzazione in /creations

```javascript
// src/components/pages/CreationsPage.js
const { lighthouse } = useStats();

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard 
    label="Performance" 
    value={lighthouse.performance} 
    suffix="/100"
    color="text-green-500"
  />
  <StatCard 
    label="Accessibility" 
    value={lighthouse.accessibility} 
    suffix="/100"
    color="text-blue-500"
  />
  <StatCard 
    label="Best Practices" 
    value={lighthouse.bestPractices} 
    suffix="/100"
    color="text-purple-500"
  />
  <StatCard 
    label="SEO" 
    value={lighthouse.seo} 
    suffix="/100"
    color="text-orange-500"
  />
</div>
```

## ⚙️ Configurazione

### Lighthouse Config
```javascript
// scripts/lighthouse.config.js (se necessario)
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'performance',
      'accessibility',
      'best-practices',
      'seo'
    ],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    }
  }
};
```

### Server Configuration
```javascript
// scripts/generate-stats.js - Server setup
const server = spawn('npx', ['serve', '-s', 'build', '-p', port], {
  stdio: 'pipe',
  shell: true
});

// Attendi che il server sia pronto
await new Promise(resolve => {
  server.stdout.on('data', (data) => {
    if (data.toString().includes('Accepting connections')) {
      setTimeout(resolve, 2000); // Attesa extra per stabilità
    }
  });
});
```

## 📋 Output delle Metriche

### Format JSON
```json
{
  "lighthouse": {
    "performance": 85,
    "accessibility": 92,
    "bestPractices": 100,
    "seo": 100
  },
  "generated": "2025-06-18T15:30:00.000Z",
  "url": "http://localhost:3000"
}
```

### Metriche Dettagliate (opzionale)
```json
{
  "lighthouse": {
    "performance": {
      "score": 85,
      "metrics": {
        "firstContentfulPaint": 1200,
        "largestContentfulPaint": 2500,
        "totalBlockingTime": 150
      }
    }
  }
}
```

## 🚀 Benefici

1. **Metriche Reali**: Dati effettivi invece di stime
2. **Automazione**: Generazione automatica ad ogni build
3. **Visibilità**: Metriche visibili sulla pagina /creations
4. **CI/CD Ready**: Integrabile in pipeline di deploy
5. **Performance Tracking**: Monitoraggio nel tempo

## ⚠️ Note Tecniche

- **Porta**: Lo script trova automaticamente una porta libera
- **Timeout**: 30 secondi massimi per l'audit
- **Fallback**: Se Lighthouse fallisce, usa valori di default
- **Cleanup**: Server automaticamente terminato dopo l'audit
- **Error Handling**: Gestione robusta degli errori

## 🔧 Troubleshooting

### Problema: Lighthouse non trova la pagina
```bash
# Verifica che la build esista
npm run build

# Verifica che il server sia raggiungibile
curl http://localhost:3000
```

### Problema: Timeout durante l'audit
```javascript
// Aumenta il timeout in generate-stats.js
const result = await lighthouse(url, {
  port: chromePort,
  output: 'json'
}, null, undefined, { timeout: 60000 }); // 60 secondi
```

### Problema: Chrome non disponibile
```bash
# Installa Chrome/Chromium
# Ubuntu/Debian
sudo apt-get install chromium-browser

# Windows
# Download da https://www.google.com/chrome/
```

Questo sistema garantisce metriche accurate e aggiornate per mostrare le reali performance del sito!
