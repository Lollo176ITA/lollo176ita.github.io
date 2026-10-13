# AGENTS.md

Questo file definisce cosa non va modificato manualmente nel repository, per evitare di rompere il flusso automatico.

## Non modificare a mano

- `README.md`
  - Le sezioni comprese tra i marker `<!-- AUTO:...:START -->` e `<!-- AUTO:...:END -->` sono generate automaticamente da `pnpm run docs:sync`.
  - Se vuoi cambiare quei blocchi, modifica `scripts/docs/sync-markdown.js` e poi riesegui `pnpm run docs:sync`.

- `docs/SCRIPTS-GUIDE.md`
  - Le sezioni comprese tra i marker `<!-- AUTO:...:START -->` e `<!-- AUTO:...:END -->` sono generate automaticamente da `pnpm run docs:sync`.
  - Non editare direttamente quelle tabelle o snippet: la sorgente vera e' `scripts/docs/sync-markdown.js`.

- `src/data/project-stats.json`
  - File generato automaticamente da `pnpm run stats`.
  - Per cambiare struttura o contenuto, modifica `scripts/stats/generate-stats.js` e poi riesegui `pnpm run stats`.

- `public/project-stats.json`
  - Copia generata di `src/data/project-stats.json`.
  - Non modificarlo manualmente: viene rigenerato da `pnpm run stats` e da `pnpm run prepare:content`.

- `main`
  - E' il branch stabile gestito dal workflow GitHub Actions.
  - Non usarlo come branch di sviluppo quotidiano: il lavoro va fatto su `dev`.

- Tag Git e GitHub Releases
  - Sono creati automaticamente dal workflow a partire da `package.json > version`.
  - Se vuoi una nuova release, aggiorna la versione in `package.json` e fai push su `dev`.

- GitHub Pages deploy
  - La pubblicazione e' fatta automaticamente da GitHub Actions tramite `actions/deploy-pages`.
  - Non reintrodurre deploy manuali o branch `gh-pages` come flusso principale senza cambiare intenzionalmente la pipeline.

## Flusso corretto

- Sviluppa su `dev`.
- Fai push su `dev`.
- Il workflow valida, prepara `main`, sincronizza i file generati, crea tag/release se necessario e pubblica su GitHub Pages.

## Cartella `legacy/`

- Contiene il vecchio sito Vite + React Router, solo come riferimento per il porting a Next.js.
- E' esclusa da TypeScript, ESLint, Vitest e dalla build. Non importare nulla da li': porta il codice in `src/` e poi elimina la cartella a porting finito.

## Quando serve modificare l'automazione

- Se cambiano i comandi mostrati nella documentazione, aggiorna `scripts/docs/sync-markdown.js` e poi esegui `pnpm run docs:sync`.
- Se cambia il formato delle statistiche, aggiorna `scripts/stats/generate-stats.js` e poi esegui `pnpm run stats`.
- Se cambia il flusso CI/CD, aggiorna `.github/workflows/automation.yml` con attenzione e verifica che resti coerente con questo file.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
