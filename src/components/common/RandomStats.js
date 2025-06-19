import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaCode, 
  FaFolder, 
  FaRocket, 
  FaGlobe,
  FaGitAlt,
  FaStar,
  FaCodeBranch,
  FaDownload,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaFire,
  FaMobile,
  FaDesktop,
  FaShieldAlt,
  FaRobot,
  FaSearch,
  FaBolt,
  FaChartLine,
  FaDatabase,
  FaCloud,
  FaWifi
} from 'react-icons/fa';
import { useGitHubStats, useSiteStats } from '../../hooks/useStats';

const RandomStats = () => {
  const { t } = useTranslation();
  const gitHubStats = useGitHubStats();
  const siteStats = useSiteStats();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Definisco tutte le statistiche
  const allStats = [
    // Statistiche del Sito
    {
      icon: FaCode,
      value: siteStats.loading ? '...' : siteStats.linesOfCode?.toLocaleString() || '5,333',
      label: t('aboutPage.linesOfCode') || 'Righe di Codice',
      gradient: 'from-blue-500 to-blue-600',
      category: 'site'
    },
    {
      icon: FaFolder,
      value: siteStats.loading ? '...' : siteStats.files || '51',
      label: t('aboutPage.files') || 'File',
      gradient: 'from-green-500 to-green-600',
      category: 'site'
    },
    {
      icon: FaRocket,
      value: siteStats.loading ? '...' : siteStats.components || '21',
      label: t('aboutPage.components') || 'Componenti',
      gradient: 'from-purple-500 to-purple-600',
      category: 'site'
    },
    {
      icon: FaGlobe,
      value: siteStats.loading ? '...' : siteStats.routes || '8',
      label: t('aboutPage.routes') || 'Pagine',
      gradient: 'from-orange-500 to-orange-600',
      category: 'site'
    },
    
    // Statistiche GitHub
    {
      icon: FaGitAlt,
      value: gitHubStats.loading ? '...' : gitHubStats.commits || '106',
      label: t('aboutPage.commits') || 'Commit',
      gradient: 'from-gray-700 to-gray-800',
      category: 'github'
    },
    {
      icon: FaStar,
      value: gitHubStats.loading ? '...' : gitHubStats.stars || '1',
      label: t('aboutPage.stars') || 'Stelle',
      gradient: 'from-yellow-500 to-yellow-600',
      category: 'github'
    },
    {
      icon: FaCodeBranch,
      value: gitHubStats.loading ? '...' : gitHubStats.forks || '0',
      label: t('aboutPage.forks') || 'Fork',
      gradient: 'from-teal-500 to-teal-600',
      category: 'github'
    },
    {
      icon: FaDownload,
      value: gitHubStats.loading ? '...' : gitHubStats.size || '51',
      label: t('aboutPage.size') || 'Dimensioni (MB)',
      gradient: 'from-indigo-500 to-indigo-600',
      category: 'github'
    },
    
    // Performance & Qualità
    {
      icon: FaRocket,
      value: siteStats.loading ? '...' : siteStats.performance?.lighthouse?.performance || '59',
      label: t('aboutPage.performance') || 'Performance',
      gradient: 'from-green-500 to-green-600',
      category: 'performance'
    },
    {
      icon: FaHeart,
      value: siteStats.loading ? '...' : siteStats.performance?.lighthouse?.accessibility || '88',
      label: t('aboutPage.accessibility') || 'Accessibilità',
      gradient: 'from-blue-500 to-blue-600',
      category: 'performance'
    },
    {
      icon: FaStar,
      value: siteStats.loading ? '...' : siteStats.performance?.lighthouse?.bestPractices || '100',
      label: t('aboutPage.bestPractices') || 'Best Practices',
      gradient: 'from-purple-500 to-purple-600',
      category: 'performance'
    },    {
      icon: FaGlobe,
      value: siteStats.loading ? '...' : siteStats.performance?.lighthouse?.seo || '100',
      label: t('aboutPage.seo') || 'SEO',
      gradient: 'from-yellow-500 to-yellow-600',
      category: 'performance'
    },
    
    // Tempo di Build
    {
      icon: FaClock,
      value: siteStats.loading ? '...' : `${(siteStats.performance?.avgBuildTime || 15.1).toFixed(1)}s`,
      label: t('aboutPage.avgBuildTime') || 'Tempo Build',
      gradient: 'from-orange-500 to-red-500',
      category: 'build'    },
    
    // Statistiche Tecniche e Divertenti
    {
      icon: FaFire,
      value: '99.9%',
      label: t('aboutPage.uptime') || 'Uptime',
      gradient: 'from-red-500 to-pink-500',
      category: 'technical'
    },
    {
      icon: FaMobile,
      value: '100%',
      label: t('aboutPage.mobileReady') || 'Mobile Ready',
      gradient: 'from-green-400 to-blue-500',
      category: 'technical'
    },
    {
      icon: FaDesktop,
      value: '4K',
      label: t('aboutPage.maxResolution') || 'Risoluzione Max',
      gradient: 'from-purple-400 to-pink-500',
      category: 'technical'
    },
    {
      icon: FaShieldAlt,
      value: 'A-',
      label: t('aboutPage.securityScore') || 'Security Score',
      gradient: 'from-emerald-500 to-teal-600',
      category: 'technical'
    },
    {
      icon: FaRobot,
      value: '-1',
      label: t('aboutPage.aiBugsFound') || 'AI Bugs Found',
      gradient: 'from-cyan-500 to-blue-500',
      category: 'fun'
    },
    {
      icon: FaSearch,
      value: '∞',
      label: t('aboutPage.stackOverflowVisits') || 'Stack Overflow Visits',
      gradient: 'from-orange-400 to-red-500',
      category: 'fun'
    },
    {
      icon: FaBolt,
      value: '1.2h',
      label: t('aboutPage.loadingSpeed') || 'Loading Speed',
      gradient: 'from-yellow-400 to-orange-500',
      category: 'fun'
    },
    {
      icon: FaChartLine,
      value: 'Good',
      label: t('aboutPage.growthRate') || 'Growth Rate',
      gradient: 'from-green-400 to-emerald-500',
      category: 'fun'
    },
    {
      icon: FaDatabase,
      value: '0MB',
      label: t('aboutPage.databaseSize') || 'Database Size',
      gradient: 'from-gray-500 to-slate-600',
      category: 'technical'
    },    {
      icon: FaCloud,
      value: '∞',
      label: t('aboutPage.cloudStorage') || 'Cloud Storage',
      gradient: 'from-sky-400 to-blue-500',
      category: 'technical'
    },    {
      icon: FaWifi,
      value: '5G',
      label: t('aboutPage.connectionSpeed') || 'Connection Speed',
      gradient: 'from-indigo-500 to-purple-500',
      category: 'technical'
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allStats.length / itemsPerPage);

  // Auto-play del carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 8000); // Cambia ogni 10 secondi

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Riattiva auto-play dopo 8 secondi di inattività
  useEffect(() => {
    if (isAutoPlaying) return;
    
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentIndex]);

  const getCurrentStats = () => {
    const startIndex = currentIndex * itemsPerPage;
    return allStats.slice(startIndex, startIndex + itemsPerPage);
  };
  const getCategoryTitle = () => {
    const currentStats = getCurrentStats();
    if (currentStats.length === 0) return '';
    
    const category = currentStats[0].category;
    switch (category) {
      case 'site':
        return t('aboutPage.siteStats') || 'Statistiche del Sito';
      case 'github':
        return t('aboutPage.githubStats') || 'Statistiche GitHub';
      case 'performance':
        return t('aboutPage.performanceStats') || 'Performance & Qualità';      case 'build':
        return t('aboutPage.buildAndDeploy') || 'Build & Deploy';
      case 'technical':
        return t('aboutPage.technicalStats') || 'Statistiche Tecniche';
      case 'fun':
        return t('aboutPage.funStats') || 'Statistiche Divertenti';
      default:
        return '';
    }
  };

  return (
    <motion.section 
      className="mb-16 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header con titolo dinamico */}
      <div className="text-center mb-8">
        <motion.h3 
          key={getCategoryTitle()}
          className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getCategoryTitle()}
        </motion.h3>
        
        {/* Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          disabled={totalPages <= 1}
        >
          <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          disabled={totalPages <= 1}
        >
          <FaChevronRight className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Stats Cards */}
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-4"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.6
              }}
            >
              {getCurrentStats().map((stat, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 1,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300 
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-4xl mx-auto mb-3" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 500
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm opacity-90">
                    {stat.label}
                  </div>
                </motion.div>
              ))}            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </motion.section>
  );
};

export default RandomStats;
