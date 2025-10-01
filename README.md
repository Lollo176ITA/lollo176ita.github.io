# Lollo176ITA Personal Website

> A modern and interactive web platform showcasing my journey, projects, and passion for programming and technology.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)

**[Italiano](#italiano)** | **[English](#english)**

---

## Italiano

### Panoramica

Questo progetto rappresenta il mio portfolio personale e una piattaforma per condividere progetti, pubblicazioni e il mio percorso nello sviluppo software. Costruito con tecnologie web moderne, il sito offre un'esperienza utente fluida e reattiva con particolare attenzione alle prestazioni e all'accessibilità.

### Caratteristiche Principali

#### Interfaccia e Esperienza Utente
- **Multilingua**: Supporto completo per italiano e inglese tramite react-i18next
- **Design Responsive**: Interfaccia adattiva ottimizzata per dispositivi desktop, tablet e mobile
- **Tema Personalizzabile**: Modalità chiara e scura con persistenza delle preferenze utente
- **Animazioni Fluide**: Transizioni e animazioni curate utilizzando Framer Motion
- **PWA Ready**: Funzionalità Progressive Web App con Service Worker

#### Funzionalità Tecniche
- **Hash Routing Personalizzato**: Sistema di routing ottimizzato per GitHub Pages
- **Code Splitting Avanzato**: Caricamento lazy di componenti per prestazioni ottimali
- **Bundle Optimization**: Chunk splitting strategico per ridurre dimensioni del bundle
- **Real-time Statistics**: Integrazione con API GitHub per statistiche progetto aggiornate
- **Sistema di Trofei**: Gamificazione con sistema di achievement client-side
- **Lighthouse Metrics**: Monitoraggio prestazioni con metriche Lighthouse integrate

#### Contenuti
- **Sezione About**: Presentazione personale con statistiche e timeline
- **Portfolio Progetti**: Showcase progetti con dettagli tecnici
- **Sistema Libri**: Piattaforma per pubblicazione di racconti e novelle
- **History Page**: Storia del progetto con integrazione GitHub
- **Creations Gallery**: Galleria delle creazioni e progetti speciali

### Stack Tecnologico

#### Core Technologies
```
React 19.1.0              Framework UI con supporto alle ultime features
React Router DOM 7.6.2    Routing client-side
Tailwind CSS 3.4.15      Framework CSS utility-first
Framer Motion 12.19.1     Libreria animazioni
```

#### Internazionalizzazione e UI
```
react-i18next 15.5.3      Sistema traduzioni
i18next 25.2.1            Framework i18n
react-icons 5.5.0         Libreria icone
react-country-flag 3.1.0  Componenti bandiere
```

#### Build Tools e Ottimizzazione
```
CRACO 7.1.0               Configurazione Create React App
Webpack Bundle Analyzer   Analisi bundle
Compression Plugins       Compressione Brotli e Gzip
Terser Webpack Plugin     Minificazione JavaScript
CSS Minimizer             Ottimizzazione CSS
```

#### Development Tools
```
ESLint                    Linting codice
Lighthouse 12.6.1         Audit prestazioni
Source Map Explorer       Analisi bundle
Depcheck                  Controllo dipendenze
```

### Architettura del Progetto

#### Struttura Directory

```
lollo176ita.github.io/
├── public/                      # Asset statici e file pubblici
│   ├── index.html              # HTML entry point
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   └── project-stats.json      # Statistiche progetto generate
│
├── src/                        # Codice sorgente
│   ├── components/             # Componenti React
│   │   ├── common/            # Componenti condivisi
│   │   │   ├── Header.js      # Header con navigazione
│   │   │   ├── Footer.js      # Footer
│   │   │   ├── Navbar.js      # Menu navigazione
│   │   │   ├── ThemeSwitch.js # Interruttore tema
│   │   │   ├── LanguageSwitcher.js  # Selettore lingua
│   │   │   ├── HashLink.js    # Link hash personalizzati
│   │   │   └── TrophySystem.js # Sistema trofei
│   │   │
│   │   ├── layout/            # Componenti layout
│   │   │   ├── Hero.js        # Sezione hero homepage
│   │   │   ├── HeroText.js    # Testo animato hero
│   │   │   └── AnimatedGrid.js # Griglia animata sfondo
│   │   │
│   │   ├── pages/             # Pagine applicazione
│   │   │   ├── About.js       # Pagina chi sono
│   │   │   ├── History.js     # Storia progetto
│   │   │   ├── Projects.js    # Portfolio progetti
│   │   │   ├── CreationsPage.js # Galleria creazioni
│   │   │   ├── TrophiesPage.js  # Pagina trofei
│   │   │   ├── LighthouseStats.js # Statistiche prestazioni
│   │   │   └── WorkInProgress.js  # Pagine WIP
│   │   │
│   │   ├── books/             # Sistema gestione libri
│   │   │   ├── BooksHome.js   # Homepage libri
│   │   │   ├── BooksRouter.js # Router libri
│   │   │   ├── BookOverview.js # Panoramica libro
│   │   │   └── BookChapter.js  # Lettore capitoli
│   │   │
│   │   └── animations/        # Componenti animazioni
│   │       └── LazyMotion.js  # Lazy load Framer Motion
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useHashRouter.js   # Hook routing hash
│   │   ├── useNavigation.js   # Hook navigazione
│   │   └── useStats.js        # Hook statistiche
│   │
│   ├── data/                   # Dati e configurazioni
│   │   ├── books.js           # Dati libri
│   │   ├── trophies.js        # Configurazione trofei
│   │   ├── history.it.json    # Timeline italiana
│   │   ├── history.en.json    # Timeline inglese
│   │   └── project-stats.json # Statistiche generate
│   │
│   ├── locales/               # File traduzioni i18n
│   │   ├── en/translation.json # Traduzioni inglese
│   │   └── it/translation.json # Traduzioni italiano
│   │
│   ├── utils/                 # Utility functions
│   │   ├── hashRouter.js     # Sistema routing hash
│   │   ├── analytics.js      # Analytics e tracking
│   │   ├── serviceWorker.js  # Gestione Service Worker
│   │   └── RouteDebugger.js  # Debug routing
│   │
│   ├── App.js                 # Componente principale
│   ├── index.js              # Entry point React
│   ├── i18n.js               # Configurazione i18n
│   └── ThemeContext.js       # Context gestione tema
│
├── scripts/                   # Script utility
│   ├── stats/                # Script statistiche
│   │   ├── code-stats.js    # Analisi codice
│   │   ├── git-stats.js     # Statistiche Git
│   │   ├── lighthouse-stats.js # Metriche Lighthouse
│   │   └── structure-stats.js  # Analisi struttura
│   ├── deploy-optimized.js   # Script deploy ottimizzato
│   └── pre-commit-hook.js    # Hook pre-commit
│
├── docs/                      # Documentazione
│   ├── ARCHITECTURE.md       # Architettura progetto
│   ├── CHANGELOG.md          # Registro modifiche
│   ├── COMPONENTS.md         # Documentazione componenti
│   ├── REAL-STATS.md        # Sistema statistiche
│   └── development/         # Documentazione sviluppo
│
├── build/                    # Build di produzione
├── reports/                  # Report generati
├── craco.config.js          # Configurazione CRACO
├── tailwind.config.js       # Configurazione Tailwind
├── postcss.config.js        # Configurazione PostCSS
└── package.json             # Dipendenze e script
```

#### Pattern Architetturali

**Separation of Concerns**
- Componenti dedicati esclusivamente alla presentazione
- Custom hooks per logica di business e gestione stato
- Utility functions separate per operazioni comuni
- Contexts per stato globale (tema, lingua)

**Component Composition**
- Componenti piccoli e riutilizzabili
- Composizione su ereditarietà
- Props drilling minimizzato tramite Context API

**Performance Optimization**
- Lazy loading di componenti non critici
- Code splitting strategico per ridurre bundle size
- Memoization di componenti pesanti
- Bundle principale ottimizzato: ~131KB (riduzione 73%)

### Installazione e Setup

#### Prerequisiti

- Node.js >= 18.0.0
- pnpm (consigliato) o npm >= 8.0.0

#### Installazione

```bash
# Clona il repository
git clone https://github.com/lollo176ita/lollo176ita.github.io.git
cd lollo176ita.github.io

# Installa dipendenze con pnpm (consigliato)
pnpm install

# Oppure con npm
npm install
```

#### Comandi Disponibili

```bash
# Sviluppo
pnpm start                  # Avvia server sviluppo (localhost:3000)

# Build
pnpm run build             # Build standard
pnpm run build:prod        # Build produzione (no source maps)
pnpm run build:analyze     # Build con analisi bundle

# Deploy
pnpm run predeploy         # Build + genera statistiche
pnpm run deploy            # Deploy su GitHub Pages
pnpm run deploy:optimized  # Deploy con ottimizzazioni

# Test
pnpm test                  # Esegui test suite

# Statistiche
pnpm run stats             # Genera statistiche progetto

# Utility
pnpm run lint              # Controllo linting
pnpm run lint:fix          # Fix automatico problemi linting
```

### Configurazione

#### Variabili Ambiente

Crea un file `.env.local` per configurazioni locali:

```env
REACT_APP_GITHUB_TOKEN=your_github_token
REACT_APP_ANALYTICS_ID=your_analytics_id
```

#### Personalizzazione Tema

I colori e il tema possono essere personalizzati in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // I tuoi colori personalizzati
      }
    }
  }
}
```

#### Configurazione i18n

Aggiungi o modifica traduzioni in `src/locales/[lang]/translation.json`.

### Ottimizzazioni Prestazioni

#### Risultati Lighthouse (Produzione)

```
Performance:      57/100 (target: 70+)
Accessibility:    88/100
Best Practices:   100/100
SEO:             100/100
```

#### Bundle Size Optimization

- Bundle principale: 131KB (ridotto da 495KB, -73%)
- 12 chunk separati per caricamento ottimale
- Source maps disabilitate in produzione
- Compressione Brotli e Gzip attive

#### Build Performance

- Build time: ~13.1s (ridotto da 17.9s, -27%)
- Code splitting con React.lazy()
- Tree shaking automatico
- CSS minimizzato e ottimizzato

### Sistema di Trofei

Il sito include un sistema di gamificazione con trofei sbloccabili:

- **9 trofei totali** con 5 livelli di rarità
- **Persistenza locale**: Salvataggio tramite localStorage
- **Multilingua**: Descrizioni in italiano e inglese
- **Animazioni**: Pop-up animati per sblocco trofei
- **Pagina dedicata**: Visualizzazione progresso trofei

Categorie trofei:
- Esplorazione del sito
- Interazioni speciali
- Completamento attività
- Achievement nascosti

### Testing

```bash
# Esegui test suite completa
pnpm test

