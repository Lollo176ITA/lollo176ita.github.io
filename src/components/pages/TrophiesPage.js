import React from 'react';
import { motion } from 'framer-motion';
import { TrophyDisplay, useTrophies } from '../common/TrophySystem';
import { useTranslation } from 'react-i18next';

const TrophiesPage = () => {
  const { t } = useTranslation();
  const { getTrophyCount, getTotalTrophies } = useTrophies();

  const progressPercentage = (getTrophyCount() / getTotalTrophies()) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {t('trophies.myTrophies')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Scopri tutti i trofei che puoi sbloccare esplorando il sito!
          </p>
          
          {/* Barra di progresso */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progresso</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {getTrophyCount()}/{getTotalTrophies()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {progressPercentage.toFixed(1)}% completato
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TrophyDisplay />
        </motion.div>
      </div>
    </div>
  );
};

export default TrophiesPage;
