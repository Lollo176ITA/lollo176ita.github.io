# Project Architecture and Best Practices

This document describes the architectural principles, patterns, and development guidelines for the project.

## Table of Contents

- [Architectural Principles](#architectural-principles)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Best Practices](#best-practices)
- [Performance Considerations](#performance-considerations)
- [State Management](#state-management)
- [Routing Architecture](#routing-architecture)

## Architectural Principles

### 1. Separation of Concerns

The project follows a clear separation of concerns:

- **Components**: Presentation logic and UI rendering
- **Hooks**: Business logic and state management
- **Data**: Static data and configurations
- **Utils**: Utility functions and helpers
- **Context**: Global state management

### 2. Component Composition

- Prefer composition over inheritance
- Create small, reusable components
- Minimize props drilling through Context API
- Use children props for flexible layouts

### 3. Performance First

- Implement code splitting and lazy loading
- Strategic memoization for expensive operations
- Optimize rendering with React.memo
- Bundle size optimization through chunk splitting

## Technology Stack

### Core Framework

```
React 19.1.0               Modern UI framework with concurrent features
React Router DOM 7.6.2     Client-side routing with hash support
Tailwind CSS 3.4.15       Utility-first CSS framework
Framer Motion 12.19.1      Animation library
```

### State Management

```
React Context              Global state (theme, language, preferences)
useState/useReducer        Local component state
Custom Hooks               Reusable business logic
```

### Internationalization

```
react-i18next 15.5.3      Translation framework
i18next 25.2.1            Core i18n engine
```

### Build Tools

```
CRACO 7.1.0               Create React App configuration
Webpack                    Module bundler
PostCSS                    CSS processing
Terser                     JavaScript minification
```

### Development Tools

```
ESLint                     Code linting
Lighthouse                 Performance auditing
Source Map Explorer        Bundle analysis
Depcheck                   Dependency checking
```

## Project Structure

```
src/
├── components/                    # React components
│   ├── common/                   # Shared components
│   │   ├── Header.js            # Main header with navigation
│   │   ├── Footer.js            # Site footer
│   │   ├── Navbar.js            # Navigation bar
│   │   ├── ThemeSwitch.js       # Dark/light theme toggle
│   │   ├── LanguageSwitcher.js  # Language selector
│   │   ├── HashLink.js          # Custom hash navigation link
│   │   └── TrophySystem.js      # Gamification system
│   │
│   ├── layout/                   # Layout components
│   │   ├── Hero.js              # Hero section
│   │   ├── HeroText.js          # Animated hero text
│   │   └── AnimatedGrid.js      # Background grid animation
│   │
│   ├── pages/                    # Page components
│   │   ├── About.js             # About page
│   │   ├── History.js           # Project history
│   │   ├── Projects.js          # Projects showcase
│   │   ├── CreationsPage.js     # Creations gallery
│   │   ├── TrophiesPage.js      # Trophy achievements
│   │   ├── LighthouseStats.js   # Performance metrics
│   │   └── WorkInProgress.js    # WIP pages
│   │
│   ├── books/                    # Book system
│   │   ├── BooksHome.js         # Books homepage
│   │   ├── BooksRouter.js       # Book routing logic
│   │   ├── BookOverview.js      # Book overview page
│   │   └── BookChapter.js       # Chapter reader
│   │
│   └── animations/               # Animation components
│       └── LazyMotion.js        # Framer Motion lazy loader
│
├── hooks/                        # Custom React hooks
│   ├── useHashRouter.js         # Hash routing hooks
│   ├── useNavigation.js         # Navigation utilities
│   └── useStats.js              # Statistics fetching
│
├── data/                         # Static data
│   ├── books.js                 # Books data
│   ├── trophies.js              # Trophy configurations
│   ├── history.it.json          # Italian timeline
│   ├── history.en.json          # English timeline
│   └── project-stats.json       # Generated statistics
│
├── locales/                      # i18n translations
│   ├── en/translation.json      # English translations
│   └── it/translation.json      # Italian translations
│
├── utils/                        # Utility functions
│   ├── hashRouter.js            # Hash routing system
│   ├── analytics.js             # Analytics utilities
│   ├── serviceWorker.js         # Service Worker management
│   └── RouteDebugger.js         # Routing debugger
│
├── pages/                        # Main pages
│   └── Homepage.js              # Homepage component
│
├── App.js                        # Root component
├── index.js                      # Application entry point
├── i18n.js                       # i18n configuration
└── ThemeContext.js               # Theme context provider
```

## Design System

### Color Palette

#### Light Mode

```css
Primary:      #3B82F6    /* Blue-500 */
Secondary:    #6B7280    /* Gray-500 */
Accent:       #10B981    /* Emerald-500 */
Background:   #FFFFFF    /* White */
Surface:      #F9FAFB    /* Gray-50 */
Text:         #111827    /* Gray-900 */
```

#### Dark Mode

```css
Primary:      #60A5FA    /* Blue-400 */
Secondary:    #9CA3AF    /* Gray-400 */
Accent:       #34D399    /* Emerald-400 */
Background:   #111827    /* Gray-900 */
Surface:      #1F2937    /* Gray-800 */
Text:         #F9FAFB    /* Gray-50 */
```

### Typography

```css
Font Family:
  - Sans: 'Inter', system-ui, sans-serif
  - Mono: 'JetBrains Mono', monospace

Font Scale:
  - xs:   0.75rem   (12px)
  - sm:   0.875rem  (14px)
  - base: 1rem      (16px)
  - lg:   1.125rem  (18px)
  - xl:   1.25rem   (20px)
  - 2xl:  1.5rem    (24px)
  - 3xl:  1.875rem  (30px)
  - 4xl:  2.25rem   (36px)
```

### Spacing

Based on Tailwind's spacing scale (0.25rem = 4px):

```
0:  0px
1:  4px
2:  8px
4:  16px
8:  32px
12: 48px
16: 64px
```

## Best Practices

### Component Guidelines

#### Naming Conventions

```javascript
// Good - PascalCase for components
export default function UserProfile() {}

// Bad - camelCase or snake_case
export default function userProfile() {}
```

#### Props Destructuring

```javascript
// Good - Destructure in function signature
function UserCard({ name, email, avatar }) {
  return <div>{name}</div>;
}

// Avoid - Accessing via props object
function UserCard(props) {
  return <div>{props.name}</div>;
}
```

#### Conditional Rendering

```javascript
// Good - Logical AND for existence checks
{user && <UserProfile user={user} />}

// Good - Ternary for alternatives
{isLoading ? <Spinner /> : <Content />}

// Good - Early return for complex conditions
if (!user) return null;
return <UserProfile user={user} />;
```

#### Event Handlers

```javascript
// Simple handlers - Inline arrow function
<button onClick={() => setCount(count + 1)}>

// Complex handlers - Separate function
const handleSubmit = (event) => {
  event.preventDefault();
  // Complex logic here
};

<form onSubmit={handleSubmit}>
```

### Custom Hooks

#### Guidelines

- Prefix with "use" (e.g., `useHashRouter`)
- Extract reusable logic from components
- Return objects for multiple values
- Keep hooks focused and single-purpose

#### Example

```javascript
function useHashRouter(pattern) {
  const [params, setParams] = useState({});
  
  useEffect(() => {
    const match = matchPath(pattern);
    setParams(match?.params || {});
  }, [pattern]);
  
  return { params };
}
```

### File Organization

- One component per file
- Co-locate related components in subdirectories
- Index files for clean imports
- Keep files under 300 lines when possible

### Code Style

- Use functional components with hooks
- Prefer const over let
- Use template literals for string concatenation
- Destructure objects and arrays
- Use optional chaining (`?.`) for nested properties
- Use nullish coalescing (`??`) for default values

## Performance Considerations

### Code Splitting

```javascript
// Lazy load non-critical components
const About = React.lazy(() => import('./components/pages/About'));
const History = React.lazy(() => import('./components/pages/History'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <About />
</Suspense>
```

### Memoization

```javascript
// Memoize expensive components
const MemoizedComponent = React.memo(ExpensiveComponent);

// Memoize expensive calculations
const sortedData = useMemo(
  () => data.sort(compareFunction),
  [data]
);

// Memoize callback functions
const handleClick = useCallback(
  () => doSomething(value),
  [value]
);
```

### Bundle Optimization

- Strategic chunk splitting (see `craco.config.js`)
- Separate vendor bundles for large libraries
- Tree shaking for unused code elimination
- Minification and compression in production

Current bundle metrics:
- Main bundle: ~131KB (73% reduction from initial)
- 12 separate chunks for optimal loading
- Brotli and Gzip compression enabled

## State Management

### Local State

Use `useState` for component-level state:

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Global State

Use Context API for app-wide state:

```javascript
// ThemeContext.js
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage in components
const { theme, setTheme } = useContext(ThemeContext);
```

### Complex State

Use `useReducer` for complex state logic:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>
      {state.count}
    </button>
  );
}
```

## Routing Architecture

### Hash-Based Routing

The project uses a custom hash-based routing system optimized for GitHub Pages:

```javascript
// Basic navigation
<HashLink to="/about">About</HashLink>

// Programmatic navigation
const { navigate } = useHashNavigation();
navigate('/projects');

// Route parameters
const params = useHashParams('books/:type/:slug');
```

### Supported Routes

```
/                                    Homepage
/about                              About page
/projects                           Projects showcase
/history                            Project history
/creations                          Creations overview
/creations/books                    Books listing
/creations/books/:type/:name/overview    Book overview
/creations/books/:type/:name/:chapter    Book chapter
/trophies                           Trophy achievements
/lighthouse-stats                   Performance metrics
/stocazzato                         Easter egg page
```

For detailed routing documentation, see [technical/HASH_ROUTING.md](./technical/HASH_ROUTING.md).

## Testing Guidelines

### Component Testing

```javascript
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders user name', () => {
  render(<UserProfile name="John Doe" />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### Hook Testing

```javascript
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Use ARIA attributes when necessary
- Test with screen readers

Current accessibility score: 88/100 (Lighthouse)

## Documentation

- Document complex logic with comments
- Use JSDoc for function documentation
- Keep README files updated
- Document breaking changes in CHANGELOG
- Include usage examples in component documentation

## Version Control

- Follow [Conventional Commits](./CONVENTIONAL_COMMITS.md)
- Create feature branches from main
- Write descriptive commit messages
- Keep commits focused and atomic
- Review code before merging

---

Last updated: October 2025
