import React from 'react';
import { HashRouter } from '../../utils/hashRouter';
import BooksHome from './BooksHome';
import BookOverview from './BookOverview';
import BookChapter from './BookChapter';

export default function BooksRouter() {
  const [currentView, setCurrentView] = React.useState('home');
  const [routeParams, setRouteParams] = React.useState({});

  React.useEffect(() => {
    const updateRoute = () => {
      const path = HashRouter.getCurrentPath();
      
      // Match different book routes
      const homeMatch = HashRouter.matchPath('creations/books');
      const overviewMatch = HashRouter.matchPath('creations/books/:type/:name/overview');
      const chapterMatch = HashRouter.matchPath('creations/books/:type/:name/:chapter');
      
      if (overviewMatch) {
        setCurrentView('overview');
        setRouteParams(overviewMatch);
      } else if (chapterMatch) {
        setCurrentView('chapter');
        setRouteParams(chapterMatch);
      } else {
        setCurrentView('home');
        setRouteParams({});
      }
    };

    updateRoute();
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  // Add loading state for better UX
  if (currentView === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  switch (currentView) {
    case 'overview':
      return <BookOverview type={routeParams.type} name={routeParams.name} />;
    case 'chapter':
      return <BookChapter type={routeParams.type} name={routeParams.name} chapter={routeParams.chapter} />;
    default:
      return <BooksHome />;
  }
}
