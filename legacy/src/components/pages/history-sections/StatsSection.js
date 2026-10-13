import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaEye, 
  FaCodeBranch, 
  FaCode, 
  FaCalendarAlt,
  FaUsers
} from 'react-icons/fa';

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
        {t('history.stats')}
      </h3>
        
      <div className="max-w-6xl mx-auto">
        {/* Repository Info */}
        {repoInfo && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <FaGithub className="text-3xl text-gray-800 dark:text-white mb-4 sm:mb-0 sm:mr-4 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white break-words">
                  {repoInfo.full_name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 break-words">
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
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.watchers')}</div>
              </div>
              
              <div className="text-center">
                <FaCodeBranch className="text-2xl text-green-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.forks_count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.forks')}</div>
              </div>
              
              <div className="text-center">
                <FaCode className="text-2xl text-purple-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {repoInfo.language}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.language')}</div>
              </div>
              
              <div className="text-center">
                <FaCalendarAlt className="text-2xl text-orange-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {new Date(repoInfo.created_at).getFullYear()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('history.createdIn')}</div>
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
              {t('history.commitTypes')}
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
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {t(`history.${type}`) || type}
                        </div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {count} ({percentage.toFixed(1)}%)
                        </div>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full ${colors[type] || colors.other}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
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
              {t('history.contributors')}
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
                      {contributor.contributions} {t('history.commits')}
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

export default StatsSection;
