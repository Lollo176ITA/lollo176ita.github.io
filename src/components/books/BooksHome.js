import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import books from '../../data/books';

export default function BooksHome() {
  const { t } = useTranslation();
  const grouped = books.reduce((acc, b) => {
    acc[b.type] = acc[b.type] || [];
    acc[b.type].push(b);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-8 py-20">
      <h1 className="text-4xl font-bold mb-8">{t('books.chooseBook')}</h1>
      {Object.entries(grouped).map(([type, list]) => (
        <div key={type} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t(`bookTypes.${type}`)}</h2>
          <ul className="space-y-2">
            {list.map(book => (
              <li key={book.slug}>
                <Link
                  to={`/creations/books/${book.type}/${book.slug}/overview`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
