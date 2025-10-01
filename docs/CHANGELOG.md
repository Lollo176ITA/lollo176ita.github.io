# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.8] - 2025-07-15

### Added
- Complete trophy system with gamification features
  - 9 unlockable trophies with 5 rarity levels (Common, Uncommon, Rare, Epic, Legendary)
  - Persistent storage using localStorage
  - Animated pop-ups with Framer Motion
  - Trophy page with progress tracking
  - Multilingual support (Italian/English)
- Trophy triggers integrated throughout the site
  - First visitor detection
  - Grid game completion (normal and speed demon modes)
  - Page exploration tracking
  - Theme switching detection
  - Completionist achievement (5+ trophies)
- Footer link to trophies page
- Debug logging system for trophy troubleshooting

### Changed
- Improved trophy UI with rarity indicators
- Enhanced pop-up design with action buttons
- Hidden trophy descriptions until unlocked
- Optimized trophy unlock checks for performance

### Fixed
- Duplicate trophy unlock prevention
- Trophy persistence across sessions
- Mobile responsiveness for trophy page

## [2.2.7] - 2025-06-26

### Added
- Advanced commit categorization system with 11 categories
- New commit types: merge, test, security, performance, chore
- Extended color palette for commit visualization
- Complete translations for new commit categories

### Changed
- Improved History page component architecture
  - Split into modular components in `history-sections/`
  - Reduced main file from 730+ to 300 lines
  - Better maintainability and reusability
- Enhanced commit icon system with specific icons per category
- Updated commit matching logic for better categorization

### Fixed
- Missing English translations for History page
- Mobile layout overflow issues for statistics
- Repository name display on small screens
- Commit type label positioning

## [2.2.6] - 2025-06-19

### Added
- "Me in Pieces" interactive component
  - 12 anatomical organs with realistic colors
  - Modal system with detailed statistics
  - Hover effects and animations
  - Multilingual support

### Changed
- Complete redesign from journey visualization to anatomical grid
- Improved contrast for organ icons and text
- Better accessibility with dynamic text colors
- Responsive grid layout (2x6 mobile, 4x3 desktop)

### Fixed
- Text contrast on light-colored organs
- Icon visibility across all backgrounds
- Modal button translations

## [2.2.5] - 2025-06-19

### Added
- RandomStats carousel component for interactive statistics
- Animated transitions between stat categories
- Category-based statistics organization

## [2.2.0] - 2025-06-15

### Added
- Real statistics system
  - Automated code analysis scripts
  - Git statistics integration
  - GitHub API integration
  - Lighthouse metrics automation
- Custom hash routing system optimized for GitHub Pages
  - HashRouter utility class
  - HashLink component
  - useHashRouter and useNavigation hooks
  - Dynamic route parameter extraction

### Changed
- Migration from React Router to custom hash routing
- Statistics now use real data instead of mock values
- Improved performance with code splitting
- Bundle size optimization (495KB → 131KB, -73%)

### Fixed
- GitHub Pages routing issues
- Statistics accuracy and real-time updates
- Service Worker cache errors
- React lazy loading issues

## [2.1.0] - 2025-06-01

### Added
- Books system for publishing stories and novels
  - BooksHome component for listing
  - BookOverview for book details
  - BookChapter reader with navigation
  - BooksRouter for routing logic
- Service Worker for PWA features
  - Cache strategies for offline support
  - Retry logic for failed requests
  - Automatic cache updates

### Changed
- Improved mobile navigation
- Enhanced dark mode contrast
- Updated footer with additional links

### Fixed
- Service Worker installation failures
- Cache miss handling for chunks
- Mobile menu accessibility

## [2.0.0] - 2025-05-15

### Added
- Complete project restructuring
  - Organized components into common/, layout/, pages/, books/
  - Custom hooks for reusable logic
  - Centralized data management
- Internationalization system (i18next)
  - Full Italian and English support
  - Dynamic language switching
  - Persistent language preference
- Theme system
  - Light and dark modes
  - System preference detection
  - Smooth theme transitions
- Performance optimizations
  - Lazy loading for non-critical components
  - Code splitting strategy
  - Bundle optimization
  - Build time improvements

### Changed
- Migration to React 19
- Updated to Tailwind CSS 3.4
- Modernized build pipeline with CRACO
- Enhanced responsive design

### Removed
- Legacy component structure
- Hardcoded text (replaced with i18n)
- Unused dependencies

## [1.5.0] - 2025-04-01

### Added
- Projects showcase page
- History page with GitHub integration
- Creations gallery
- About page with personal timeline

### Changed
- Updated hero section design
- Improved navigation structure
- Enhanced mobile experience

## [1.0.0] - 2025-03-01

### Added
- Initial release
- Basic portfolio structure
- Homepage with hero section
- Navigation system
- Footer component
- Responsive design foundation

---

## Version History Summary

- **2.2.x**: Trophy system, advanced commit categorization, "Me in Pieces" component
- **2.1.x**: Books system, Service Worker, PWA features
- **2.0.x**: Major restructuring, i18n, theme system, performance optimization
- **1.5.x**: Core pages (Projects, History, Creations, About)
- **1.0.x**: Initial release with basic structure

## Migration Notes

### From 2.1.x to 2.2.x
- No breaking changes
- New trophy system is opt-in (user interaction based)
- All existing features remain functional

### From 2.0.x to 2.1.x
- No breaking changes
- Books system is additive
- Service Worker automatically registers

### From 1.x to 2.0.x
- **Breaking**: Component import paths changed
- **Breaking**: Hardcoded text replaced with i18n keys
- **Action Required**: Update any custom components to use new structure
- **Action Required**: Add language preference handling if customized

## Deprecations

No deprecations in current version.

## Security Updates

All dependencies are regularly updated to address security vulnerabilities. Run `pnpm audit` for current status.

---

Last updated: October 1, 2025