# Esegui test con coverage
pnpm test -- --coverage

# Esegui test in modalità watch
pnpm test -- --watch
```

### Deployment

#### GitHub Pages (Automatico)

Il sito viene automaticamente deployato su GitHub Pages ad ogni push sul branch principale.

#### Deployment Manuale

```bash
# Build e deploy
pnpm run predeploy
pnpm run deploy

# Oppure deploy ottimizzato
pnpm run deploy:optimized
```

Il sito sarà disponibile su: `https://lollo176ita.github.io`

### Documentazione Tecnica

La documentazione completa del progetto è disponibile nella cartella `docs/`. Consulta i seguenti documenti per maggiori dettagli:

#### Documentazione Core

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Architettura completa del progetto
  - Principi architetturali e pattern
  - Stack tecnologico dettagliato
  - Struttura del progetto
  - Best practices e linee guida di sviluppo
  - Gestione dello stato e routing
  
- **[COMPONENTS.md](docs/COMPONENTS.md)** - Documentazione componenti React
  - Componenti comuni e layout
  - Componenti di pagina
  - Sistema libri
  - Props, state e utilizzo
  
- **[CONVENTIONAL_COMMITS.md](docs/CONVENTIONAL_COMMITS.md)** - Convenzioni commit
  - Standard per messaggi commit
  - Tipi di commit e scope
  - Esempi pratici

