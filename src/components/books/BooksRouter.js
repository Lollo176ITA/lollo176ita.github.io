import React from 'react';
import BooksHome from './BooksHome';
import BookOverview from './BookOverview';
import BookChapter from './BookChapter';

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  const idx = parts.indexOf('books');
  if (idx === -1) return { view: 'home' };
  const rest = parts.slice(idx + 1);
  if (rest.length === 0) return { view: 'home' };
  if (rest.length >= 3 && rest[2] === 'overview') {
    return { view: 'overview', type: rest[0], name: rest[1] };
  }
  if (rest.length >= 3) {
    return { view: 'chapter', type: rest[0], name: rest[1], chapter: rest[2] };
  }
  return { view: 'home' };
}

export default function BooksRouter() {
  const [state, setState] = React.useState(parseHash());
  React.useEffect(() => {
    const onHash = () => setState(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (state.view === 'overview') {
    return <BookOverview type={state.type} name={state.name} />;
  }
  if (state.view === 'chapter') {
    return <BookChapter type={state.type} name={state.name} chapter={state.chapter} />;
  }
  return <BooksHome />;
}
