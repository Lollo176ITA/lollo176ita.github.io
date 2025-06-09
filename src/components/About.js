import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useTranslation();
  const age = new Date().getFullYear() - 2004 - (new Date().getMonth() < 2 || (new Date().getMonth() === 2 && new Date().getDate() < 30) ? 1 : 0);

  return (
    <motion.main
      className="min-h-screen container mx-auto px-8 py-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-5xl font-extrabold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {t('aboutPage.title')}
      </motion.h1>
      <motion.p
        className="text-lg max-w-2xl mx-auto mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('aboutPage.intro', { age })}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-lg border shadow-sm bg-white dark:bg-gray-900"
        >
          <FaCode className="text-3xl text-blue-500 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">{t('aboutPage.webTitle')}</h3>
          <p>{t('aboutPage.webText')}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-lg border shadow-sm bg-white dark:bg-gray-900"
        >
          <FaGamepad className="text-3xl text-purple-500 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">{t('aboutPage.gameTitle')}</h3>
          <p>{t('aboutPage.gameText')}</p>
        </motion.div>
      </div>
      <div className="space-x-4">
        <Link to="/history" className="underline hover:text-blue-600">
          {t('aboutPage.moreHistory')}
        </Link>
        <Link to="/creations" className="underline hover:text-blue-600">
          {t('aboutPage.moreCreations')}
        </Link>
      </div>
    </motion.main>
  );
}
