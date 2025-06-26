import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaChevronDown } from 'react-icons/fa';

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
            {t('history.loadMore')} ({sortedHistory.length - visibleCount} {t('history.remaining')})
          </motion.button>
        </div>
      )}
    </div>
  </section>
);

export default TimelineSection;
