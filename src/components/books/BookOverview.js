import React from 'react';
// We avoid react-router here and parse the hash manually
import { useTranslation } from 'react-i18next';
import books from '../../data/books';

export default function BookOverview({ type: propType, name: propName }) {
  let type = propType;
  let name = propName;
  if (!type || !name) {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/');
    const idx = parts.indexOf('books');
    if (idx !== -1) {
      type = parts[idx + 1];
      name = parts[idx + 2];
    }
  }
  const { t } = useTranslation();
  const book = books.find(b => b.type === type && b.slug === name);

  if (!book) return <div className="p-8">Book not found</div>;

  return (
    <div className="container mx-auto px-8 py-20 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <p className="mb-6">{book.description}</p>
      <h2 className="text-2xl font-semibold mb-2">{t('books.chapters')}</h2>
      <ul className="list-disc list-inside space-y-1">
        {book.chapters.map(ch => (
          <li key={ch.slug}>
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline"
              href={`#/creations/books/${type}/${name}/${ch.slug}`}
            >
              {ch.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
