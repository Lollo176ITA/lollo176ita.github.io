# 🌟 Lollo176ITA Personal Website

> Una piattaforma web moderna e interattiva che racconta la mia storia, i miei progetti e le mie passioni nel mondo della programmazione e della tecnologia.

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## 🚀 Caratteristiche Principali

- **🌐 Multilingue**: Supporto completo per italiano e inglese con i18next
- **🎨 Design Responsive**: Interfaccia moderna che si adatta a tutti i dispositivi
- **🌙 Modalità Dark/Light**: Tema personalizzabile con persistenza delle preferenze
- **📊 Statistiche GitHub**: Integrazione con API GitHub per statistiche real-time
- **📖 Sistema di Libri**: Piattaforma per la pubblicazione di racconti e novelle
- **⚡ Performance**: Ottimizzato con lazy loading e code splitting
- **🔄 Hash Routing**: Sistema di routing personalizzato per GitHub Pages
- **🎭 Animazioni Fluide**: Powered by Framer Motion

## 🏗️ Architettura del Progetto

### 📁 Struttura delle Cartelle

```
src/
├── components/           # Componenti React organizzati per categoria
│   ├── common/          # Componenti condivisi (Header, Footer, Navigation)
│   ├── layout/          # Componenti di layout (Hero, Grid, etc.)
│   ├── pages/           # Componenti delle pagine principali
│   └── books/           # Sistema di gestione libri e capitoli
├── hooks/               # Custom hooks per logica riutilizzabile
├── data/                # Dati statici e configurazioni
├── locales/             # File di traduzione i18n
├── pages/               # Pagine principali dell'applicazione
└── utils/               # Utilities e helper functions
```

### 🧩 Componenti Principali

#### 📄 **Pages** (`src/components/pages/`)
- `About.js` - Pagina personale con statistiche e timeline
- `History.js` - Storia del progetto con integrazione GitHub
- `Projects.js` - Showcase dei progetti
- `CreationsPage.js` - Galleria delle creazioni
- `Stocazzato.js` - Pagina Easter egg

#### 🎨 **Layout** (`src/components/layout/`)
- `Hero.js` - Sezione hero della homepage
- `HeroText.js` - Testo animato del hero
- `AnimatedGrid.js` - Griglia animata di background

#### 🔧 **Common** (`src/components/common/`)
- `Header.js` - Intestazione con navigazione
- `Footer.js` - Piè di pagina
- `Navbar.js` - Barra di navigazione
- `LanguageSwitcher.js` - Selettore lingua
- `ThemeSwitch.js` - Interruttore tema
- `HashLink.js` - Navigazione hash personalizzata

#### 📚 **Books** (`src/components/books/`)
- `BooksHome.js` - Homepage del sistema libri
- `BookOverview.js` - Panoramica del libro
- `BookChapter.js` - Lettore di capitoli
- `BooksRouter.js` - Router per il sistema libri

## 🛠️ Tecnologie Utilizzate

- **React 18** - Framework JavaScript per UI moderne
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animazioni fluide e interazioni
- **React Router DOM** - Routing per Single Page Application  
- **React i18next** - Sistema di internazionalizzazione
- **GitHub API** - Integrazione per statistiche real-time
- **Service Worker** - PWA features e caching offline

## 🚀 Installazione e Sviluppo

### Prerequisiti
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Setup del Progetto

```bash
# Clona il repository
git clone https://github.com/lollo176ita/lollo176ita.github.io.git
cd lollo176ita.github.io

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

Il sito sarà disponibile su `http://localhost:3000`

### Comandi Disponibili

```bash
# Sviluppo con hot reload
npm start

# Build di produzione
npm run build

# Esegui i test
npm test

# Deploy su GitHub Pages
npm run deploy

# Linting del codice
npm run lint

# Fix automatico linting
npm run lint:fix
```

## 🎨 Personalizzazione

Il sito supporta:
- **Modalità chiara/scura** con persistenza delle preferenze
- **Multilingua** (Italiano/Inglese) con i18next
- **Configurazioni personalizzabili** in `src/data/`

## 📊 Features

- **Statistiche GitHub** integrate con API real-time
- **Sistema di libri** per pubblicare racconti e novelle
- **Hash routing** ottimizzato per GitHub Pages
- **PWA features** con Service Worker
- **Performance** ottimizzate con lazy loading

## 🌐 Deployment

Il sito è automaticamente deployato su **GitHub Pages** ad ogni push.

```bash
# Deploy manuale
npm run deploy
```

## 📝 Licenza

Questo progetto è sotto **licenza MIT**. Vedi il file [LICENSE](LICENSE) per i dettagli.

## 📞 Contatti

- **GitHub**: [@lollo176ita](https://github.com/lollo176ita)
- **Website**: [lollo176ita.github.io](https://lollo176ita.github.io)

---

⭐ **Se ti piace questo progetto, metti una stella!** ⭐