- **[CHANGELOG.md](docs/CHANGELOG.md)** - Registro completo delle modifiche
  - Storia delle versioni
  - Feature aggiunte
  - Bug fix e miglioramenti

#### Documentazione Tecnica Avanzata

- **[HASH_ROUTING.md](docs/technical/HASH_ROUTING.md)** - Sistema routing personalizzato
  - Implementazione routing hash
  - API e utilizzo
  - Ottimizzazione per GitHub Pages
  
- **[REAL-STATS.md](docs/REAL-STATS.md)** - Sistema statistiche real-time
  - Generazione automatica statistiche
  - Integrazione GitHub API
  - Hooks React per statistiche

#### Guide Sviluppo

- **[PERFORMANCE_OPTIMIZATION.md](docs/development/PERFORMANCE_OPTIMIZATION.md)** - Ottimizzazioni prestazioni
  - Bundle size optimization
  - Build performance
  - Metriche Lighthouse
  
- **[LIGHTHOUSE_METRICS.md](docs/development/LIGHTHOUSE_METRICS.md)** - Automazione metriche
  - Sistema automatizzato Lighthouse
  - Integrazione statistiche
  - Monitoraggio performance
  
- **[SERVICE_WORKER_FIXES.md](docs/development/SERVICE_WORKER_FIXES.md)** - Service Worker
  - Implementazione PWA
  - Strategie di cache
  - Risoluzione problemi comuni

