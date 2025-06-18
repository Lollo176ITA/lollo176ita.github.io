# Hash Routing System Documentation

## Overview
This project uses a custom hash routing system optimized for GitHub Pages deployment. The system provides client-side routing while maintaining compatibility with static hosting.

## Core Components

### 1. `utils/hashRouter.js`
Central routing utility class with methods for:
- `parseHash()` - Parse current hash into path parts
- `navigate(path)` - Navigate to new path
- `replaceHash(path)` - Replace current hash without history entry
- `buildUrl(parts)` - Build hash URL from path parts
- `matchPath(pattern, path)` - Match path against pattern with params

### 2. `components/HashLink.js`
Enhanced link component with:
- Active state tracking
- Smooth navigation
- Accessibility support
- Custom styling for active links

### 3. `hooks/useHashRouter.js`
React hooks for routing:
- `useHashParams(pattern)` - Extract route parameters
- `useHashNavigation()` - Navigation utilities

### 4. `hooks/useNavigation.js`
Advanced navigation hooks:
- `useActiveRoute()` - Track active route state
- `useNavigationTracking()` - Navigation history and analytics

## Usage Examples

### Basic Navigation
```jsx
import HashLink from '../components/HashLink';

<HashLink to="/about" className="nav-link">
  About
</HashLink>
```

### Programmatic Navigation
```jsx
import { useHashNavigation } from '../hooks/useHashRouter';

function MyComponent() {
  const { navigate } = useHashNavigation();
  
  const handleClick = () => {
    navigate('/dashboard');
  };
}
```

### Route Parameters
```jsx
import { useHashParams } from '../hooks/useHashRouter';

function BookPage() {
  const params = useHashParams('books/:type/:slug');
  // params = { type: 'novel', slug: 'my-book' }
}
```

### Active Route Detection
```jsx
import { useActiveRoute } from '../hooks/useNavigation';

function NavItem({ path, children }) {
  const { isActive } = useActiveRoute();
  
  return (
    <HashLink 
      to={path}
      className={isActive(path) ? 'active' : 'inactive'}
    >
      {children}
    </HashLink>
  );
}
```

## Route Patterns

### Supported Routes
- `/` - Homepage
- `/about` - About page
- `/projects` - Projects page
- `/creations` - Creations overview
- `/creations/books` - Books listing
- `/creations/books/:type/:slug/overview` - Book overview
- `/creations/books/:type/:slug/:chapter` - Book chapter
- `/history` - Site history
- `/stocazzato` - Easter egg page

### Pattern Matching
Use `:param` syntax for dynamic segments:
```javascript
HashRouter.matchPath('books/:type/:slug', 'books/novel/my-story');
// Returns: { type: 'novel', slug: 'my-story' }
```

## Benefits

1. **GitHub Pages Compatible** - Pure client-side routing
2. **SEO Friendly** - Proper URL structure
3. **Performance** - No page reloads
4. **Accessibility** - Screen reader support
5. **Analytics Ready** - Track page views
6. **Developer Experience** - Type-safe routing

## Migration Guide

### From React Router
```jsx
// Old
import { Link, useNavigate } from 'react-router-dom';

// New
import HashLink from '../components/HashLink';
import { useHashNavigation } from '../hooks/useHashRouter';
```

### Update Links
```jsx
// Old
<Link to="/about">About</Link>

// New
<HashLink to="/about">About</HashLink>
```

### Update Navigation
```jsx
// Old
const navigate = useNavigate();
navigate('/dashboard');

// New
const { navigate } = useHashNavigation();
navigate('/dashboard');
```

## Best Practices

1. **Always use HashLink** for internal navigation
2. **Implement loading states** for async routes
3. **Handle 404 cases** gracefully
4. **Use breadcrumbs** for complex navigation
5. **Test on mobile devices** for touch navigation
6. **Implement proper focus management** for accessibility

## Debugging

### Common Issues
1. **Hash not updating** - Check if HashRouter.navigate() is called
2. **Active states not working** - Verify useActiveRoute() implementation
3. **Parameters not parsing** - Check pattern syntax in useHashParams()

### Debug Tools
```javascript
// Check current path
console.log(HashRouter.getCurrentPath());

// Parse hash manually
console.log(HashRouter.parseHash());

// Test pattern matching
console.log(HashRouter.matchPath('books/:type/:slug', 'books/novel/test'));
```
