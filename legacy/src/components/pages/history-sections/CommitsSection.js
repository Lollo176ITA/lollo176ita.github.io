import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';

const CommitsSection = ({ commits, visibleCommits, setVisibleCommits, totalCommits, getCommitTypeInfo, loading, error, t }) => (
  <section>
    <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
      {t('history.technical')}
    </h3>
    
    {loading && (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t('history.loading')}...</p>
      </div>
    )}

    {error && (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-2xl mx-auto">
        <strong>{t('history.error')}:</strong> {error}
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
              {t('history.showMoreCommits')} ({totalCommits - visibleCommits} {t('history.remaining')})
            </motion.button>
          </div>
        )}
      </div>
    )}
  </section>
);

export default CommitsSection;
