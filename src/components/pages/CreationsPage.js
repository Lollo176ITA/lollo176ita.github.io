import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaGamepad, 
  FaCode, 
  FaRocket, 
  FaStar,
  FaGithub,
  FaHeart,
  FaLightbulb,
  FaPlay,
  FaTrophy,
  FaQuoteLeft,
  FaExternalLinkAlt,
  FaTachometerAlt,
  FaUniversalAccess,
  FaShieldAlt,
  FaSearchPlus
} from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { 
  SiReact, 
  SiJavascript, 
  SiUnity, 
  SiSharp,
  SiTailwindcss,
  SiFramer
} from 'react-icons/si';
import HashLink from '../common/HashLink';
import CodeEditor from '../common/CodeEditor';
import { useSiteStats } from '../../hooks/useStats';
import books from '../../data/books';

// Import standard per evitare errori React #130
import { motion, AnimatePresence } from 'framer-motion';

const sparkleColors = { games: 'bg-yellow-300', novel: 'bg-emerald-300' };

// Helper function to calculate real book statistics
const calculateBookStats = () => {
  const totalBooks = books.length;
  const totalChapters = books.reduce((sum, book) => sum + book.chapters.length, 0);
  
  // Calculate total words from book contents
  const totalWords = books.reduce((bookSum, book) => {
    return bookSum + book.chapters.reduce((chapterSum, chapter) => {
      const wordCount = chapter.content ? chapter.content.split(/\s+/).filter(word => word.length > 0).length : 0;
      return chapterSum + wordCount;
    }, 0);
  }, 0);
  
  // Estimate pages (assuming ~250 words per page)
  const estimatedPages = Math.max(1, Math.ceil(totalWords / 250));
  
  return {
    books: totalBooks,
    chapters: totalChapters,
    pages: estimatedPages,
    words: totalWords
  };
};

