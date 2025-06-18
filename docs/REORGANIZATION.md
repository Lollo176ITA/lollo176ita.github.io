# 🚀 Setup Script per Riorganizzazione Componenti

Questo script automatizza la riorganizzazione dei componenti nella nuova struttura.

## Operazioni da Eseguire

### 1. Verifica Struttura Attuale
I componenti sono già organizzati nelle cartelle corrette:
- ✅ `src/components/common/` - Componenti condivisi
- ✅ `src/components/layout/` - Componenti di layout  
- ✅ `src/components/pages/` - Pagine principali
- ✅ `src/components/books/` - Sistema libri

### 2. File da Sistemare
Alcuni file potrebbero essere nella root di `components/` e vanno spostati:

```bash
# File di backup da rimuovere o spostare
src/components/History_backup.js  -> da rimuovere (backup)
src/components/History_new.js     -> da rimuovere (temporary)
src/components/RouteDebugger.js   -> spostare in utils/

# Verificare che tutti i componenti siano nelle cartelle corrette
```

### 3. Aggiornare Import Paths
Dopo la riorganizzazione, aggiornare tutti gli import nei file:

```javascript
// Da:
import Header from './components/Header';
import About from './components/About';

// A:
import Header from './components/common/Header';
import About from './components/pages/About';
```

### 4. Creare Index Files
Creare file index.js per ogni cartella per semplificare gli import:

```javascript
// src/components/common/index.js
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Navbar } from './Navbar';
export { default as ThemeSwitch } from './ThemeSwitch';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export { default as HashLink } from './HashLink';

// src/components/layout/index.js
export { default as Hero } from './Hero';
export { default as HeroText } from './HeroText';
export { default as AnimatedGrid } from './AnimatedGrid';

// src/components/pages/index.js
export { default as About } from './About';
export { default as History } from './History';
export { default as Projects } from './Projects';
export { default as CreationsPage } from './CreationsPage';
export { default as Stocazzato } from './Stocazzato';
export { default as WorkInProgress } from './WorkInProgress';

// src/components/books/index.js
export { default as BooksHome } from './BooksHome';
export { default as BookOverview } from './BookOverview';
export { default as BookChapter } from './BookChapter';
export { default as BooksRouter } from './BooksRouter';
```

### 5. Aggiornare Import Principali
```javascript
// Invece di import multipli:
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Usare:
import { Header, Footer, Navbar } from './components/common';
```

## Comandi PowerShell per Automazione

```powershell
# 1. Pulizia file temporanei/backup
Remove-Item "src\components\History_backup.js" -ErrorAction SilentlyContinue
Remove-Item "src\components\History_new.js" -ErrorAction SilentlyContinue

# 2. Creare cartella utils se non esiste
New-Item -ItemType Directory -Path "src\utils" -Force

# 3. Spostare RouteDebugger in utils
Move-Item "src\components\RouteDebugger.js" "src\utils\RouteDebugger.js" -ErrorAction SilentlyContinue

# 4. Verificare struttura
Get-ChildItem "src\components" -Recurse -Name
```

## Checklist Post-Riorganizzazione

### File Structure
- [ ] Tutti i componenti sono nelle cartelle corrette
- [ ] File di backup rimossi
- [ ] File index.js creati per ogni cartella
- [ ] Utility files in src/utils/

### Import Updates
- [ ] Homepage.js import aggiornati
- [ ] App.js import aggiornati
- [ ] Tutti i cross-imports tra componenti aggiornati
- [ ] Test imports (se presenti) aggiornati

### Testing
- [ ] Build successful (`npm run build`)
- [ ] Dev server starts (`npm start`)
- [ ] Tutte le pagine caricano correttamente
- [ ] Navigazione funziona
- [ ] Nessun errore console

### Documentation
- [ ] README.md aggiornato con nuova struttura
- [ ] COMPONENTS.md riflette l'organizzazione attuale
- [ ] Commenti nel codice aggiornati se necessario

## Script di Verifica

```javascript
// scripts/verify-structure.js
const fs = require('fs');
const path = require('path');

const expectedStructure = {
  'src/components/common': ['Header.js', 'Footer.js', 'Navbar.js', 'ThemeSwitch.js', 'LanguageSwitcher.js', 'HashLink.js'],
  'src/components/layout': ['Hero.js', 'HeroText.js', 'AnimatedGrid.js'],
  'src/components/pages': ['About.js', 'History.js', 'Projects.js', 'CreationsPage.js', 'Stocazzato.js', 'WorkInProgress.js'],
  'src/components/books': ['BooksHome.js', 'BookOverview.js', 'BookChapter.js', 'BooksRouter.js']
};

function verifyStructure() {
  let allGood = true;
  
  Object.entries(expectedStructure).forEach(([dir, files]) => {
    console.log(`Checking ${dir}...`);
    
    if (!fs.existsSync(dir)) {
      console.error(`❌ Directory ${dir} does not exist`);
      allGood = false;
      return;
    }
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${filePath}`);
      } else {
        console.error(`❌ Missing: ${filePath}`);
        allGood = false;
      }
    });
  });
  
  if (allGood) {
    console.log('\n🎉 Structure verification passed!');
  } else {
    console.log('\n❌ Structure verification failed!');
  }
}

verifyStructure();
```

## Benefici della Riorganizzazione

### 1. **Manutenibilità**
- Facile trovare componenti specifici
- Logica di business separata dalla presentazione
- Riduzione dell'accoppiamento

### 2. **Scalabilità** 
- Nuovi componenti vanno in cartelle logiche
- Team multipli possono lavorare su aree diverse
- Import semplificati

### 3. **Developer Experience**
- IDE autocomplete migliorato
- Navigazione codice più veloce
- Onboarding nuovi sviluppatori facilitato

### 4. **Performance**
- Tree shaking più efficace
- Code splitting per categoria
- Bundle analysis semplificato

---

*Esegui questo setup dopo aver verificato che non ci siano modifiche pendenti nel repository.*
