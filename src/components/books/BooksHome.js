import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBook, FiEdit3, FiArrowLeft } from 'react-icons/fi';
import HashLink from '../common/HashLink';
import books from '../../data/books';
import { useTrophies } from '../common/TrophySystem';

export default function BooksHome() {
  const { t } = useTranslation();
  const { visitPage } = useTrophies();

  useEffect(() => {
    visitPage('books');
  }, [visitPage]);
  
  // Group books by type
  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.type]) {
      acc[book.type] = [];
    }
    acc[book.type].push(book);
    return acc;
  }, {});

  // Get icon for book type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'novella':
        return <FiBook className="w-5 h-5" />;
      case 'poetry':
        return <FiEdit3 className="w-5 h-5" />;
      default:
        return <FiBook className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <HashLink 
                to="/creations" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('nav.creations')}
              </HashLink>
            </li>
            <li className="before:content-['/'] before:mx-2">{t('books.title')}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t('books.chooseBook')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('books.description')}
          </p>
        </div>

        {/* Books Grid */}
        <div className="space-y-12">
          {Object.entries(groupedBooks).map(([type, bookList]) => (
            <section key={type} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                {getTypeIcon(type)}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white ml-3">
                  {t(`bookTypes.${type}`)}
                </h2>
                <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {bookList.length} {bookList.length === 1 ? t('books.book') : t('books.books')}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookList.map(book => (
                  <article key={book.slug} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {book.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {book.chapters?.length || 0} {t('books.chapters')}
                      </span>
                      
                      <HashLink
                        to={`/creations/books/${book.type}/${book.slug}/overview`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group-hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {t('books.readMore')}
                        <FiArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </HashLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(groupedBooks).length === 0 && (
          <div className="text-center py-16">
            <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {t('books.noBooks')}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {t('books.noBooksDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
