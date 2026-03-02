# 📜 Guida agli Script del Progetto

## Script npm (`package.json`)

<!-- AUTO:SCRIPTS_GUIDE_TABLE:START -->
| Comando | Descrizione | Quando usarlo |
|---------|-------------|---------------|
| `pnpm start` | Avvia il dev server Vite locale (hot reload) | Sviluppo quotidiano |
| `pnpm run preview` | Serve la build locale in modalita preview | Controllo post-build in locale |
| `pnpm run build` | Genera la build standard con Vite | Verifica locale del bundle |
| `pnpm run build:prod` | Genera la build di produzione ottimizzata | Prima del deploy |
| `pnpm run build:analyze` | Build con analisi del bundle | Analisi performance bundle |
| `pnpm run test` | Esegue la suite test con Vitest | Prima di push e release |
| `pnpm run test:ui` | Avvia la UI interattiva di Vitest | Debug dei test in locale |
| `pnpm run docs:sync` | Aggiorna le sezioni auto-generate di README e docs | Prima di commit e nei job GitHub |
| `pnpm run stats` | Rigenera `project-stats.json` e lo copia in `public/` | Aggiornamento metriche repository |
| `pnpm run version:tag` | Restituisce il tag release da `package.json` (es. `v2.5.0`) | Automazione release e debug locale |
| `pnpm run prepare:content` | Esegue `docs:sync` e `stats` nella sequenza corretta | Prima di build e deploy |
| `pnpm run predeploy` | Sincronizza contenuti generati e poi crea la build finale | Base comune per deploy locale e CI |
| `pnpm run deploy` | Pubblica `build/` su GitHub Pages usando `gh-pages` | Deploy manuale dal proprio ambiente |
<!-- AUTO:SCRIPTS_GUIDE_TABLE:END -->

### Flusso di deploy consigliato

<!-- AUTO:SCRIPTS_GUIDE_FLOW:START -->
```bash
pnpm run predeploy  # Sincronizza docs/stats e genera la build finale
pnpm run deploy     # Pubblica ./build con gh-pages
```
<!-- AUTO:SCRIPTS_GUIDE_FLOW:END -->

---

## Script nella cartella `scripts/`

### `scripts/stats/generate-stats.js` (Script unificato)

**Cosa fa:** Genera tutte le statistiche del progetto in un unico passaggio.

- **Code stats**: conta file, righe di codice/commenti/vuote, linguaggi usati
- **Structure stats**: conta componenti, pagine, hooks, utility, rotte, libri/capitoli
- **Git stats**: commit, contributori, branch, età repo, frequenza commit
- Salva tutto in `src/data/project-stats.json`

**Uso:**

```bash
pnpm run stats
```

### `scripts/stats/lighthouse-stats.js` (Separato, opzionale)

**Cosa fa:** Esegue audit Lighthouse automatizzato.

- Avvia un server statico sulla build
- Esegue Lighthouse in headless Chrome
- Salva metriche di performance, accessibilità, SEO, best practices
- Richiede Chrome installato e la build già generata

**Uso:**

```bash
node scripts/stats/lighthouse-stats.js
```

### Script legacy (non più usati direttamente)

I file `code-stats.js`, `structure-stats.js`, `git-stats.js` sono stati sostituiti da `generate-stats.js`.
Sono mantenuti come riferimento ma non vengono più chiamati dalla pipeline.

---

## File di utility nel codice

| File | Scopo | Usato? |
| ------ | ------- | -------- |
| `src/utils/serviceWorker.js` | Registrazione Service Worker | Si, solo `registerServiceWorker()` |
| `src/utils/analytics.js` | Tracking analytics (GA, Plausible) | Disabilitato di default |
| `src/utils/hashRouter.js` | Utility routing hash per GitHub Pages | Si, usato in Header, Books, Navbar |
| `public/sw.js` | Service Worker con caching strategies | Si, registrato in produzione |
| `public/trophy-test-helper.js` | Helper per test dei trofei (console) | Solo per debug manuale |

---

## DevDependencies

<!-- AUTO:SCRIPTS_GUIDE_DEVDEPS:START -->
| Pacchetto | Scopo | Usato da |
|-----------|-------|----------|
| `@testing-library/jest-dom` | Matcher DOM aggiuntivi per i test | Vitest + Testing Library |
| `@testing-library/react` | Utility di render e query per componenti React | Test componenti React |
| `@vitejs/plugin-react` | Plugin React ufficiale per Vite | vite.config.js |
| `@vitest/ui` | Interfaccia web interattiva per Vitest | Script `test:ui` |
| `autoprefixer` | Aggiunge i vendor prefix al CSS | postcss.config.js |
| `eslint` | Linting JavaScript e JSX | Controlli statici |
| `eslint-plugin-react` | Regole ESLint specifiche per React | .eslintrc.json |
| `eslint-plugin-react-hooks` | Regole ESLint per gli hook React | .eslintrc.json |
| `execa` | Esecuzione processi child da Node.js | Script di automazione |
| `gh-pages` | Pubblicazione della cartella `build/` su GitHub Pages | Script `deploy` |
| `glob` | Ricerca file tramite pattern glob | Script di statistiche |
| `jsdom` | DOM emulato per test in ambiente Node | Vitest |
| `lighthouse` | Audit automatici di performance e qualita | scripts/stats/lighthouse-stats.js |
| `postcss` | Pipeline di trasformazione CSS | postcss.config.js |
| `serve` | Server statico locale per test build | Preview e Lighthouse |
| `vite` | Dev server e build tool principale | Script `start`, `build`, `build:prod` |
| `vite-bundle-visualizer` | Visualizzazione grafica del bundle | Analisi bundle |
| `vite-plugin-compression2` | Compressione gzip in fase di build | vite.config.js |
| `vitest` | Test runner principale del progetto | Script `test` e `test:ui` |
<!-- AUTO:SCRIPTS_GUIDE_DEVDEPS:END -->
