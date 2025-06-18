import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowRight, FiBook, FiBookOpen, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HashLink from '../HashLink';
import { useHashNavigation } from '../../hooks/useHashRouter';
import books from '../../data/books';

export default function BookChapter({ type, name, chapter }) {
  const { t } = useTranslation();
  const { navigate } = useHashNavigation();
  const book = books.find(b => b.type === type && b.slug === name);
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            {t('books.notFound')}
          </h2>
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

  const chapterIndex = book.chapters.findIndex(ch => ch.slug === chapter);
  const currentChapter = book.chapters[chapterIndex];
  
  if (!currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiBookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            Chapter Not Found
          </h2>
          <HashLink
            to={`/creations/books/${type}/${name}/overview`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Book
          </HashLink>
        </div>
      </div>
    );
  }

  const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
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
            <li className="before:content-['/'] before:mx-2">
              <HashLink 
                to={`/creations/books/${type}/${name}/overview`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {book.title}
              </HashLink>
            </li>
            <li className="before:content-['/'] before:mx-2">{currentChapter.title}</li>
          </ol>
        </nav>

        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {chapterIndex + 1} / {book.chapters.length}
              </span>
              <div className="mx-4 w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {t(`bookTypes.${book.type}`)}
              </span>
            </div>
            
            <HashLink
              to={`/creations/books/${type}/${name}/overview`}
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiBook className="w-4 h-4 mr-2" />
              {t('books.overview')}
            </HashLink>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {book.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300">
            {currentChapter.title}
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentChapter.content}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            {/* Previous Chapter */}
            <div className="flex-1">
              {prevChapter ? (
                <HashLink
                  to={`/creations/books/${type}/${name}/${prevChapter.slug}`}
                  className="group inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {t('books.prev')}
                    </div>
                    <div className="font-medium truncate max-w-xs">
                      {prevChapter.title}
                    </div>
                  </div>
                </HashLink>
              ) : (
                <div></div>
              )}
            </div>

            {/* Chapter Selector */}
            <div className="flex-shrink-0 mx-4">
              <select
                value={currentChapter.slug}
                onChange={(e) => navigate(`/creations/books/${type}/${name}/${e.target.value}`)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {book.chapters.map((ch, idx) => (
                  <option key={ch.slug} value={ch.slug}>
                    {idx + 1}. {ch.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Chapter */}
            <div className="flex-1 flex justify-end">
              {nextChapter ? (
                <HashLink
                  to={`/creations/books/${type}/${name}/${nextChapter.slug}`}
                  className="group inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {t('books.next')}
                    </div>
                    <div className="font-medium truncate max-w-xs">
                      {nextChapter.title}
                    </div>
                  </div>
                  <FiChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </HashLink>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{chapterIndex + 1} of {book.chapters.length}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((chapterIndex + 1) / book.chapters.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