### Contribuire

I contributi sono benvenuti! Per contribuire:

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

Consulta `docs/CONVENTIONAL_COMMITS.md` per le convenzioni sui commit.

### Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.

### Contatti e Links

- **GitHub**: [@lollo176ita](https://github.com/lollo176ita)
- **Website**: [lollo176ita.github.io](https://lollo176ita.github.io)
- **Repository**: [github.com/lollo176ita/lollo176ita.github.io](https://github.com/lollo176ita/lollo176ita.github.io)

---

## English

### Overview

This project represents my personal portfolio and a platform to share projects, publications, and my journey in software development. Built with modern web technologies, the site offers a smooth and responsive user experience with a focus on performance and accessibility.

### Key Features

#### Interface and User Experience
- **Multilingual**: Full support for Italian and English via react-i18next
- **Responsive Design**: Adaptive interface optimized for desktop, tablet, and mobile devices
- **Customizable Theme**: Light and dark modes with user preference persistence
- **Smooth Animations**: Curated transitions and animations using Framer Motion
- **PWA Ready**: Progressive Web App features with Service Worker

#### Technical Features
- **Custom Hash Routing**: Routing system optimized for GitHub Pages
- **Advanced Code Splitting**: Lazy loading of components for optimal performance
- **Bundle Optimization**: Strategic chunk splitting to reduce bundle size
- **Real-time Statistics**: GitHub API integration for updated project statistics
- **Trophy System**: Gamification with client-side achievement system
- **Lighthouse Metrics**: Performance monitoring with integrated Lighthouse metrics

#### Content
- **About Section**: Personal presentation with statistics and timeline
- **Project Portfolio**: Project showcase with technical details
- **Book System**: Platform for publishing stories and novels
- **History Page**: Project history with GitHub integration
- **Creations Gallery**: Gallery of creations and special projects

### Technology Stack

#### Core Technologies
```
React 19.1.0              UI framework with latest features support
React Router DOM 7.6.2    Client-side routing
Tailwind CSS 3.4.15      Utility-first CSS framework
Framer Motion 12.19.1     Animation library
```

#### Internationalization and UI
```
react-i18next 15.5.3      Translation system
i18next 25.2.1            i18n framework
react-icons 5.5.0         Icon library
react-country-flag 3.1.0  Flag components
```

#### Build Tools and Optimization
```
CRACO 7.1.0               Create React App configuration
Webpack Bundle Analyzer   Bundle analysis
Compression Plugins       Brotli and Gzip compression
Terser Webpack Plugin     JavaScript minification
CSS Minimizer             CSS optimization
```

#### Development Tools
```
ESLint                    Code linting
Lighthouse 12.6.1         Performance auditing
Source Map Explorer       Bundle analysis
Depcheck                  Dependency checking
```

### Project Architecture

The architecture follows modern React best practices with clear separation of concerns. For detailed structure, see the directory tree in the Italian section above.

#### Architectural Patterns

**Separation of Concerns**
- Components dedicated exclusively to presentation
- Custom hooks for business logic and state management
- Separate utility functions for common operations
- Contexts for global state (theme, language)

**Component Composition**
- Small and reusable components
- Composition over inheritance
- Minimal props drilling via Context API

**Performance Optimization**
- Lazy loading of non-critical components
- Strategic code splitting to reduce bundle size
- Memoization of heavy components
- Optimized main bundle: ~131KB (73% reduction)

### Installation and Setup

#### Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm >= 8.0.0

#### Installation

```bash
# Clone repository
git clone https://github.com/lollo176ita/lollo176ita.github.io.git
cd lollo176ita.github.io

# Install dependencies with pnpm (recommended)
pnpm install

# Or with npm
npm install
```

#### Available Commands

```bash
# Development
pnpm start                  # Start development server (localhost:3000)

# Build
pnpm run build             # Standard build
pnpm run build:prod        # Production build (no source maps)
pnpm run build:analyze     # Build with bundle analysis

# Deploy
pnpm run predeploy         # Build + generate statistics
pnpm run deploy            # Deploy to GitHub Pages
pnpm run deploy:optimized  # Deploy with optimizations

# Test
pnpm test                  # Run test suite

# Statistics
pnpm run stats             # Generate project statistics

# Utilities
pnpm run lint              # Check linting
pnpm run lint:fix          # Auto-fix linting issues
```

### Configuration

#### Environment Variables

Create a `.env.local` file for local configurations:

```env
REACT_APP_GITHUB_TOKEN=your_github_token
REACT_APP_ANALYTICS_ID=your_analytics_id
```

#### Theme Customization

Colors and theme can be customized in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      }
    }
  }
}
```

#### i18n Configuration

Add or modify translations in `src/locales/[lang]/translation.json`.

### Performance Optimizations

#### Lighthouse Results (Production)

```
Performance:      57/100 (target: 70+)
Accessibility:    88/100
Best Practices:   100/100
SEO:             100/100
```

#### Bundle Size Optimization

- Main bundle: 131KB (reduced from 495KB, -73%)
- 12 separate chunks for optimal loading
- Source maps disabled in production
- Brotli and Gzip compression active

#### Build Performance

- Build time: ~13.1s (reduced from 17.9s, -27%)
- Code splitting with React.lazy()
- Automatic tree shaking
- Minified and optimized CSS

### Trophy System

The site includes a gamification system with unlockable trophies:

- **9 total trophies** with 5 rarity levels
- **Local persistence**: Saving via localStorage
- **Multilingual**: Descriptions in Italian and English
- **Animations**: Animated pop-ups for trophy unlocking
- **Dedicated page**: Trophy progress visualization

Trophy categories:
- Site exploration
- Special interactions
- Activity completion
- Hidden achievements

### Testing

```bash
# Run complete test suite
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

