import React, { useEffect } from 'react';
import { FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HashLink from '../common/HashLink';
import { useTrophies } from '../common/TrophySystem';

export default function WorkInProgress() {
  const { t } = useTranslation();
  const { visitPage } = useTrophies();

  useEffect(() => {
    visitPage('projects');
  }, [visitPage]);
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <FaTools className="text-6xl text-black  dark:text-white mb-4" />
      </motion.div>
      <h1 className="text-5xl font-extrabold text-black dark:text-white text-center mb-6">{t('wip.title')}</h1>
      <p className="text-lg text-black dark:text-white text-center mb-8">{t('wip.text')}</p>      <HashLink to="/">
        <motion.button
          className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-black hover:dark:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus:ring-2 focus:ring-black dark:focus:ring-white transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('wip.button')}
        </motion.button>
      </HashLink>
    </motion.div>
  );
}
