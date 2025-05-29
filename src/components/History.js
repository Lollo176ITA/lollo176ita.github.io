import React, { useEffect, useState } from 'react';
import historyIt from '../data/history.it.json';
import historyEn from '../data/history.en.json';
import { useTranslation } from 'react-i18next';

export default function History() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const { t, i18n } = useTranslation();

const historyData = i18n.language === 'it' ? historyIt : historyEn;

  // Ordina la storia manuale dalla più recente
  const sortedHistory = [...historyData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const visibleHistory = sortedHistory.slice(0, visibleCount);

  useEffect(() => {
    fetch(
      'https://api.github.com/repos/lollo176ita/lollo176ita.github.io/commits?per_page=10'
    )
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then((data) => {
        const parsed = data.map((c) => ({
          sha: c.sha.substring(0, 7),
          date: new Date(c.commit.author.date).toLocaleDateString(),
          message: c.commit.message.split('\n')[0],
          url: c.html_url,
        }));
        setCommits(parsed);
      })
      .catch((err) => setError(err.message));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, sortedHistory.length));
  };

  return (
    <div className="container mx-auto px-8 py-20 ">
      <h2 className="text-4xl font-bold mb-6">{t('history.title')}</h2>

      {/* --- Storia Manuale --- */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">{t('history.timeline')}</h3>
        <ul className="border-l-2 border-dashed border-gray-300 dark:border-gray-600">
            {visibleHistory.map((item) => (
            <li
                key={item.date}
                className="group mb-8 ml-8 relative"
            >
                {/* Marker più elegante */}
                <div className="absolute -left-[1.5rem] top-0 flex items-center justify-center w-6 h-6">
                <span
                    className="
                    block 
                    w-3 h-3 
                    bg-gradient-to-br from-blue-400 to-purple-500 
                    rounded-full 
                    border-2 border-white dark:border-black 
                    shadow-md 
                    transform 
                    transition-transform duration-200 
                    group-hover:scale-125
                    "
                />
                </div>

                {/* Contenuto dell’evento */}
                <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.date).toLocaleDateString()}
                </time>
                <h4 className="text-xl font-medium mt-1">{item.title}</h4>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                {item.description}
                </p>
            </li>
            ))}
        </ul>

        {/* Pulsante “Carica altri” */}
        {visibleCount < sortedHistory.length && (
            <div className="mt-4">
            <button
                onClick={() => setVisibleCount((c) => c + 5)}
                className="
                inline-block 
                px-4 py-2 
                border border-blue-500 
                text-blue-500 
                rounded-full 
                hover:bg-blue-500 hover:text-white 
                transition
                "
            >
                {t('history.loadMore')}
            </button>
            </div>
        )}
        </section>


      {/* --- Storia Tecnica --- */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">
          {t('history.technical')}
        </h3>

        {/* Profilo GitHub e progetto */}
        <div className="flex items-center mb-6 space-x-4">
          <img
            src="https://github.com/lollo176ita.png"
            alt="Avatar GitHub"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              Repository:{' '}
              <a
                href="https://github.com/lollo176ita/lollo176ita.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                lollo176ita.github.io
              </a>
            </p>
            <p>
              {t('history.moreInfo')}{' '}
              <a
                href="https://github.com/lollo176ita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                @lollo176ita
              </a>
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-500">{t('history.error')}{error}</p>
        )}
        {!error && commits.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">
            {t('history.loading')}
          </p>
        )}
        <ul className="space-y-4">
          {commits.map((c) => (
            <li
              key={c.sha}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{c.sha}</span>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {c.date}
                </time>
              </div>
              <p className="mt-1">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {c.message}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
