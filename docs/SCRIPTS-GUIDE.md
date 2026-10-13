# 📜 Guida agli Script del Progetto

## Script npm (`package.json`)

<!-- AUTO:SCRIPTS_GUIDE_TABLE:START -->
| Comando | Descrizione | Quando usarlo |
|---------|-------------|---------------|
| `pnpm run dev` | Avvia il dev server Next.js (Turbopack, hot reload) | Sviluppo quotidiano |
| `pnpm run build` | Esegue `next build` con `output: "export"` e scrive il sito statico in `out/` | Verifica locale e deploy |
| `pnpm run lint` | Esegue ESLint con la configurazione di Next.js | Prima di push e release |
| `pnpm run test` | Esegue la suite test con Vitest | Prima di push e release |
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
| `@tailwindcss/turbopack` | Loader Turbopack per Tailwind CSS v4 | next.config.ts |
| `@types/node` | Tipi TypeScript per Node.js | TypeScript |
| `@types/react` | Tipi TypeScript per React | TypeScript |
| `@types/react-dom` | Tipi TypeScript per React DOM | TypeScript |
| `babel-plugin-react-compiler` | React Compiler (memoizzazione automatica) | next.config.ts (`reactCompiler`) |
| `eslint` | Linting di TypeScript e JSX | Script `lint` |
| `eslint-config-next` | Regole ESLint ufficiali di Next.js | eslint.config.mjs |
| `tailwindcss` | Framework CSS utility-first | src/app/globals.css |
| `typescript` | Type checking | tsconfig.json, `next build` |
| `vitest` | Test runner del progetto | Script `test` |
<!-- AUTO:SCRIPTS_GUIDE_DEVDEPS:END -->
