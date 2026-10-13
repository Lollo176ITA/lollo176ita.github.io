# 📜 Guida agli Script del Progetto

## Script npm (`package.json`)

<!-- AUTO:SCRIPTS_GUIDE_TABLE:START -->
| Comando | Descrizione | Quando usarlo |
|---------|-------------|---------------|
| `pnpm start` | Avvia il dev server Vite locale (hot reload) | Sviluppo quotidiano |
| `pnpm run preview` | Serve la build locale in modalita preview | Controllo post-build in locale |
| `pnpm run build` | Genera la build standard con Vite | Verifica locale del bundle |
| `pnpm run build:prod` | Genera la build di produzione ottimizzata | Prima del deploy |
| `pnpm run test` | Esegue la suite test con Vitest | Prima di push e release |
| `pnpm run test:ui` | Avvia la UI interattiva di Vitest | Debug dei test in locale |
| `pnpm run docs:sync` | Aggiorna le sezioni auto-generate di README e docs | Prima di commit e nei job GitHub |
| `pnpm run stats` | Rigenera `project-stats.json` e lo copia in `public/` | Aggiornamento metriche repository |
| `pnpm run prepare:content` | Esegue `docs:sync` e `stats` nella sequenza corretta | Prima di build e deploy |
| `pnpm run predeploy` | Sincronizza contenuti generati e poi crea la build finale | Build completa pronta per il deploy automatico |
<!-- AUTO:SCRIPTS_GUIDE_TABLE:END -->

### Flusso di deploy consigliato

<!-- AUTO:SCRIPTS_GUIDE_FLOW:START -->
```bash
git push origin dev  # Avvia validazione, merge automatico su main e deploy Pages
```
<!-- AUTO:SCRIPTS_GUIDE_FLOW:END -->

---

## Script nella cartella `scripts/`

### `scripts/stats/generate-stats.js` (Script unificato)

**Cosa fa:** Genera tutte le statistiche del progetto in un unico passaggio.

- **Code stats**: conta file, righe di codice/commenti/vuote, linguaggi usati
- **Structure stats**: conta componenti, pagine, hooks, utility, rotte
- **Git stats**: commit, contributori, branch, età repo, frequenza commit
- Salva tutto in `src/data/project-stats.json`

**Uso:**

```bash
pnpm run stats
```

---

## File di utility nel codice

| File | Scopo | Usato? |
| ------ | ------- | -------- |
| `src/utils/hashRouter.js` | Normalizzazione dei path per i link interni | Si, usato in Header, Navbar e HashLink |
| `public/sw.js` | Kill-switch: svuota le cache e deregistra il vecchio Service Worker | Si, solo per i browser che avevano la versione precedente |

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
| `jsdom` | DOM emulato per test in ambiente Node | Vitest |
| `postcss` | Pipeline di trasformazione CSS | postcss.config.js |
| `vite` | Dev server e build tool principale | Script `start`, `build`, `build:prod` |
| `vite-plugin-compression2` | Compressione gzip in fase di build | vite.config.js |
| `vite-prerender-plugin` | Dipendenza di supporto al toolchain | Tooling del progetto |
| `vitest` | Test runner principale del progetto | Script `test` e `test:ui` |
<!-- AUTO:SCRIPTS_GUIDE_DEVDEPS:END -->
