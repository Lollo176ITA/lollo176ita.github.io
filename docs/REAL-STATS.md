# 📊 Sistema di Statistiche Reali

Questo documento descrive il sistema implementato per calcolare e utilizzare statistiche reali del progetto invece di dati mock.

## 🎯 Panoramica

Il sistema di statistiche reali analizza automaticamente il progetto locale e combina i dati con informazioni dall'API GitHub per fornire metriche accurate e aggiornate.

## 🏗️ Architettura

### 📁 File Principali

```
scripts/
├── generate-stats.js        # Script principale calcolo statistiche  
└── pre-commit-hook.js       # Hook automatico pre-commit

src/
├── hooks/useStats.js        # Hook React aggiornati
└── data/project-stats.json  # Statistiche generate

public/
└── project-stats.json      # Copia per accesso HTTP
```

## 🔧 Funzionalità

### 1. **Script di Generazione** (`generate-stats.js`)

Scansiona automaticamente il progetto e calcola:

#### 📄 **Analisi Codice**
- **File totali**: Conta tutti i file di codice (.js, .jsx, .css, .json, .md)
- **Righe di codice**: Escluse righe vuote e commenti
- **Distribuzione linguaggi**: Percentuali per tipo di file
- **Componenti React**: Rilevamento automatico componenti

#### 🏗️ **Struttura Progetto**
- **Route**: Conta `<Route>` in App.js
- **Hooks**: File in `src/hooks/`
- **Libri**: Analizza `src/data/books.js`
- **Capitoli**: Conta capitoli nei libri

#### 🔄 **Statistiche Git**
- **Commit totali**: `git rev-list --count HEAD`
- **Contributors**: `git shortlog -sn`
- **Branch**: `git branch -r`
- **Ultimo commit**: Hash, messaggio, autore, data

#### 📦 **Informazioni Package**
- **Nome e versione**: Da `package.json`
- **Dipendenze**: Conta dependencies + devDependencies
- **Script**: Numero di script npm disponibili

### 2. **Hook React Aggiornati** (`useStats.js`)

#### `useGitHubStats()`
- **Dati combinati**: Locale + GitHub API
- **Fallback intelligente**: Se API non disponibile, usa dati locali
- **Linguaggi**: Percentuali da GitHub o analisi locale
- **Commit accurati**: Dati Git locali invece che API

#### `useSiteStats()`  
- **Metriche reali**: Carica da `project-stats.json`
- **Performance**: Build time e dimensioni
- **Struttura**: Componenti, route, file reali

#### `usePersonalStats()`
- **Calcoli basati su dati reali**: Usa commit e statistiche progetto
- **Stime intelligenti**: Caffè per commit, bug fix percentuali

## ⚙️ Configurazione e Utilizzo

### Script NPM

```bash
# Genera statistiche manualmente
npm run stats

# Genera statistiche e avvia dev server
npm run stats:watch

# Build con statistiche aggiornate (automatico)
npm run build

# Hook pre-commit (manuale)
npm run precommit
```

### Automazione Build

Le statistiche vengono **automaticamente rigenerate** ad ogni build:

```json
{
  "scripts": {
    "build": "npm run stats && react-scripts build"
  }
}
```

### Pre-commit Hook

Per aggiornare le statistiche ad ogni commit:

```bash
# Aggiungi al tuo git hook
cp scripts/pre-commit-hook.js .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## 📊 Dati Generati

### Esempio Output `project-stats.json`:

```json
{
  "generated": "2025-06-18T12:28:42.678Z",
  "generationTime": 258,
  "project": {
    "name": "lollo176ita.github.io",
    "version": "0.1.0",
    "dependencies": 20,
    "devDependencies": 5
  },
  "code": {
    "files": 48,
    "totalLines": 4240,
    "codeLines": 3958,
    "languages": {
      "JavaScript": { "files": 39, "lines": 3062, "percentage": 81.1 },
      "JSON": { "files": 6, "lines": 616, "percentage": 16.3 },
      "CSS": { "files": 2, "lines": 96, "percentage": 2.5 }
    }
  },
  "structure": {
    "components": 19,
    "routes": 8,
    "books": 2,
    "chapters": 4,
    "hooks": 3
  },
  "git": {
    "commits": 95,
    "contributors": 1,
    "branches": 12,
    "lastCommit": {
      "hash": "c8f7114",
      "message": "feat: Update project structure", 
      "author": "Lollo176ITA",
      "date": "2025-06-18T10:35:30.000Z"
    }
  }
}
```

## 🎨 Utilizzo nei Componenti

### About.js
```javascript
import { useGitHubStats, useSiteStats, usePersonalStats } from '../hooks/useStats';

function About() {
  const githubStats = useGitHubStats(); // Dati reali Git + GitHub
  const siteStats = useSiteStats();     // Metriche progetto reali
  const personalStats = usePersonalStats(); // Statistiche personali

  return (
    <div>
      <p>Commit reali: {githubStats.commits}</p>
      <p>Righe di codice: {siteStats.linesOfCode.toLocaleString()}</p>
      <p>Componenti: {siteStats.components}</p>
    </div>
  );
}
```

### History.js
```javascript
import { useGitHubStats } from '../hooks/useStats';

function History() {
  const { commits, lastCommit, languages } = useGitHubStats();
  
  return (
    <div>
      <p>Ultimo commit: {lastCommit?.message}</p>
      <p>Linguaggi: {Object.keys(languages).join(', ')}</p>
    </div>
  );
}
```

## 🔄 Workflow di Aggiornamento

### Sviluppo Locale
1. **Modifica codice** → Crea/modifica file
2. **`npm run stats`** → Rigenera statistiche
3. **`npm start`** → Vedi statistiche aggiornate in tempo reale

### Commit
1. **`git add .`** → Aggiungi modifiche
2. **`npm run precommit`** → Aggiorna statistiche automaticamente  
3. **`git commit`** → Commit include statistiche aggiornate

### Deploy
1. **`npm run build`** → Build con statistiche fresche
2. **`npm run deploy`** → Deploy con dati accurati

## 🎯 Benefici

### ✅ **Accuratezza**
- **Dati reali** invece di mock/stime
- **Aggiornamento automatico** ad ogni modifica
- **Sincronizzazione** con stato effettivo progetto

### ⚡ **Performance**  
- **Cache intelligente** per evitare ricalcoli
- **Fallback robusti** se API non disponibili
- **Generazione veloce** (<300ms)

### 🛠️ **Manutenibilità**
- **Zero configurazione manuale** 
- **Auto-discovery** di componenti e struttura
- **Evolutivo** con crescita progetto

### 📈 **Insights**
- **Metriche reali crescita** del progetto
- **Distribuzione linguaggi accurata**
- **Timeline commit effettiva**

## 🚀 Estensioni Future

- [ ] **Build performance tracking**: Tempo build per commit
- [ ] **Lighthouse scores automatici**: Metriche performance
- [ ] **Dependency analysis**: Analisi dipendenze e vulnerabilità  
- [ ] **Code complexity metrics**: Calcolo complessità ciclomatica
- [ ] **Test coverage integration**: Statistiche coverage test
- [ ] **Bundle size tracking**: Evoluzione dimensioni nel tempo

---

**Questo sistema trasforma le statistiche da dati approssimativi a metriche precise e significative, fornendo una visione accurata dello stato e crescita del progetto.**
