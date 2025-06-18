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
Copia il file delle statistiche nella directory pubblica.

### Generazione Completa
```bash
npm run stats:full
```
Genera statistiche + copia nella directory pubblica.

## 🔄 Processo Automatico

### Durante il Build
Il processo di build include automaticamente:
1. Generazione statistiche
2. Copia in directory pubblica
3. Build dell'applicazione React

### Durante il Deployment
Le metriche vengono aggiornate ad ogni deploy per garantire dati sempre freschi.

## 📋 File Generati

### `src/data/project-stats.json`
File principale con tutte le statistiche:
```json
{
  "performance": {
    "avgBuildTime": 37.6,
    "lighthouse": {
      "performance": 38,
      "accessibility": 88,
      "bestPractices": 100,
      "seo": 100,
      "lastUpdated": "2025-06-18T13:43:51.114Z",
      "fallback": false
    }
  }
}
```

### `public/project-stats.json`
Copia accessibile via HTTP per uso esterno.

## 🎯 Come Funziona

### 1. Scan del Progetto
- Conta file, righe di codice, componenti
- Analizza linguaggi di programmazione
- Raccoglie statistiche Git

### 2. Build Time Measurement
- Misura tempo reale di build
- Fallback su stima se build fallisce

### 3. Lighthouse Audit
- Avvia Chrome headless
- Esegue audit completo su localhost:3000
- Raccoglie metriche performance/accessibility/SEO
- Fallback su valori realistici se non disponibile

### 4. Salvataggio Dati
- Salva in formato JSON strutturato
- Include timestamp e flag fallback
- Copia in directory pubblica per accesso HTTP

## 🔧 Configurazione

### Prerequisiti
- Node.js 16+ 
- Chrome/Chromium installato
- NPM packages: `lighthouse`, `chrome-launcher`, `node-fetch`

### Personalizzazione
Modificare `scripts/generate-stats.js` per:
- Cambiare URL di test
- Aggiungere nuove metriche
- Modificare soglie di fallback
- Personalizzare output

## 🚨 Fallback System

Se Lighthouse non è disponibile, il sistema usa valori realistici:
- Performance: 85-95
- Accessibility: 92-98  
- Best Practices: 90-98
- SEO: 88-98

Il flag `fallback: true` indica quando sono usati valori stimati.

## 📈 Monitoraggio Performance

### Metriche Critiche da Monitorare
- **Performance < 50**: Richiede ottimizzazioni urgenti
- **Accessibility < 80**: Non conforme WCAG standard
- **Best Practices < 90**: Problemi di sicurezza potenziali
- **SEO < 80**: Visibilità search engine compromessa

### Ottimizzazioni Suggerite
- **Performance**: Code splitting, lazy loading, image optimization
- **Accessibility**: Alt text, ARIA labels, contrast colors
- **Best Practices**: HTTPS, no console errors, sicurezza
- **SEO**: Meta tags, structured data, sitemap

## 🔄 Integrazione CI/CD

Per automatizzare in GitHub Actions:
```yaml
- name: Generate Lighthouse Metrics
  run: npm run stats:lighthouse
```

Le metriche vengono aggiornate ad ogni build e deployment.

---

**Ultimo aggiornamento**: Giugno 2025
**Versione sistema**: 1.0.0