### Deployment

#### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages on every push to the main branch.

#### Manual Deployment

```bash
# Build and deploy
pnpm run predeploy
pnpm run deploy

# Or optimized deploy
pnpm run deploy:optimized
```

The site will be available at: `https://lollo176ita.github.io`

### Technical Documentation

Complete project documentation is available in the `docs/` folder. Consult the following documents for detailed information:

#### Core Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Complete project architecture
  - Architectural principles and patterns
  - Detailed technology stack
  - Project structure
  - Development best practices and guidelines
  - State management and routing
  
- **[COMPONENTS.md](docs/COMPONENTS.md)** - React component documentation
  - Common and layout components
  - Page components
  - Book system
  - Props, state, and usage
  
- **[CONVENTIONAL_COMMITS.md](docs/CONVENTIONAL_COMMITS.md)** - Commit conventions
  - Commit message standards
  - Commit types and scopes
  - Practical examples

- **[CHANGELOG.md](docs/CHANGELOG.md)** - Complete changelog
  - Version history
  - Added features
  - Bug fixes and improvements

#### Advanced Technical Documentation

- **[HASH_ROUTING.md](docs/technical/HASH_ROUTING.md)** - Custom routing system
  - Hash routing implementation
  - API and usage
  - GitHub Pages optimization
  
- **[REAL-STATS.md](docs/REAL-STATS.md)** - Real-time statistics system
  - Automated statistics generation
  - GitHub API integration
  - React hooks for statistics

#### Development Guides

- **[PERFORMANCE_OPTIMIZATION.md](docs/development/PERFORMANCE_OPTIMIZATION.md)** - Performance optimization
  - Bundle size optimization
  - Build performance
  - Lighthouse metrics
  
- **[LIGHTHOUSE_METRICS.md](docs/development/LIGHTHOUSE_METRICS.md)** - Metrics automation
  - Automated Lighthouse system
  - Statistics integration
  - Performance monitoring
  
- **[SERVICE_WORKER_FIXES.md](docs/development/SERVICE_WORKER_FIXES.md)** - Service Worker
  - PWA implementation
  - Cache strategies
  - Common issues resolution

### Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See `docs/CONVENTIONAL_COMMITS.md` for commit conventions.

### License

This project is distributed under the MIT license. See the [LICENSE](LICENSE) file for details.

### Contacts and Links

- **GitHub**: [@lollo176ita](https://github.com/lollo176ita)
- **Website**: [lollo176ita.github.io](https://lollo176ita.github.io)
- **Repository**: [github.com/lollo176ita/lollo176ita.github.io](https://github.com/lollo176ita/lollo176ita.github.io)

---

**Version**: 2.2.8 | **Last Updated**: October 2025

