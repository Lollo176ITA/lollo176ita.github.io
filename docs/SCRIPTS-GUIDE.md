# 📜 Guida agli Script del Progetto

## Script npm (`package.json`)

| Comando | Descrizione | Quando usarlo |
|---------|-------------|---------------|
| `pnpm start` | Avvia il dev server locale (con hot reload) | Sviluppo quotidiano |
| `pnpm run build` | Build di sviluppo (con source maps) | Test locale della build |
| `pnpm run build:prod` | Build di produzione ottimizzata (senza source maps) | Prima del deploy |
| `pnpm run build:analyze` | Build + analisi visuale del bundle | Per capire cosa pesa di più |
| `pnpm run stats` | Genera statistiche del progetto (codice → struttura → git) | Automatico nel predeploy |
| `pnpm run deploy` | Deploy su GitHub Pages (build:prod + stats + gh-pages) | **Deploy standard** |
| `pnpm run deploy:optimized` | Deploy avanzato con ottimizzazione SW e manifest | Deploy con fix GitHub Pages |
| `pnpm test` | Esegue i test | Prima di ogni commit |

### Flusso di deploy consigliato

```
pnpm run deploy          # Deploy standard (predeploy automatico)
# oppure
pnpm run deploy:optimized  # Deploy con ottimizzazioni extra per GitHub Pages
```

---

## Script nella cartella `scripts/`

### `scripts/deploy-optimized.js`
**Cosa fa:** Esegue un deploy completo con ottimizzazioni specifiche per GitHub Pages.
- Genera statistiche del progetto
- Esegue la build di produzione
- Aggiorna il Service Worker con i path corretti per GitHub Pages
- Ottimizza il `manifest.json` con scope e start_url corretti
- Pubblica su GitHub Pages con `gh-pages`

**Quando usarlo:** Quando il deploy standard non funziona correttamente su GitHub Pages (problemi di path, SW non funzionante).

### `scripts/pre-commit-hook.js`
**Cosa fa:** Hook Git pre-commit che aggiorna automaticamente le statistiche.
- Esegue `pnpm run stats` per rigenerare `project-stats.json`
- Aggiunge i file aggiornati al commit

**Come attivarlo:**
```bash
# Copia come hook Git
cp scripts/pre-commit-hook.js .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

## Script di statistiche (`scripts/stats/`)

Questi script vengono eseguiti **in catena** (ognuno chiama il successivo):

```
code-stats.js → structure-stats.js → git-stats.js → lighthouse-stats.js (opzionale)
```

### `scripts/stats/code-stats.js`
**Cosa fa:** Analizza il codice sorgente in `src/`.
- Conta file per tipo (JS, TS, CSS, JSON, MD)
- Conta righe di codice, commenti e righe vuote
- Calcola percentuali per linguaggio
- Salva in `src/data/project-stats.json`

### `scripts/stats/structure-stats.js`
**Cosa fa:** Analizza la struttura del progetto React.
- Conta componenti, pagine, hooks, utility
- Conta rotte definite in `App.js`
- Conta libri e capitoli da `data/books.js`
- Conta Context React

### `scripts/stats/git-stats.js`
**Cosa fa:** Analizza il repository Git.
- Conta commit totali, contributori, branch
- Info sull'ultimo commit
- Calcola età del repo e frequenza dei commit

### `scripts/stats/lighthouse-stats.js`
**Cosa fa:** Esegue audit Lighthouse automatizzato.
- Avvia un server statico sulla build
- Esegue Lighthouse in headless Chrome
- Salva metriche di performance, accessibilità, SEO, best practices
- ⚠️ Richiede Chrome installato e la build già generata

---

## File di utility nel codice

| File | Scopo | Usato? |
|------|-------|--------|
| `src/utils/serviceWorker.js` | Registrazione Service Worker | ✅ Solo `registerServiceWorker()` |
| `src/utils/analytics.js` | Tracking analytics (GA, Plausible) | ⚠️ Disabilitato di default |
| `src/utils/hashRouter.js` | Utility routing hash per GitHub Pages | ✅ Usato in Header, Books, Navbar |
| `src/utils/RouteDebugger.js` | Debug visuale delle rotte (solo dev) | ❌ Mai importato |
| `src/reportWebVitals.js` | Monitoring Web Vitals | ✅ Ma solo console.log |
| `public/sw.js` | Service Worker con caching strategies | ✅ Registrato in produzione |
| `public/trophy-test-helper.js` | Helper per test dei trofei (console) | 🔧 Solo per debug manuale |

---

## DevDependencies

| Pacchetto | Scopo | Usato da |
|-----------|-------|----------|
| `@craco/craco` | Override configurazione webpack di CRA | `craco.config.js` |
| `autoprefixer` | Aggiunge prefissi CSS automatici | `postcss.config.js` |
| `compression-webpack-plugin` | Compressione gzip degli asset | `craco.config.js` |
| `css-minimizer-webpack-plugin` | Minificazione CSS avanzata | `craco.config.js` |
| `terser-webpack-plugin` | Minificazione JS avanzata | `craco.config.js` |
| `webpack-bundle-analyzer` | Analisi visuale del bundle | `craco.config.js` (con `ANALYZE=true`) |
| `gh-pages` | Deploy su GitHub Pages | Script `deploy` |
| `execa` | Esecuzione comandi shell da Node | Script di stats e deploy |
| `glob` | Pattern matching per file | Script di stats |
| `serve` | Server statico per test | Script Lighthouse |
| `lighthouse` | Audit performance automatizzato | `lighthouse-stats.js` |
| `source-map-explorer` | Analisi source maps del bundle | Script `build:analyze` |
| `postcss` | Processore CSS | `postcss.config.js` |
| `eslint-config-react-app` | Configurazione ESLint per CRA | ESLint |
