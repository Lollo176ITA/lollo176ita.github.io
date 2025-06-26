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
  FaGitAlt,
  FaBook,
  FaHeart,
  FaDownload,
  FaExternalLinkAlt,
  FaHistory,
  FaTag,
  FaBug,
  FaWrench,
  FaPlus,
} from 'react-icons/fa';
import { useGitHubStats } from '../../hooks/useStats';
import { 
  TimelineSection, 
  CommitsSection, 
  ReleasesSection, 
  StatsSection 
} from './history-sections';
import historyIt from '../../data/history.it.json';
import historyEn from '../../data/history.en.json';

// Main History Component
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
        // Fetch all commits with pagination
        const allCommits = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore) {
          const commitsRes = await fetch(
            `https://api.github.com/repos/lollo176ita/lollo176ita.github.io/commits?per_page=100&page=${page}`
          );
          if (commitsRes.ok) {
            const commitsData = await commitsRes.json();
            if (commitsData.length === 0) {
              hasMore = false;
            } else {
              allCommits.push(...commitsData);
              page++;
              // GitHub API rate limit protection - fetch max 10 pages (1000 commits)
              if (page > 10) hasMore = false;
            }
          } else {
            hasMore = false;
          }
        }
        
        const parsedCommits = allCommits.map((c) => ({
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="text-center mb-16" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <FaHistory className="text-2xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            {t('history.title')}
          </h1>          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('history.subtitle')}
          </p>
        </motion.section>

        {/* Repository Stats */}
        <motion.section className="mb-16" variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaGitAlt className="text-3xl text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.commits}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.totalCommits')}</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaStar className="text-3xl text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.stars}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.stars')}</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaCodeBranch className="text-3xl text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.forks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.forks')}</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaDownload className="text-3xl text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.size')}</div>
            </div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section className="mb-12" variants={itemVariants}>
          <div className="flex flex-wrap justify-center gap-4">
            {[              { id: 'timeline', label: t('history.timeline'), icon: FaCalendarAlt },
              { id: 'commits', label: t('history.technical'), icon: FaGitAlt },
              { id: 'releases', label: t('history.releases'), icon: FaTag },
              { id: 'stats', label: t('history.stats'), icon: FaRocket }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'timeline' && (
              <TimelineSection 
                visibleHistory={visibleHistory}
                visibleCount={visibleCount}
                setVisibleCount={setVisibleCount}
                sortedHistory={sortedHistory}
                t={t}
              />
            )}

            {activeTab === 'commits' && (
              <CommitsSection 
                commits={commits.slice(0, visibleCommits)}
                visibleCommits={visibleCommits}
                setVisibleCommits={setVisibleCommits}
                totalCommits={commits.length}
                getCommitTypeInfo={getCommitTypeInfo}
                loading={loading}
                error={error}
                t={t}
              />
            )}

            {activeTab === 'releases' && (
              <ReleasesSection 
                releases={releases}
                loading={loading}
                t={t}
              />
            )}

            {activeTab === 'stats' && (
              <StatsSection 
                repoInfo={repoInfo}
                contributors={contributors}
                gitHubStats={gitHubStats}
                commits={commits}
                loading={loading}
                t={t}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Repository Link */}
        <motion.section className="text-center mt-16" variants={itemVariants}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <FaGithub className="text-4xl text-gray-800 dark:text-white mx-auto mb-4" />            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {t('history.moreInfo')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('history.moreInfoText')}
            </p>
            <motion.a
              href="https://github.com/lollo176ita/lollo176ita.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >              <FaExternalLinkAlt className="mr-2" />
              {t('history.repoLabel')}
            </motion.a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
