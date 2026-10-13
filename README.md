# lollo176ita.github.io

Sito personale di Lorenzo Censi (Lollo176ITA): [lollo176ita.github.io](https://lollo176ita.github.io).

Personal website of Lorenzo Censi (Lollo176ITA). English below.

---

## Italiano

### Stato

Il sito è in ricostruzione con Next.js. La versione precedente (Vite + React Router) è in `legacy/` come riferimento per il porting e verrà eliminata a lavoro finito.

### Stack

Next.js 16.4 (App Router, export statico per GitHub Pages), React 19.3 con React Compiler, TypeScript, Tailwind CSS 4, componenti [shadcn/ui](https://ui.shadcn.com) su Base UI, Vitest.

### Sviluppo

Serve Node 22.12 o superiore e pnpm.

```bash
git clone https://github.com/Lollo176ITA/lollo176ita.github.io.git
cd lollo176ita.github.io
pnpm install
```

#### Comandi

<!-- AUTO:README_IT_COMMANDS:START -->
```bash
# Sviluppo
pnpm run dev  # Avvia il dev server Next.js su `localhost:3000`

# Build
pnpm run build  # Genera l'export statico in `out/`
pnpm run predeploy  # Prepara contenuti generati e crea la build finale

# Qualita
pnpm run lint  # Controlla il codice con ESLint
pnpm run test  # Esegui i test con Vitest

# Automazione
pnpm run docs:sync  # Sincronizza le sezioni Markdown gestite automaticamente
pnpm run stats  # Rigenera le statistiche del progetto
pnpm run prepare:content  # Sincronizza docs e statistiche generate
```
<!-- AUTO:README_IT_COMMANDS:END -->

### Pubblicazione

Si lavora su `dev`. A ogni push il workflow GitHub Actions esegue i test, aggiorna `main`, rigenera i file automatici, crea tag e release da `package.json > version` e pubblica su GitHub Pages. Le regole su cosa non toccare a mano sono in [AGENTS.md](AGENTS.md); i dettagli sugli script in [docs/SCRIPTS-GUIDE.md](docs/SCRIPTS-GUIDE.md).

### Licenza

MIT, vedi [LICENSE](LICENSE).

---

## English

### Status

The site is being rebuilt with Next.js. The previous version (Vite + React Router) lives in `legacy/` as a porting reference and will be removed once the work is done.

### Tech stack

Next.js 16.4 (App Router, static export for GitHub Pages), React 19.3 with the React Compiler, TypeScript, Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com) components on Base UI, Vitest.

### Development

Requires Node 22.12 or newer and pnpm.

```bash
git clone https://github.com/Lollo176ITA/lollo176ita.github.io.git
cd lollo176ita.github.io
pnpm install
```

#### Commands

<!-- AUTO:README_EN_COMMANDS:START -->
```bash
# Development
pnpm run dev  # Start the Next.js dev server on `localhost:3000`

# Build
pnpm run build  # Generate the static export in `out/`
pnpm run predeploy  # Prepare generated content and build the final artifact

# Quality
pnpm run lint  # Lint the code with ESLint
pnpm run test  # Run the Vitest suite

# Automation
pnpm run docs:sync  # Sync the managed Markdown sections
pnpm run stats  # Regenerate project statistics
pnpm run prepare:content  # Sync generated docs and stats
```
<!-- AUTO:README_EN_COMMANDS:END -->

### Publishing

Work happens on `dev`. On every push the GitHub Actions workflow runs the tests, updates `main`, regenerates the generated files, creates a tag and release from `package.json > version` and deploys to GitHub Pages. What not to edit by hand is listed in [AGENTS.md](AGENTS.md); script details are in [docs/SCRIPTS-GUIDE.md](docs/SCRIPTS-GUIDE.md).

### License

MIT, see [LICENSE](LICENSE).
