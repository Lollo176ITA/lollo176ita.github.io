import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import books from '../../data/books';

export default function BookChapter() {
  const { type, name, chapter } = useParams();
  const { t } = useTranslation();
  const book = books.find(b => b.type === type && b.slug === name);
  if (!book) return <div className="p-8">Book not found</div>;
  const index = book.chapters.findIndex(ch => ch.slug === chapter);
  const ch = book.chapters[index];
  if (!ch) return <div className="p-8">Chapter not found</div>;
  const prev = index > 0 ? book.chapters[index - 1].slug : null;
  const next = index < book.chapters.length - 1 ? book.chapters[index + 1].slug : null;

  return (
    <div className="container mx-auto px-8 py-20 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <h2 className="text-2xl font-semibold mb-4">{ch.title}</h2>
      <p className="mb-8 whitespace-pre-line">{ch.content}</p>
      <div className="flex justify-between">
        {prev ? (
          <Link
            to={`/creations/books/${type}/${name}/${prev}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('books.prev')}
          </Link>
        ) : <span />}
        {next ? (
          <Link
            to={`/creations/books/${type}/${name}/${next}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('books.next')}
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
