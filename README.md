# lollo176ita.github.io

Sito personale di Lorenzo Censi (Lollo176ITA): [lollo176ita.github.io](https://lollo176ita.github.io).

Personal website of Lorenzo Censi (Lollo176ITA). English below.

---

## Italiano

### Cosa c'è

- **Home** con il minigioco della griglia di lettere
- **About**: profilo, stack e interessi
- **Creazioni**: i progetti pubblici su GitHub
- **Storia**: timeline del sito, commit e release presi dalle API GitHub
- **Trofei** sbloccabili, salvati nel browser
- Italiano e inglese, tema chiaro e scuro

### Stack

React 19, React Router 7, Tailwind CSS 3, framer-motion, react-i18next, build con Vite e prerender delle pagine principali.

### Sviluppo

Serve Node 22 e pnpm.

```bash
git clone https://github.com/Lollo176ITA/lollo176ita.github.io.git
cd lollo176ita.github.io
pnpm install
```

#### Comandi

<!-- AUTO:README_IT_COMMANDS:START -->
```bash
# Sviluppo
pnpm start  # Avvia il dev server Vite su `localhost:3000`
pnpm run preview  # Serve la build locale in modalita preview

# Build
pnpm run build  # Build standard con Vite
pnpm run build:prod  # Esegui la build di produzione ottimizzata
pnpm run predeploy  # Prepara contenuti generati e crea la build finale

# Qualita
pnpm run test  # Esegui i test con Vitest
pnpm run test:ui  # Apri la UI interattiva di Vitest

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

### What's inside

- **Home** with the letter-grid mini-game
- **About**: profile, stack and interests
- **Creations**: public projects on GitHub
- **History**: site timeline, commits and releases from the GitHub API
- Unlockable **trophies**, stored in the browser
- Italian and English, light and dark theme

### Tech stack

React 19, React Router 7, Tailwind CSS 3, framer-motion, react-i18next, built with Vite with prerendered main pages.

### Development

Requires Node 22 and pnpm.

```bash
git clone https://github.com/Lollo176ITA/lollo176ita.github.io.git
cd lollo176ita.github.io
pnpm install
```

#### Commands

<!-- AUTO:README_EN_COMMANDS:START -->
```bash
# Development
pnpm start  # Start the Vite dev server on `localhost:3000`
pnpm run preview  # Serve the local build in preview mode

# Build
pnpm run build  # Run the standard Vite build
pnpm run build:prod  # Run the optimized production build
pnpm run predeploy  # Prepare generated content and build the final artifact

# Quality
pnpm run test  # Run the Vitest suite
pnpm run test:ui  # Open the interactive Vitest UI

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
