import { useLocation } from 'react-router-dom';
import { HashRouter } from '../../utils/hashRouter';
import BooksHome from './BooksHome';
import BookOverview from './BookOverview';
import BookChapter from './BookChapter';

export default function BooksRouter() {
  const location = useLocation();
  const overviewMatch = HashRouter.matchPath('creations/books/:type/:name/overview', location.pathname);
  const chapterMatch = HashRouter.matchPath('creations/books/:type/:name/:chapter', location.pathname);

  if (overviewMatch) {
    return <BookOverview type={overviewMatch.type} name={overviewMatch.name} />;
  }

  if (chapterMatch) {
    return (
      <BookChapter
        type={chapterMatch.type}
        name={chapterMatch.name}
        chapter={chapterMatch.chapter}
      />
    );
  }

  return <BooksHome />;
}
