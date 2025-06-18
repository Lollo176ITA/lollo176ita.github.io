# 🏛️ Architettura e Best Practices

Documento che descrive l'architettura del progetto, le best practices adottate e le linee guida per lo sviluppo.

## 🎯 Principi Architetturali

### 1. **Separation of Concerns**
- **Componenti**: Logica di presentazione
- **Hooks**: Logica di business e stato
- **Data**: Dati statici e configurazioni
- **Services**: Chiamate API e utilità

### 2. **Component Composition**
- Preferire composizione a ereditarietà
- Componenti piccoli e riutilizzabili
- Props drilling limitato tramite Context

### 3. **Performance First**
- Bundle splitting e lazy loading
- Memoization strategica
- Ottimizzazione rendering

## 🔧 Stack Tecnologico

### Core
```
React 18.0+          -> UI Framework
React Router 6.0+    -> Client-side routing
Tailwind CSS 3.0+   -> Utility-first CSS
```

### State Management
```
React Context        -> Tema, lingua, preferenze
useState/useReducer  -> Stato locale componenti
Custom Hooks         -> Logica riutilizzabile
```

### Internazionalizzazione
```
react-i18next        -> Traduzioni e localizzazione
```

### Icons & UI
```
react-icons          -> Libreria icone
Tailwind UI patterns -> Componenti pre-stilizzati
```

### Development Tools
```
Create React App     -> Build toolchain
ESLint              -> Code linting
Prettier            -> Code formatting
```

## 📁 Struttura del Progetto

```
src/
├── components/              # Componenti React
│   ├── common/             # Componenti condivisi
│   │   ├── Header.js       # Intestazione
│   │   ├── Footer.js       # Piè di pagina
│   │   ├── Navbar.js       # Navigazione
│   │   ├── ThemeSwitch.js  # Switch tema
│   │   └── LanguageSwitcher.js
│   ├── layout/             # Componenti layout
│   │   ├── Hero.js         # Sezione hero
│   │   ├── HeroText.js     # Testo animato
│   │   └── AnimatedGrid.js # Griglia animata
│   ├── pages/              # Pagine principali
│   │   ├── About.js        # Chi sono
│   │   ├── History.js      # Storia progetto
│   │   ├── Projects.js     # Progetti
│   │   └── CreationsPage.js
│   └── books/              # Sistema libri
│       ├── BooksHome.js    # Homepage libri
│       ├── BookOverview.js # Panoramica libro
│       └── BookChapter.js  # Lettore capitoli
├── hooks/                  # Custom hooks
│   ├── useStats.js         # Statistiche
│   ├── useTheme.js         # Gestione tema
│   └── useHashNavigation.js # Navigazione hash
├── contexts/               # React Contexts
│   └── ThemeContext.js     # Context tema
├── data/                   # Dati statici
│   ├── history.it.json     # Timeline italiana
│   ├── history.en.json     # Timeline inglese
│   └── books.js            # Dati libri
├── locales/                # Traduzioni i18n
│   ├── it/translation.json # Italiano
│   └── en/translation.json # Inglese
├── pages/                  # Pagine principali
│   └── Homepage.js         # Homepage
├── utils/                  # Utilities
│   ├── constants.js        # Costanti
│   └── helpers.js          # Funzioni helper
└── styles/                 # Stili personalizzati
    └── index.css           # CSS globale
```

## 🎨 Design System

### Colori
```css
/* Light Mode */
--primary: #3B82F6      /* Blue-500 */
--secondary: #6B7280    /* Gray-500 */
--accent: #10B981       /* Emerald-500 */
--background: #FFFFFF   /* White */
--surface: #F9FAFB      /* Gray-50 */
--text: #111827         /* Gray-900 */

/* Dark Mode */
--primary: #60A5FA      /* Blue-400 */
--secondary: #9CA3AF    /* Gray-400 */
--accent: #34D399       /* Emerald-400 */
--background: #111827   /* Gray-900 */
--surface: #1F2937      /* Gray-800 */
--text: #F9FAFB         /* Gray-50 */
```

### Typography
```css
/* Font Families */
font-sans: 'Inter', system-ui, sans-serif
font-mono: 'JetBrains Mono', monospace

/* Scale */
text-xs: 0.75rem    /* 12px */
text-sm: 0.875rem   /* 14px */
text-base: 1rem     /* 16px */
text-lg: 1.125rem   /* 18px */
text-xl: 1.25rem    /* 20px */
text-2xl: 1.5rem    /* 24px */
text-3xl: 1.875rem  /* 30px */
text-4xl: 2.25rem   /* 36px */
```

### Spacing
```css
/* Tailwind spacing scale (0.25rem = 4px) */
0: 0px
1: 0.25rem   /* 4px */
2: 0.5rem    /* 8px */
4: 1rem      /* 16px */
8: 2rem      /* 32px */
12: 3rem     /* 48px */
16: 4rem     /* 64px */
```

## 🔧 Best Practices

### Componenti React

#### 1. **Naming Convention**
```javascript
// ✅ Good - PascalCase per componenti
export default function UserProfile() {}

// ❌ Bad
export default function userProfile() {}
export default function user_profile() {}
```

#### 2. **Destructuring Props**
```javascript
// ✅ Good - Destructuring diretto
function UserCard({ name, email, avatar }) {
  return (/* JSX */);
}

// ❌ Bad
function UserCard(props) {
  return <div>{props.name}</div>;
}
```

