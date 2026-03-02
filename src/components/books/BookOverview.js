import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiBook, FiClock, FiUser } from 'react-icons/fi';
import HashLink from '../common/HashLink';
import { useHashNavigation } from '../../hooks/useHashRouter';
import { useBookTracking } from '../../hooks/useNavigation';
import books from '../../data/books';

export default function BookOverview({ type, name }) {
  const { t } = useTranslation();
  const { navigate } = useHashNavigation();
  const { trackBookView, trackBookStart } = useBookTracking();
  const book = books.find(b => b.type === type && b.slug === name);

  // Track book view when component mounts
  useEffect(() => {
    if (book) {
      trackBookView({ type: book.type, slug: book.slug, title: book.title });
    }
  }, [book, trackBookView]);

  const handleStartReading = () => {
    if (book && book.chapters && book.chapters.length > 0) {
      trackBookStart({ type: book.type, slug: book.slug, title: book.title });
      navigate(`/creations/books/${type}/${name}/${book.chapters[0].slug}`);
    }
  };

  const handleRandomChapter = () => {
    if (book && book.chapters && book.chapters.length > 0) {
      const randomChapter = book.chapters[Math.floor(Math.random() * book.chapters.length)];
      navigate(`/creations/books/${type}/${name}/${randomChapter.slug}`);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            {t('books.notFound')}
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            {t('books.notFoundDescription')}
          </p>
          <HashLink
            to="/creations/books"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            {t('books.backToBooks')}
          </HashLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
            <li className="before:content-['/'] before:mx-2">
              <HashLink 
                to="/creations/books" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('books.title')}
              </HashLink>
            </li>
            <li className="before:content-['/'] before:mx-2">{book.title}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <HashLink
            to="/creations/books"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            {t('books.backToBooks')}
          </HashLink>
        </div>

        {/* Book Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                  {t(`bookTypes.${book.type}`)}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Book Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center">
                <FiBook className="w-4 h-4 mr-2" />
                {book.chapters?.length || 0} {t('books.chapters')}
              </div>
              {book.author && (
                <div className="flex items-center">
                  <FiUser className="w-4 h-4 mr-2" />
                  {book.author}
                </div>
              )}
              {book.readingTime && (
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 mr-2" />
                  {book.readingTime} {t('books.minutesRead')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <FiBook className="w-6 h-6 mr-3" />
            {t('books.chapters')}
          </h2>
          
          {book.chapters && book.chapters.length > 0 ? (
            <div className="space-y-3">
              {book.chapters.map((chapter, index) => (
                <div 
                  key={chapter.slug} 
                  className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">
                          {index + 1}.
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {chapter.title}
                        </h3>
                      </div>
                      {chapter.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
                          {chapter.description}
                        </p>
                      )}
                    </div>
                    
                    <HashLink
                      to={`/creations/books/${type}/${name}/${chapter.slug}`}
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {t('books.read')}
                    </HashLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {t('books.noChapters')}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}        {book.chapters && book.chapters.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartReading}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              {t('books.startReading')}
            </button>
            
            <button
              onClick={handleRandomChapter}
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors font-medium"
            >
              {t('books.randomChapter')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
