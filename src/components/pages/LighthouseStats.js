import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaRocket,
  FaShieldAlt,
  FaSearch,
  FaUniversalAccess,
  FaEye,
  FaWeight,
  FaClock,
  FaDesktop,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTachometerAlt
} from 'react-icons/fa';
import { SiLighthouse } from 'react-icons/si';
import { useTrophies } from '../common/TrophySystem';
import { loadProjectStats } from '../../hooks/useStats';

const LighthouseStats = () => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({ performance: {} });
  const { visitPage } = useTrophies();

  const lighthouse = statsData.performance?.lighthouse || {};
  const lastUpdated = lighthouse.lastUpdated ? new Date(lighthouse.lastUpdated) : new Date();

  useEffect(() => {
    let isMounted = true;

    const hydrateStats = async () => {
      const projectStats = await loadProjectStats();
      if (isMounted && projectStats) {
        setStatsData(projectStats);
      }
    };

    hydrateStats();

    // Simula un caricamento per l'animazione
    const timer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 800);
    visitPage('lighthouse');
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [visitPage]);

  // Mappa dei punteggi Lighthouse
  const lighthouses = [
    {
      id: 'performance',
      name: t('lighthouse.performance'),
      score: lighthouse.performance || 0,
      icon: FaRocket,
      color: getScoreColor(lighthouse.performance || 0),
      description: t('lighthouse.performanceDesc')
    },
    {
      id: 'accessibility',
      name: t('lighthouse.accessibility'),
      score: lighthouse.accessibility || 0,
      icon: FaUniversalAccess,
      color: getScoreColor(lighthouse.accessibility || 0),
      description: t('lighthouse.accessibilityDesc')
    },
    {
      id: 'bestPractices',
      name: t('lighthouse.bestPractices'),
      score: lighthouse.bestPractices || 0,
      icon: FaShieldAlt,
      color: getScoreColor(lighthouse.bestPractices || 0),
      description: t('lighthouse.bestPracticesDesc')
    },
    {
      id: 'seo',
      name: t('lighthouse.seo'),
      score: lighthouse.seo || 0,
      icon: FaSearch,
      color: getScoreColor(lighthouse.seo || 0),
      description: t('lighthouse.seoDesc')
    }
  ];

  // Metriche Core Web Vitals
  const coreMetrics = [
    {
      name: 'First Contentful Paint',
      key: 'firstContentfulPaint',
      value: lighthouse.metrics?.firstContentfulPaint || 0,
      unit: 'ms',
      icon: FaEye,
      threshold: { good: 1800, needs: 3000 },
      description: t('lighthouse.fcpDesc')
    },
    {
      name: 'Largest Contentful Paint',
      key: 'largestContentfulPaint',
      value: lighthouse.metrics?.largestContentfulPaint || 0,
      unit: 'ms',
      icon: FaWeight,
      threshold: { good: 2500, needs: 4000 },
      description: t('lighthouse.lcpDesc')
    },
    {
      name: 'Cumulative Layout Shift',
      key: 'cumulativeLayoutShift',
      value: lighthouse.metrics?.cumulativeLayoutShift || 0,
      unit: '',
      icon: FaDesktop,
      threshold: { good: 0.1, needs: 0.25 },
      description: t('lighthouse.clsDesc')
    },
    {
      name: 'Total Blocking Time',
      key: 'totalBlockingTime',
      value: lighthouse.metrics?.totalBlockingTime || 0,
      unit: 'ms',
      icon: FaClock,
      threshold: { good: 200, needs: 600 },
      description: t('lighthouse.tbtDesc')
    },
    {
      name: 'Time to Interactive',
      key: 'timeToInteractive',
      value: lighthouse.metrics?.timeToInteractive || 0,
      unit: 'ms',
      icon: FaTachometerAlt,
      threshold: { good: 3800, needs: 7300 },
      description: t('lighthouse.timeToInteractiveDesc')
    },
    {
      name: 'Speed Index',
      key: 'speedIndex',
      value: lighthouse.metrics?.speedIndex || 0,
      unit: 'ms',
      icon: FaRocket,
      threshold: { good: 3400, needs: 5800 },
      description: t('lighthouse.speedIndexDesc')
    }
  ];

  // Metriche aggiuntive
  const additionalMetrics = [
    {
      name: 'First Meaningful Paint',
      key: 'firstMeaningfulPaint',
      value: lighthouse.metrics?.firstMeaningfulPaint || 0,
      unit: 'ms',
      icon: FaEye,
      threshold: { good: 2000, needs: 4000 },
      description: 'Tempo per visualizzare il contenuto principale'
    },
    {
      name: 'Server Response Time',
      key: 'serverResponseTime',
      value: lighthouse.metrics?.serverResponseTime || 0,
      unit: 'ms',
      icon: FaDesktop,
      threshold: { good: 200, needs: 600 },
      description: 'Tempo di risposta del server'
    },
    {
      name: 'Max Potential FID',
      key: 'maxPotentialFID',
      value: lighthouse.metrics?.maxPotentialFID || 0,
      unit: 'ms',
      icon: FaClock,
      threshold: { good: 100, needs: 300 },
      description: 'Massimo ritardo potenziale di input'
    },
    {
      name: 'DOM Size',
      key: 'domSize',
      value: lighthouse.metrics?.domSize || 0,
      unit: 'elements',
      icon: FaDesktop,
      threshold: { good: 800, needs: 1400 },
      description: 'Numero di elementi nel DOM'
    },
    {
      name: 'Main Thread Work',
      key: 'mainThreadWorkBreakdown',
      value: lighthouse.metrics?.mainThreadWorkBreakdown || 0,
      unit: 'ms',
      icon: FaClock,
      threshold: { good: 2000, needs: 4000 },
      description: 'Lavoro del thread principale'
    },
    {
      name: 'Network Requests',
      key: 'networkRequests',
      value: lighthouse.metrics?.networkRequests || 0,
      unit: 'requests',
      icon: FaDesktop,
      threshold: { good: 50, needs: 100 },
      description: 'Numero di richieste di rete'
    }
  ];

  // Funzione per ottenere il colore basato sul punteggio
  function getScoreColor(score) {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  }

  // Funzione per ottenere l'icona di stato delle metriche
  function getMetricStatus(value, threshold) {
    if (value <= threshold.good) return { icon: FaCheckCircle, color: 'text-green-500' };
    if (value <= threshold.needs) return { icon: FaExclamationTriangle, color: 'text-yellow-500' };
    return { icon: FaExclamationTriangle, color: 'text-red-500' };
  }

  // Animazioni
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const scoreVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('lighthouse.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SiLighthouse className="text-3xl" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('lighthouse.title')}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {t('lighthouse.subtitle')}
            </p>
            <div className="mt-6 text-sm opacity-75">
              {t('lighthouse.lastUpdated')}: {lastUpdated.toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Punteggi principali */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          {lighthouses.map((metric) => (
            <motion.div
              key={metric.id}
              className={`bg-gray-50 dark:bg-gray-900 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMetric(metric.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="text-2xl text-blue-500" />
                <motion.div
                  className={`text-3xl font-bold ${metric.color}`}
                  variants={scoreVariants}
                >
                  {metric.score}
                </motion.div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{metric.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>
              <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    metric.score >= 90 ? 'from-green-400 to-green-600' :
                    metric.score >= 50 ? 'from-yellow-400 to-yellow-600' :
                    'from-red-400 to-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Web Vitals */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaTachometerAlt className="mr-3 text-blue-500" />
            Core Web Vitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreMetrics.map((metric) => {
              const status = getMetricStatus(metric.value, metric.threshold);
              return (
                <motion.div
                  key={metric.key}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="text-xl text-blue-500" />
                    <status.icon className={`text-xl ${status.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{metric.name}</h3>
                  <div className="text-2xl font-bold mb-2">
                    {metric.value.toFixed(metric.unit === 'ms' ? 0 : 3)}
                    <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Metriche aggiuntive */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaDesktop className="mr-3 text-blue-500" />
            Metriche Aggiuntive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalMetrics.map((metric) => {
              const status = getMetricStatus(metric.value, metric.threshold);
              return (
                <motion.div
                  key={metric.key}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="text-xl text-blue-500" />
                    <status.icon className={`text-xl ${status.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{metric.name}</h3>
                  <div className="text-2xl font-bold mb-2">
                    {metric.unit === 'elements' || metric.unit === 'requests' 
                      ? metric.value.toLocaleString()
                      : metric.value.toFixed(metric.unit === 'ms' ? 0 : 3)}
                    <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Informazioni aggiuntive */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          variants={itemVariants}
        >
          {/* Build Size */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaWeight className="mr-3 text-blue-500" />
              {t('lighthouse.buildSize')}
            </h3>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {statsData.performance?.buildSize || 'N/A'}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t('lighthouse.buildSizeDesc')}
            </p>
          </div>

          {/* Generation Time */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaClock className="mr-3 text-blue-500" />
              {t('lighthouse.generationTime')}
            </h3>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {(statsData.generationTime / 1000).toFixed(1)}s
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t('lighthouse.generationTimeDesc')}
            </p>
          </div>
        </motion.div>

        {/* Informazioni sul processo */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaInfoCircle className="mr-3 text-blue-500" />
            {t('lighthouse.aboutProcess')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              {t('lighthouse.processDesc')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {t('lighthouse.feature1')}
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {t('lighthouse.feature2')}
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {t('lighthouse.feature3')}
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {t('lighthouse.feature4')}
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LighthouseStats;
