import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaGithub, 
  FaCode, 
  FaRocket, 
  FaStar, 
  FaCodeBranch,
  FaCalendarAlt,
  FaClock,
  FaGitAlt,
  FaBook,
  FaLightbulb,
  FaHeart,
  FaUsers,
  FaDownload,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaHistory,
  FaTag,
  FaBug,
  FaWrench,
  FaPlus
} from 'react-icons/fa';
import { useGitHubStats } from '../hooks/useStats';
import historyIt from '../data/history.it.json';
import historyEn from '../data/history.en.json';

export default function History() {
  const [commits, setCommits] = useState([]);
  const [releases, setReleases] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [repoInfo, setRepoInfo] = useState(null);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visibleCommits, setVisibleCommits] = useState(8);
  const [activeTab, setActiveTab] = useState('timeline');
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const gitHubStats = useGitHubStats();

  const historyData = i18n.language === 'it' ? historyIt : historyEn;

  // Ordina la storia manuale dalla più recente
  const sortedHistory = [...historyData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const visibleHistory = sortedHistory.slice(0, visibleCount);
  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      try {
        // Fetch commits
        const commitsRes = await fetch(
          'https://api.github.com/repos/lollo176ita/lollo176ita.github.io/commits?per_page=20'
        );
        if (commitsRes.ok) {
          const commitsData = await commitsRes.json();
          const parsedCommits = commitsData.map((c) => ({
            sha: c.sha.substring(0, 7),
            fullSha: c.sha,
            date: new Date(c.commit.author.date),
            message: c.commit.message.split('\n')[0],
            description: c.commit.message.split('\n').slice(1).join('\n').trim(),
            author: c.commit.author.name,
            url: c.html_url,
            type: getCommitType(c.commit.message),
          }));
          setCommits(parsedCommits);
        }

        // Fetch repository info
        const repoRes = await fetch('https://api.github.com/repos/lollo176ita/lollo176ita.github.io');
        if (repoRes.ok) {
          const repoData = await repoRes.json();
          setRepoInfo(repoData);
        }

        // Fetch releases
        const releasesRes = await fetch(
          'https://api.github.com/repos/lollo176ita/lollo176ita.github.io/releases?per_page=5'
        );
        if (releasesRes.ok) {
          const releasesData = await releasesRes.json();
          setReleases(releasesData);
        }

        // Fetch contributors
        const contributorsRes = await fetch(
          'https://api.github.com/repos/lollo176ita/lollo176ita.github.io/contributors'
        );
        if (contributorsRes.ok) {
          const contributorsData = await contributorsRes.json();
          setContributors(contributorsData);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Helper function to categorize commits
  const getCommitType = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('feat') || msg.includes('add') || msg.includes('new')) return 'feature';
    if (msg.includes('fix') || msg.includes('bug')) return 'fix';
    if (msg.includes('update') || msg.includes('improve')) return 'update';
    if (msg.includes('refactor') || msg.includes('clean')) return 'refactor';
    if (msg.includes('docs') || msg.includes('readme')) return 'docs';
    if (msg.includes('style') || msg.includes('ui')) return 'style';
    return 'other';
  };

  // Get commit type icon and color
  const getCommitTypeInfo = (type) => {
    switch (type) {
      case 'feature': return { icon: FaPlus, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900' };
      case 'fix': return { icon: FaBug, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900' };
      case 'update': return { icon: FaWrench, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900' };
      case 'refactor': return { icon: FaCode, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900' };
      case 'docs': return { icon: FaBook, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900' };
      case 'style': return { icon: FaHeart, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900' };
      default: return { icon: FaGitAlt, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
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
