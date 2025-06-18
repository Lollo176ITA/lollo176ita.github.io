# 📁 Documentazione Componenti

Questa documentazione descrive la struttura e l'organizzazione dei componenti React del progetto.

## 🏗️ Struttura delle Cartelle

### `src/components/common/` - Componenti Condivisi

Componenti utilizzati in tutta l'applicazione per mantenere consistenza e riutilizzabilità.

#### `Header.js`
**Scopo**: Intestazione principale del sito con navigazione e funzionalità interattive.

**Features**:
- Menu di navigazione responsive
- Easter egg "Stocazzato" (10 click rapidi sul logo)
- Integrazione con sistema di routing hash
- Supporto per modalità dark/light

**Props**: Nessuna

**State**:
- `isOpen`: Stato del menu mobile
- `clickCount`: Contatore per easter egg
- `stocazzatoMode`: Modalità easter egg attiva

#### `Footer.js`
**Scopo**: Piè di pagina con informazioni di copyright e link utili.

**Features**:
- Link social e contatti
- Informazioni copyright
- Design responsive

#### `Navbar.js`
**Scopo**: Barra di navigazione principale.

**Features**:
- Navigazione tra sezioni
- Indicatore pagina attiva
- Menu collassabile su mobile

#### `LanguageSwitcher.js`
**Scopo**: Selettore lingua italiano/inglese.

**Features**:
- Switch tra IT/EN
- Persistenza preferenza nel localStorage
- Animazioni di transizione

#### `ThemeSwitch.js`
**Scopo**: Interruttore modalità chiara/scura.

**Features**:
- Toggle dark/light mode
- Rilevamento preferenze sistema
- Persistenza nel localStorage

#### `HashLink.js`
**Scopo**: Componente per navigazione hash personalizzata.

**Features**:
- Navigazione SPA senza ricarica
- Gestione stato browser
- Smooth scrolling

---

### `src/components/layout/` - Componenti di Layout

Componenti specifici per il layout e la struttura visiva delle pagine.

#### `Hero.js`
**Scopo**: Sezione hero della homepage con introduzione e call-to-action.

**Features**:
- Design responsive con immagini
- Animazioni CSS
- Call-to-action button
- Integrazione con HeroText

#### `HeroText.js`
**Scopo**: Testo animato per la sezione hero.

**Features**:
- Animazioni typewriter
- Testo multilingue
- Effetti di typing dinamici

#### `AnimatedGrid.js`
**Scopo**: Griglia animata di background per effetti visivi.

**Features**:
- Animazioni CSS pure
- Pattern geometrici
- Responsive design

---

### `src/components/pages/` - Pagine Principali

Componenti che rappresentano le pagine complete dell'applicazione.

#### `About.js`
**Scopo**: Pagina personale con biografia, competenze e statistiche.

**Features**:
- Statistiche GitHub real-time
- Timeline personale interattiva
- Sezione competenze con progress bar
- Grafico linguaggi di programmazione
- Social links e call-to-action
- Design responsive con animazioni

**Hooks utilizzati**:
- `useGitHubStats()`: Statistiche repository
- `useSiteStats()`: Metriche del sito
- `usePersonalStats()`: Dati personali

#### `History.js`
**Scopo**: Storia del progetto con timeline dettagliata e statistiche GitHub.

**Features**:
- Sistema di tab (Timeline, Commits, Releases, Stats)
- Integrazione GitHub API per dati real-time
- Timeline interattiva con eventi
- Statistiche dettagliate sui commit
- Sezione releases con download
- Contributors e collaboratori

**API utilizzate**:
- GitHub API per commits
- GitHub API per releases
- GitHub API per statistiche repository

#### `Projects.js`
**Scopo**: Showcase dei progetti principali.

**Features**:
- Griglia progetti responsive
- Filtri per categoria/tecnologia
- Modal per dettagli progetto
- Link esterni a GitHub/demo

#### `CreationsPage.js`
**Scopo**: Galleria delle creazioni artistiche e creative.

**Features**:
- Galleria immagini responsive
- Categorie (arte, design, foto, etc.)
- Lightbox per visualizzazione dettagli

#### `Stocazzato.js`
**Scopo**: Pagina easter egg con contenuti divertenti.

**Features**:
- Attivazione tramite Header (10 click)
- Contenuti randomici
- Stile visivo alternativo
- Reset automatico

#### `WorkInProgress.js`
**Scopo**: Pagina placeholder per sezioni in sviluppo.

**Features**:
- Design temporaneo
- Informazioni sullo stato di sviluppo
- Link di ritorno alla homepage

---

### `src/components/books/` - Sistema Libri

Componenti per la gestione e visualizzazione di libri e racconti.

#### `BooksHome.js`
**Scopo**: Homepage del sistema libri con elenco opere.

**Features**:
- Lista libri disponibili
- Categorie (romanzi, racconti, novelle)
- Filtri e ricerca
- Anteprima opere

#### `BookOverview.js`
**Scopo**: Pagina di panoramica di un singolo libro.

**Features**:
- Informazioni libro (titolo, descrizione, capitoli)
- Indice navigabile
- Pulsanti di navigazione
- Progress reading

#### `BookChapter.js`
**Scopo**: Lettore per singoli capitoli.

**Features**:
- Visualizzazione testo formattato
- Navigazione capitoli (prev/next)
- Bookmark e segnalibri
- Modalità lettura ottimizzata

#### `BooksRouter.js`
**Scopo**: Router specifico per il sistema libri.

**Features**:
- Routing annidato per libri/capitoli
- Gestione parametri URL
- Breadcrumb navigation

---

## 🎯 Pattern di Sviluppo

### Convenzioni di Naming
- **Componenti**: PascalCase (es. `MyComponent.js`)
- **Hooks**: camelCase con prefisso 'use' (es. `useMyHook.js`)
- **Utilities**: camelCase (es. `formatDate.js`)

### Struttura File Componente
```javascript
// Imports
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Component
export default function MyComponent({ prop1, prop2 }) {
  // Hooks
  const { t } = useTranslation();
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Props e PropTypes
Ogni componente dovrebbe documentare le proprie props:

```javascript
// PropTypes (se utilizzati)
MyComponent.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};

// Default props
MyComponent.defaultProps = {
  prop2: 0
};
```

### Gestione Stato
- **Stato locale**: `useState` per stato del componente
- **Stato globale**: Context API per temi, lingua, etc.
- **Stato server**: Custom hooks per API calls

### Performance
- Utilizzo di `React.memo` per componenti che renderizzano spesso
- `useMemo` e `useCallback` per calcoli costosi
- Lazy loading per componenti pesanti

---

## 🔄 Flusso di Aggiornamento Componenti

1. **Modifica/Creazione**: Sviluppo del componente
2. **Test**: Verifica funzionalità
3. **Documentazione**: Aggiornamento questa documentazione
4. **Review**: Controllo codice e best practices
5. **Deploy**: Merge e deployment

---

## 📝 TODO e Miglioramenti Futuri

- [ ] Aggiungere PropTypes a tutti i componenti
- [ ] Implementare test unitari con Jest/RTL
- [ ] Aggiungere Storybook per component library
- [ ] Ottimizzare bundle size con code splitting
- [ ] Implementare Service Worker per PWA
- [ ] Aggiungere analytics e tracking
