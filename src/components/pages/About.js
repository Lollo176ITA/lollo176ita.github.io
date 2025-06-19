import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaCode, 
  FaGamepad, 
  FaGithub, 
  FaUniversity,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLanguage,
  FaRocket,
  FaHeart,
  FaCoffee,
  FaMoon,
  FaBug,
  FaLightbulb,
  FaMusic,
  FaPlane,
  FaBookOpen
} from 'react-icons/fa';
import { 
  SiReact, 
  SiDrupal, 
  SiUnity, 
  SiJavascript, 
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiGit,
  SiVisualstudiocode
} from 'react-icons/si';
import RandomStats from '../common/RandomStats';
import HashLink from '../common/HashLink';
import { useGitHubStats, usePersonalStats } from '../../hooks/useStats';

export default function About() {
  const { t } = useTranslation();  const gitHubStats = useGitHubStats();
  const personalStats = usePersonalStats();
    const age = new Date().getFullYear() - 2004 - (new Date().getMonth() < 2 || (new Date().getMonth() === 2 && new Date().getDate() < 30) ? 1 : 0);
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2020; // Started coding seriously around 2020

  const personalInfo = [
    { icon: FaCalendarAlt, label: t('aboutPage.age'), value: `${age} ${t('aboutPage.years')}` },
    { icon: FaUniversity, label: t('aboutPage.university'), value: 'Sapienza Università di Roma' },
    { icon: FaMapMarkerAlt, label: t('aboutPage.location'), value: 'Roma, Italia 🇮🇹' },
    { icon: FaLanguage, label: t('aboutPage.languages'), value: 'Italiano, English' },
    { icon: FaRocket, label: t('aboutPage.experience'), value: `${experienceYears}+ ${t('aboutPage.years')}` }
  ];

  const techStack = [
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiDrupal, name: 'Drupal', color: '#0678BE' },
    { icon: SiUnity, name: 'Unity', color: '#000000' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiVisualstudiocode, name: 'VS Code', color: '#007ACC' }
  ];

  const timeline = [
    { year: '2020', title: t('aboutPage.timeline2020'), icon: FaRocket, color: '#3B82F6' },
    { year: '2021', title: t('aboutPage.timeline2021'), icon: SiReact, color: '#61DAFB' },
    { year: '2022', title: t('aboutPage.timeline2022'), icon: FaUniversity, color: '#8B5CF6' },
    { year: '2023', title: t('aboutPage.timeline2023'), icon: SiUnity, color: '#000000' },
    { year: '2024', title: t('aboutPage.timeline2024'), icon: FaHeart, color: '#EF4444' }
  ];
  const interests = [
    { title: t('aboutPage.musicTitle'), description: t('aboutPage.musicText'), icon: FaMusic, color: '#F59E0B' },
    { title: t('aboutPage.gamingTitle'), description: t('aboutPage.gamingText'), icon: FaGamepad, color: '#8B5CF6' },
    { title: t('aboutPage.travelTitle'), description: t('aboutPage.travelText'), icon: FaPlane, color: '#10B981' },
    { title: t('aboutPage.readingTitle'), description: t('aboutPage.readingText'), icon: FaBookOpen, color: '#EF4444' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.main
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">L</span>
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Lorenzo Censi
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('aboutPage.intro', { age })}
          </p>
        </motion.section>        {/* Personal Info Cards */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.personalInfo')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {personalInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <info.icon className="text-3xl text-blue-500 mb-3" />
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm uppercase tracking-wide mb-2">
                  {info.label}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>        {/* Random Stats Carousel */}
        <RandomStats />

        {/* Personal Journey Stats - Il Mio Viaggio */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.personalStats')}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaCoffee className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.coffees.toLocaleString()}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.coffees')}</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaMoon className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.lateNights}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.lateNights')}</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaBug className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.bugsFixed.toLocaleString()}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.bugsFixed')}</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaLightbulb className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.ideasHad.toLocaleString()}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.ideasHad')}</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaGithub className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.reposCreated}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.reposCreated')}</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaCalendarAlt className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold">
                {personalStats.loading ? '...' : personalStats.yearsOfExperience}
              </div>
              <div className="text-sm opacity-90">{t('aboutPage.years')}</div>
            </motion.div>          </div>
        </motion.section>        {/* Tech Stack */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.techStack')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <tech.icon 
                  className="text-4xl mx-auto mb-3" 
                  style={{ color: tech.color }}
                />
                <p className="font-semibold text-gray-800 dark:text-white text-sm">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('aboutPage.timeline')}
          </h3>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-8 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${index % 2 === 0 ? 'order-1' : 'order-2 ml-auto'}`}
                     style={{ backgroundColor: item.color }}>
                  <item.icon className="text-xl" />
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'order-2 ml-6' : 'order-1 mr-6 text-right'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                      {item.year}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coding Languages Chart */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.codingLanguages')}
          </h3>
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {gitHubStats.languages && Object.keys(gitHubStats.languages).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(gitHubStats.languages)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([language, percentage], index) => {
                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                    return (
                      <div key={language} className="flex items-center">
                        <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language}
                        </div>
                        <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <motion.div
                            className="h-3 rounded-full"
                            style={{ backgroundColor: colors[index] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: index * 0.2, duration: 1 }}
                          />
                        </div>
                        <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                {gitHubStats.loading ? 'Caricamento linguaggi...' : 'Dati non disponibili'}
              </div>
            )}
          </div>
        </motion.section>
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.interests')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <interest.icon 
                    className="text-3xl mr-4" 
                    style={{ color: interest.color }}
                  />
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {interest.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t('aboutPage.skills')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              whileHover={{ scale: 1.02 }}
            >
              <FaCode className="text-4xl text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {t('aboutPage.webTitle')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('aboutPage.webText')}
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Frontend: React, TypeScript, Tailwind CSS</li>
                <li>• Backend: Node.js, Drupal, PHP</li>
                <li>• Tools: Git, VS Code, npm/yarn</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              whileHover={{ scale: 1.02 }}
            >
              <FaGamepad className="text-4xl text-purple-500 mb-4" />
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {t('aboutPage.gameTitle')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('aboutPage.gameText')}
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Unity Engine, C#</li>
                <li>• Game Design & Prototyping</li>
                <li>• WebGL & Mobile Development</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>        {/* Call to Action */}
        <motion.section 
          className="text-center"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <FaHeart className="text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              {t('aboutPage.ctaTitle')}
            </h3>
            <p className="text-lg opacity-90 mb-6">
              {t('aboutPage.ctaDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <HashLink
                to="/creations"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <FaRocket className="mr-2" />
                {t('aboutPage.moreCreations')}
              </HashLink>
              <HashLink
                to="/history"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center"
              >
                <FaGithub className="mr-2" />
                {t('aboutPage.moreHistory')}
              </HashLink>
            </div>
            
            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm opacity-75 mb-4">Seguimi sui social</p>
              <div className="flex justify-center space-x-4">
                <motion.a 
                  href="https://github.com/lollo176ita" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-lg" />
                </motion.a>
                {/* Aggiungi altri social qui se necessario */}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