#### 3. **Conditional Rendering**
```javascript
// ✅ Good - Logical AND per esistenza
{user && <UserProfile user={user} />}

// ✅ Good - Ternary per alternative
{isLoading ? <Spinner /> : <Content />}

// ❌ Bad - Ternary con null
{isLoading ? <Spinner /> : null}
```

#### 4. **Event Handlers**
```javascript
// ✅ Good - Arrow function inline per semplici
<button onClick={() => setCount(count + 1)}>

// ✅ Good - Function declaration per complessi
const handleSubmit = (event) => {
  event.preventDefault();
  // complex logic
};
<form onSubmit={handleSubmit}>
```

### State Management

#### 1. **useState Pattern**
```javascript
// ✅ Good - Stato derivato calcolato
const [todos, setTodos] = useState([]);
const completedCount = todos.filter(todo => todo.completed).length;

// ❌ Bad - Stato ridondante
const [todos, setTodos] = useState([]);
const [completedCount, setCompletedCount] = useState(0);
```

#### 2. **useEffect Dependencies**
```javascript
// ✅ Good - Dipendenze specifiche
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ❌ Bad - Array vuoto quando ci sono dipendenze
useEffect(() => {
  fetchUser(userId);
}, []); // userId potrebbe cambiare
```

#### 3. **Custom Hooks**
```javascript
// ✅ Good - Logica estratta in hook
function useGitHubStats(username) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchGitHubStats(username).then(setStats).finally(() => setLoading(false));
  }, [username]);
  
  return { stats, loading };
}
```

### Performance

#### 1. **React.memo**
```javascript
// ✅ Good - Memo per componenti che renderizzano spesso
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive rendering */}</div>;
});
```

#### 2. **useMemo per calcoli costosi**
```javascript
// ✅ Good
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);
```

#### 3. **useCallback per handlers**
```javascript
// ✅ Good - Prevent child re-renders
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);
```

### CSS/Styling

#### 1. **Tailwind Utilities**
```jsx
// ✅ Good - Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ❌ Bad - Inline styles
<div style={{ display: 'flex', alignItems: 'center', ... }}>
```

#### 2. **Responsive Design**
```jsx
// ✅ Good - Mobile-first responsive
<div className="text-sm md:text-base lg:text-lg">

// ✅ Good - Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### 3. **Dark Mode**
```jsx
// ✅ Good - Dark mode variants
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### Accessibilità

#### 1. **Semantic HTML**
```jsx
// ✅ Good
<main>
  <section>
    <h1>Page Title</h1>
    <article>Content</article>
  </section>
</main>

// ❌ Bad
<div>
  <div>
    <div>Page Title</div>
    <div>Content</div>
  </div>
</div>
```

#### 2. **ARIA Labels**
```jsx
// ✅ Good
<button aria-label="Close dialog" onClick={onClose}>
  <XIcon />
</button>

<input aria-describedby="email-error" />
<div id="email-error">Invalid email</div>
```

#### 3. **Keyboard Navigation**
```jsx
// ✅ Good
<div 
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
  onClick={onClick}
>
```

## 🔄 Development Workflow

### 1. **Feature Development**
```bash
# Crea branch feature
git checkout -b feature/new-component

# Sviluppa la feature
# - Crea/modifica componenti
# - Aggiorna traduzioni se necessario
# - Testa la funzionalità

# Commit con messaggio descrittivo
git commit -m "feat: add new user profile component"

# Push e Pull Request
git push origin feature/new-component
```

### 2. **Code Review Checklist**
- [ ] Componenti seguono naming convention
- [ ] Props sono documentate
- [ ] State management è appropriato
- [ ] Performance considerations (memo, callback)
- [ ] Accessibilità implementata
- [ ] Responsive design testato
- [ ] Traduzioni aggiornate
- [ ] ESLint warnings risolti

### 3. **Testing Strategy**
```javascript
// Unit Tests (quando implementati)
- Componenti isolati
- Custom hooks
- Utility functions

// Integration Tests
- User interactions
- Navigation flow
- API integrations

// E2E Tests
- Complete user journeys
- Cross-browser compatibility
```

## 📊 Monitoring e Analytics

### Performance Metrics
- **LCP**: Largest Contentful Paint < 2.5s
- **FID**: First Input Delay < 100ms
- **CLS**: Cumulative Layout Shift < 0.1
- **Bundle Size**: Mantieni sotto 250KB gzipped

### User Experience
- Mobile-first responsive design
- Dark/light mode support
- Internazionalizzazione completa
- Navigazione accessibile

## 🚀 Deployment

### Build Process
```bash
# Development
npm start        # Dev server con hot reload

# Production Build
npm run build    # Ottimized build per deployment

# Testing
npm test         # Run test suite

# Linting
npm run lint     # ESLint check
npm run lint:fix # Auto-fix issues
```

### Deployment Checklist
- [ ] Build successful
- [ ] No console errors
- [ ] All routes working
- [ ] Mobile responsive
- [ ] Dark mode functional
- [ ] All languages working
- [ ] Performance metrics good
- [ ] SEO meta tags updated

---

*Questo documento è vivo e deve essere aggiornato man mano che il progetto evolve.*
