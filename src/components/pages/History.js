import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaGithub, 
  FaCode, 
  FaRocket,   FaStar, 
  FaCodeBranch,
  FaCalendarAlt,
  FaGitAlt,
  FaBook,
  FaLightbulb,
  FaHeart,
  FaUsers,
  FaDownload,
  FaExternalLinkAlt,
  FaChevronDown,
  FaHistory,
  FaTag,
  FaBug,
  FaWrench,
  FaPlus,
  FaEye
} from 'react-icons/fa';
import { useGitHubStats } from '../../hooks/useStats';
import historyIt from '../../data/history.it.json';
import historyEn from '../../data/history.en.json';

// Timeline Section Component
const TimelineSection = ({ visibleHistory, visibleCount, setVisibleCount, sortedHistory, t }) => (
  <section>
    <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
      {t('history.timeline')}
    </h3>
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        
        {visibleHistory.map((item, index) => (
          <motion.div
            key={item.date}
            className="relative mb-12 ml-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Timeline marker */}
            <div className="absolute -left-[2.25rem] top-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
            
            {/* Content card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <time className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                  {new Date(item.date).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <FaLightbulb className="text-yellow-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load more button */}
      {visibleCount < sortedHistory.length && (
        <div className="text-center mt-8">
          <motion.button
            onClick={() => setVisibleCount(c => c + 6)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronDown className="mr-2" />
            Carica Altri ({sortedHistory.length - visibleCount} rimanenti)
          </motion.button>
        </div>
      )}
    </div>
  </section>
);

// Commits Section Component
const CommitsSection = ({ commits, visibleCommits, setVisibleCommits, totalCommits, getCommitTypeInfo, loading, error, t }) => (
  <section>
    <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
      Commits Recenti
    </h3>
    
    {loading && (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento commits...</p>
      </div>
    )}

    {error && (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-2xl mx-auto">
        <strong>Errore:</strong> {error}
      </div>
    )}

    {!loading && !error && (
      <div className="max-w-4xl mx-auto space-y-6">
        {commits.map((commit, index) => {
          const typeInfo = getCommitTypeInfo(commit.type);
          const Icon = typeInfo.icon;
          
          return (
            <motion.div
              key={commit.fullSha}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${typeInfo.bg}`}>
                  <Icon className={`text-lg ${typeInfo.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {commit.sha}
                      </code>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        by {commit.author}
                      </span>
                    </div>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {commit.date.toLocaleDateString('it-IT')}
                    </time>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {commit.message}
                    </a>
                  </h4>
                  
                  {commit.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {commit.description}
                    </p>
                  )}
                </div>
                
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
            </motion.div>
          );
        })}

        {visibleCommits < totalCommits && (
          <div className="text-center">
            <motion.button
              onClick={() => setVisibleCommits(c => c + 8)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronDown className="mr-2" />
              Mostra Altri Commits ({totalCommits - visibleCommits} rimanenti)
            </motion.button>
          </div>
        )}
      </div>
    )}
  </section>
);

// Releases Section Component
const ReleasesSection = ({ releases, loading, t }) => (
  <section>
    <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
      Release & Versioni
    </h3>
    
    {loading && (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento release...</p>
      </div>
    )}

    <div className="max-w-4xl mx-auto">
      {releases.length === 0 && !loading ? (
        <div className="text-center py-12">
          <FaTag className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Nessuna release formale ancora pubblicata. Il progetto è in continuo sviluppo!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {release.name || release.tag_name}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{new Date(release.published_at).toLocaleDateString('it-IT')}</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                      {release.tag_name}
                    </span>
                  </div>
                </div>
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
              
              {release.body && (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300">
                    {release.body.substring(0, 300)}
                    {release.body.length > 300 && '...'}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </section>
);

// Stats Section Component
const StatsSection = ({ repoInfo, contributors, gitHubStats, commits, loading, t }) => {
  const getCommitStats = () => {
    if (!commits.length) return {};
    
    const typeCount = commits.reduce((acc, commit) => {
      acc[commit.type] = (acc[commit.type] || 0) + 1;
      return acc;
    }, {});

    const authorCount = commits.reduce((acc, commit) => {
      acc[commit.author] = (acc[commit.author] || 0) + 1;
      return acc;
    }, {});

    return { typeCount, authorCount };
  };

  const { typeCount } = getCommitStats();

  return (
    <section>
      <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
        Statistiche Dettagliate
      </h3>
      
      <div className="max-w-6xl mx-auto">
        {/* Repository Info */}
        {repoInfo && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center mb-6">
              <FaGithub className="text-3xl text-gray-800 dark:text-white mr-4" />
              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.full_name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {repoInfo.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <FaEye className="text-2xl text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.watchers_count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Watchers</div>
              </div>
              
              <div className="text-center">
                <FaCodeBranch className="text-2xl text-green-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.forks_count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
              </div>
              
              <div className="text-center">
                <FaCode className="text-2xl text-purple-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.language}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Linguaggio</div>
              </div>
              
              <div className="text-center">
                <FaCalendarAlt className="text-2xl text-orange-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {new Date(repoInfo.created_at).getFullYear()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Creato nel</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Commit Types Distribution */}
        {Object.keys(typeCount).length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Distribuzione Tipi di Commit
            </h4>
            <div className="space-y-4">
              {Object.entries(typeCount)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => {
                  const percentage = (count / commits.length) * 100;
                  const colors = {
                    feature: 'bg-green-500',
                    fix: 'bg-red-500',
                    update: 'bg-blue-500',
                    refactor: 'bg-purple-500',
                    docs: 'bg-yellow-500',
                    style: 'bg-pink-500',
                    other: 'bg-gray-500'
                  };
                  
                  return (
                    <div key={type} className="flex items-center">
                      <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {type}
                      </div>
                      <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full ${colors[type] || colors.other}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400 text-right">
                        {count} ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* Contributors */}
        {contributors.length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaUsers className="mr-3" />
              Contributori
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {contributors.slice(0, 8).map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {contributor.login}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {contributor.contributions} commits
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

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
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            La storia completa del progetto, dalle prime idee fino ad oggi
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
              <div className="text-sm text-gray-600 dark:text-gray-400">Commits Totali</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaStar className="text-3xl text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.stars}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Stelle</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaCodeBranch className="text-3xl text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.forks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fork</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <FaDownload className="text-3xl text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {gitHubStats.loading ? '...' : gitHubStats.size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">MB</div>
            </div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section className="mb-12" variants={itemVariants}>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'timeline', label: 'Timeline', icon: FaCalendarAlt },
              { id: 'commits', label: 'Commits Recenti', icon: FaGitAlt },
              { id: 'releases', label: 'Release', icon: FaTag },
              { id: 'stats', label: 'Statistiche', icon: FaRocket }
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
            <FaGithub className="text-4xl text-gray-800 dark:text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Esplora il Codice Sorgente
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tutto il codice è open source e disponibile su GitHub. Contributi e feedback sono sempre benvenuti!
            </p>
            <motion.a
              href="https://github.com/lollo176ita/lollo176ita.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="mr-2" />
              Visita Repository
            </motion.a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
