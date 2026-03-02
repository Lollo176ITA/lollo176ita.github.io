# Lollo176ITA Personal Website

> A modern and interactive web platform showcasing my journey, projects, and passion for programming and technology.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)

---

## Indice / Table of Contents

### 🇮🇹 [Italiano](#italiano)

- [Panoramica](#panoramica)
- [Caratteristiche Principali](#caratteristiche-principali)
- [Stack Tecnologico](#stack-tecnologico)
- [Architettura del Progetto](#architettura-del-progetto)
- [Installazione e Setup](#installazione-e-setup)
- [Configurazione](#configurazione)
- [Ottimizzazioni Prestazioni](#ottimizzazioni-prestazioni)
- [Sistema di Trofei](#sistema-di-trofei)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentazione Tecnica](#documentazione-tecnica)
- [Contribuire](#contribuire)
- [Licenza](#licenza)
- [Contatti e Links](#contatti-e-links)

### 🇬🇧 [English](#english)

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation and Setup](#installation-and-setup)
- [Configuration](#configuration)
- [Performance Optimizations](#performance-optimizations)
- [Trophy System](#trophy-system)
- [Testing](#testing)
- [Deployment](#deployment)
- [Technical Documentation](#technical-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contacts and Links](#contacts-and-links)

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

Il progetto utilizza tecnologie web moderne per garantire prestazioni ottimali e un'esperienza utente fluida:

- **Framework**: React 19.1.0 con React Router DOM 7.6.2
- **Styling**: Tailwind CSS 3.4.15 con animazioni Framer Motion
- **Internazionalizzazione**: react-i18next per supporto multilingua
- **Build & Ottimizzazione**: CRACO, Webpack Bundle Analyzer, compressione Brotli/Gzip


### Architettura del Progetto

Il progetto segue un'architettura modulare basata su best practices React moderne:

**Struttura Principale**:
- `src/components/` - Componenti React organizzati per tipologia (common, layout, pages, books)
- `src/hooks/` - Custom hooks per logica di business (routing, navigazione, statistiche)
- `src/data/` - Dati statici e configurazioni (libri, trofei, timeline)
- `src/utils/` - Funzioni utility (hash routing, analytics, service worker)
- `scripts/` - Script per build, deploy e generazione statistiche
- `docs/` - Documentazione tecnica completa

**Principi Architetturali**:

- Separation of Concerns (componenti, hooks, utility separati)
- Component Composition (componenti piccoli e riutilizzabili)
- Performance First (lazy loading, code splitting, bundle optimization)

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

<!-- AUTO:README_IT_COMMANDS:START -->
```bash
# Sviluppo
pnpm start  # Avvia il dev server Vite su `localhost:3000`
pnpm run preview  # Serve la build locale in modalita preview

# Build
pnpm run build  # Build standard con Vite
pnpm run build:prod  # Esegui la build di produzione ottimizzata
pnpm run build:analyze  # Esegui la build con analisi del bundle

# Qualita
pnpm run test  # Esegui i test con Vitest
pnpm run test:ui  # Apri la UI interattiva di Vitest

# Automazione
pnpm run docs:sync  # Sincronizza le sezioni Markdown gestite automaticamente
pnpm run stats  # Rigenera le statistiche del progetto
pnpm run version:tag  # Stampa il tag release derivato dalla versione
pnpm run prepare:content  # Sincronizza docs e statistiche generate

# Deploy
pnpm run predeploy  # Prepara contenuti e genera la build finale
pnpm run deploy  # Pubblica `build/` su GitHub Pages con `gh-pages`
```
<!-- AUTO:README_IT_COMMANDS:END -->

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

- **[LIGHTHOUSE_METRICS.md](docs/development/LIGHTHOUSE_METRICS.md)** - Automazione metriche
  - Sistema automatizzato Lighthouse
  - Integrazione statistiche
  - Monitoraggio performance

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

The project uses modern web technologies to ensure optimal performance and a smooth user experience:

- **Framework**: React 19.1.0 with React Router DOM 7.6.2
- **Styling**: Tailwind CSS 3.4.15 with Framer Motion animations
- **Internationalization**: react-i18next for multilingual support
- **Build & Optimization**: CRACO, Webpack Bundle Analyzer, Brotli/Gzip compression

📖 **For complete technology stack details, see [ARCHITECTURE.md](docs/ARCHITECTURE.md)**

### Project Architecture

The project follows a modular architecture based on modern React best practices:

**Main Structure**:
- `src/components/` - React components organized by type (common, layout, pages, books)
- `src/hooks/` - Custom hooks for business logic (routing, navigation, statistics)
- `src/data/` - Static data and configurations (books, trophies, timeline)
- `src/utils/` - Utility functions (hash routing, analytics, service worker)
- `scripts/` - Build, deploy, and statistics generation scripts
- `docs/` - Complete technical documentation

**Architectural Principles**:
- ✅ Separation of Concerns (separate components, hooks, utilities)
- ✅ Component Composition (small, reusable components)
- ✅ Performance First (lazy loading, code splitting, bundle optimization)

📖 **For complete structure and detailed architectural patterns, see:**
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Architecture and design patterns
- [COMPONENTS.md](docs/COMPONENTS.md) - Complete component documentation

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

<!-- AUTO:README_EN_COMMANDS:START -->
```bash
# Development
pnpm start  # Start the Vite dev server on `localhost:3000`
pnpm run preview  # Serve the local build in preview mode

# Build
pnpm run build  # Run the standard Vite build
pnpm run build:prod  # Run the optimized production build
pnpm run build:analyze  # Build with bundle analysis enabled

# Quality
pnpm run test  # Run the Vitest suite
pnpm run test:ui  # Open the interactive Vitest UI

# Automation
pnpm run docs:sync  # Sync the managed Markdown sections
pnpm run stats  # Regenerate project statistics
pnpm run version:tag  # Print the release tag derived from the version
pnpm run prepare:content  # Sync generated docs and stats

# Deploy
pnpm run predeploy  # Prepare generated content and build for release
pnpm run deploy  # Publish `build/` to GitHub Pages with `gh-pages`
```
<!-- AUTO:README_EN_COMMANDS:END -->

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

- **[LIGHTHOUSE_METRICS.md](docs/development/LIGHTHOUSE_METRICS.md)** - Metrics automation
  - Automated Lighthouse system
  - Statistics integration
  - Performance monitoring

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