// Enhanced Card Component
function CreationCard({ variant, icon, title, description, stats, techStack, links, hovered, onHover, onLeave, onClick, isActive, directLink, t }) {
  const handleClick = () => {
    if (directLink) {
      window.location.hash = directLink;
    } else {
      onClick();
    }
  };  const cardColors = {
    games: {
      gradient: 'from-indigo-600 via-purple-600 to-indigo-800',
      border: 'border-indigo-400',
      shadow: '0 0 32px 4px #4f46e5',
      accent: 'text-orange-200'
    },
    novel: {
      gradient: 'from-emerald-700 via-teal-700 to-emerald-900',
      border: 'border-emerald-400', 
      shadow: '0 0 32px 4px #10b981',
      accent: 'text-blue-300'
    }
  };

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}      className={`relative flex flex-col p-8 rounded-2xl cursor-pointer backdrop-blur-sm border-2 transition-all duration-500 min-h-[420px] ${
        isActive 
          ? `scale-105 z-20 ${cardColors[variant].border} bg-gradient-to-br ${cardColors[variant].gradient} text-white shadow-2xl`          : variant === 'games' 
            ? `border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-br hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-800 hover:text-white group`
            : `border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-br hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-900 hover:text-white group`
      }`}
      whileHover={!isActive ? { 
        scale: 1.02, 
        boxShadow: cardColors[variant].shadow,
        transition: { duration: 0.3 }
      } : {}}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Sparkle Effect */}
      {hovered && !isActive && (
        <motion.div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-1.5 ${sparkleColors[variant]} rounded-full absolute`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.6 + Math.random() * 0.4
              }}
              animate={{ 
                y: [-8, 8, -8],
                x: [-4, 4, -4],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 0.5, 
                repeat: Infinity, 
                delay: i * 0.1 
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Header with Icon */}
      <motion.div 
        className="flex items-center mb-6"
        layout
        animate={isActive ? { scale: 0.8, marginBottom: 16 } : { scale: 1, marginBottom: 24 }}
      >
        <motion.div
          className="mr-4"
          whileHover={!isActive && hovered ? { rotate: [0, 12, -12, 0], scale: 1.1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className={`text-2xl font-bold ${isActive || hovered ? 'text-white' : 'text-gray-800 dark:text-white group-hover:text-white'}`}>
            {title}
          </h3>
          <p className={`text-sm ${isActive || hovered ? cardColors[variant].accent : 'text-gray-500 dark:text-gray-400 group-hover:' + cardColors[variant].accent}`}>
            {description}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {!isActive && (
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center p-3 rounded-lg ${hovered ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20'}`}>
              <div className={`text-lg font-bold ${isActive || hovered ? 'text-white' : 'text-gray-800 dark:text-white group-hover:text-white'}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isActive || hovered ? cardColors[variant].accent : 'text-gray-500 dark:text-gray-400 group-hover:' + cardColors[variant].accent}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tech Stack */}
      {!isActive && techStack && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >          <div className={`text-sm font-medium mb-3 ${isActive || hovered ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-white'}`}>
            {t('creations.techStack')}:
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                className={`flex items-center px-2 py-1 rounded-md text-xs ${hovered ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover:bg-white/20 group-hover:text-white'}`}
                whileHover={{ scale: 1.05 }}
              >
                <tech.icon className="mr-1" size={12} />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Button or Links */}
      <div className="mt-auto">
        {!isActive && (          <motion.div
            className={`text-center py-3 px-4 rounded-lg font-medium transition-colors ${
              hovered 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-white/20 group-hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            {directLink ? t('creations.exploreBooks') : t('creations.expandGames')}
          </motion.div>
        )}

        {/* Expanded Links */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {links.map(({ href, text, icon: LinkIcon }, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                    <HashLink 
                      to={href.replace('#', '')} 
                      className="flex items-center p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white group/link"
                    >
                      <LinkIcon className="mr-3 group-hover/link:scale-110 transition-transform" />
                      <span className="font-medium">{text}</span>
                      <FaExternalLinkAlt className="ml-auto opacity-60 group-hover/link:opacity-100" size={12} />
                    </HashLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Hero Section Component  
function HeroSection({ t }) {
  return (
    <motion.section 
      className="text-center mt-8 mb-16"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <FaRocket className="mr-2" />
        {t('creations.digitalCreations')}
      </motion.div>
      
      <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
        {t('creations.heroTitle')}
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {t('creations.subtitle')}
      </p>
    </motion.section>
  );
}

// Stats Overview Component
function StatsOverview({ stats, t }) {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Main Stats Grid */}      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
        {[
          { icon: FaRocket, label: t('creations.activeProjects'), value: '8+', color: 'text-purple-500' },
          { icon: FaHeart, label: t('creations.developmentHours'), value: '500+', color: 'text-red-500' },
          { icon: FaStar, label: t('creations.technologies'), value: '12+', color: 'text-yellow-500' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
          >
            <stat.icon className={`text-3xl ${stat.color} mx-auto mb-3`} />
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>      {/* Realistic Code Animation */}
      <motion.div
        className="max-w-5xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FaCode className="text-2xl" />
            <span className="text-xl font-bold">
              {stats?.linesOfCode?.toLocaleString() || '4,744'} {t('creations.linesOfCode')}
            </span>
          </motion.div>
        </div>        
        <CodeEditor />
      </motion.div>

      {/* Performance Metrics */}
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >        <h4 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
          🚀 {t('creations.performanceTitle')}
        </h4>
        <div className="p-6 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Lighthouse Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">            {[
              { 
                icon: FaTachometerAlt, 
                label: 'Performance', 
                value: stats?.performance?.lighthouse?.performance || 97, 
                color: 'text-green-500',
                bgColor: 'bg-green-500/20'
              },
              { 
                icon: FaUniversalAccess, 
                label: 'Accessibilità', 
                value: stats?.performance?.lighthouse?.accessibility || 98, 
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/20'
              },
              { 
                icon: FaShieldAlt, 
                label: 'Best Practices', 
                value: stats?.performance?.lighthouse?.bestPractices || 95, 
                color: 'text-purple-500',
                bgColor: 'bg-purple-500/20'
              },
              { 
                icon: FaSearchPlus, 
                label: 'SEO', 
                value: stats?.performance?.lighthouse?.seo || 99, 
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500/20'
              }
            ].map((metric, idx) => (
              <motion.div 
                key={idx} 
                className={`text-center p-4 rounded-lg ${metric.bgColor} border border-gray-200 dark:border-gray-600`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.9 }}
              >
                <metric.icon className={`text-2xl ${metric.color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Build Time */}
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <FaRocket className="text-indigo-500" />
              <span className="font-medium">
                {t('creations.buildTime')}: <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {stats?.performance?.avgBuildTime ? `${stats.performance.avgBuildTime.toFixed(1)}s` : '34.2s'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// Quote Section Component
function InspirationalQuote({ t }) {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 rounded-2xl border border-gray-200 dark:border-gray-700">
        <FaQuoteLeft className="text-3xl text-gray-400 mx-auto mb-4" />
        <blockquote className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4 italic">
          "{t('creations.philosophy')}"
        </blockquote>
        <cite className="text-gray-500 dark:text-gray-400">- {t('creations.developmentPhilosophy')}</cite>
      </div>
    </motion.section>
  );
}

export default function CreationsPage() {
  const { t } = useTranslation();
  const siteStats = useSiteStats();
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  
  // Calculate real book statistics
  const bookStats = calculateBookStats();  const creationsData = {
    games: {
      title: t('creations.games'),
      description: t('creations.gamesDesc'),
      stats: [
        { label: t('creations.prototypes'), value: '3+' },
        { label: t('creations.engine'), value: 'Unity' },
        { label: t('creations.genre'), value: 'Arcade' },
        { label: t('creations.platform'), value: 'WebGL' }
      ],      techStack: [
        { icon: SiUnity, name: 'Unity' },
        { icon: SiSharp, name: 'C#' },
        { icon: SiJavascript, name: 'JavaScript' }
      ],
      links: [
        { href: '/games/play', text: t('creations.playGame'), icon: FaPlay },
        { href: '/games/leaderboard', text: t('creations.leaderboard'), icon: FaTrophy }
      ]
    },    novel: {
      title: t('creations.novel'),
      description: t('creations.novelDesc'),
      stats: [
        { label: t('creations.books'), value: bookStats.books.toString() },
        { label: t('creations.chapters'), value: bookStats.chapters.toString() },
        { label: t('creations.pages'), value: `~${bookStats.pages}` },
        { label: t('creations.words'), value: bookStats.words > 0 ? bookStats.words.toLocaleString() : '0' }
      ],
      techStack: [
        { icon: SiReact, name: 'React' },
        { icon: SiTailwindcss, name: 'Tailwind' },
        { icon: SiFramer, name: 'Framer Motion' }
      ]
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <HeroSection t={t} />
        
        {/* Stats Overview */}
        <StatsOverview stats={siteStats} t={t} />
        
        {/* Inspirational Quote */}
        <InspirationalQuote t={t} />

        {/* Main Creations Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('creations.exploreCreations')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">            {/* Games Card */}
            <CreationCard
              variant="games"
              icon={<FaGamepad className="text-5xl text-orange-500" />}
              title={creationsData.games.title}
              description={creationsData.games.description}
              stats={creationsData.games.stats}
              techStack={creationsData.games.techStack}
              links={creationsData.games.links}
              hovered={hovered === 'games'}
              onHover={() => setHovered('games')}
              onLeave={() => setHovered(null)}
              onClick={() => setActive(active === 'games' ? null : 'games')}
              isActive={active === 'games'}
              t={t}
            />

            {/* Books Card */}
            <CreationCard
              variant="novel"
              icon={<GiOpenBook className="text-5xl text-blue-500" />}
              title={creationsData.novel.title}
              description={creationsData.novel.description}
              stats={creationsData.novel.stats}
              techStack={creationsData.novel.techStack}
              hovered={hovered === 'novel'}
              onHover={() => setHovered('novel')}
              onLeave={() => setHovered(null)}
              directLink="#/creations/books"
              isActive={false}
              t={t}
            />
          </div>
        </motion.section>

        {/* Coming Soon Section */}
        <motion.section 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl max-w-2xl mx-auto">
            <FaLightbulb className="text-4xl text-yellow-500 mx-auto mb-4" />            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
              {t('creations.newCreationsTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('creations.moreComingSoon')}
            </p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://github.com/lollo176ita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="mr-2" />
                GitHub
              </motion.a>              <motion.button
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="mr-2" />
                {t('creations.followMe')}
              </motion.button>
            </div>
          </div>        </motion.section>
      </div>
    </main>
  );
}