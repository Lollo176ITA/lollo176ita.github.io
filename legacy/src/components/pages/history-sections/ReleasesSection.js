import React from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaExternalLinkAlt } from 'react-icons/fa';

const ReleasesSection = ({ releases, loading, t }) => (
  <section>
    <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
      {t('history.releases')}
    </h3>
    
    {loading && (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t('history.loading')}...</p>
      </div>
    )}

    <div className="max-w-4xl mx-auto">
      {releases.length === 0 && !loading ? (
        <div className="text-center py-12">
          <FaTag className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('history.noReleases')}. {t('history.projectInDevelopment')}
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

export default ReleasesSection;
