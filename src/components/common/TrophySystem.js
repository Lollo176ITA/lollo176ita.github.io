import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaTrophy, FaTimes } from 'react-icons/fa';
import { TROPHIES, getRarityColor } from '../../data/trophies';

// Context per gestire i trofei globalmente
const TrophyContext = createContext();

// Hook per gestire i trofei
export const useTrophies = () => {
  const context = useContext(TrophyContext);
  if (!context) {
    throw new Error('useTrophies must be used within a TrophyProvider');
  }
  return context;
};

// Componente popup per mostrare il trofeo
const TrophyPopup = ({ trophy, onClose }) => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === 'it';
  
  if (!trophy) return null;

  const IconComponent = trophy.icon;
  
  const handleGoToTrophies = () => {
    onClose();
    // Naviga alla pagina dei trofei
    window.location.hash = '#/trophies';
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center relative"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimes />
        </button>
        
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <FaTrophy className="text-4xl text-white" />
          </div>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 -mt-8 mx-auto`}>
            <IconComponent className={`text-2xl ${trophy.color}`} />
          </div>
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {t('trophies.unlocked')}
        </h2>
        
        {/* Rarità messa sopra */}
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getRarityColor(trophy.rarity)}`}>
          {t(`trophies.rarity.${trophy.rarity}`)}
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
          {isItalian ? trophy.name : trophy.nameEn}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isItalian ? trophy.description : trophy.descriptionEn}
        </p>
        
        {/* Pulsanti affiancati */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('trophies.close')}
          </motion.button>
          
          <motion.button
            onClick={handleGoToTrophies}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('trophies.goToTrophies')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Provider principale
export const TrophyProvider = ({ children }) => {
  const [unlockedTrophies, setUnlockedTrophies] = useState([]);
  const [currentTrophy, setCurrentTrophy] = useState(null);
  const [visitedPages, setVisitedPages] = useState(new Set());

  // Carica i trofei dal localStorage al mount
  useEffect(() => {
    const savedTrophies = localStorage.getItem('user_trophies');
    const savedPages = localStorage.getItem('visited_pages');
    
    if (savedTrophies) {
      setUnlockedTrophies(JSON.parse(savedTrophies));
    }
    
    if (savedPages) {
      setVisitedPages(new Set(JSON.parse(savedPages)));
    }
    
    // Assegna il trofeo di primo visitatore se non esiste
    if (!savedTrophies || !JSON.parse(savedTrophies || '[]').includes('first_visit')) {
      const unlockFirstVisit = () => {
        const currentTrophies = JSON.parse(localStorage.getItem('user_trophies') || '[]');
        if (!currentTrophies.includes('first_visit')) {
          setUnlockedTrophies(prev => [...prev, 'first_visit']);
          localStorage.setItem('user_trophies', JSON.stringify([...currentTrophies, 'first_visit']));
          setTimeout(() => setCurrentTrophy(TROPHIES.FIRST_VISIT), 1000);
        }
      };
      setTimeout(unlockFirstVisit, 1000);
    }
  }, []);

  // Salva i trofei nel localStorage
  const saveTrophies = (trophies) => {
    localStorage.setItem('user_trophies', JSON.stringify(trophies));
  };

  // Salva le pagine visitate
  const saveVisitedPages = (pages) => {
    localStorage.setItem('visited_pages', JSON.stringify([...pages]));
  };

  // Sblocca un trofeo
  const unlockTrophy = (trophyId) => {
    if (unlockedTrophies.includes(trophyId)) {
      return;
    }
    
    const newTrophies = [...unlockedTrophies, trophyId];
    setUnlockedTrophies(newTrophies);
    saveTrophies(newTrophies);
    
    // Mostra il popup
    const trophyData = TROPHIES[trophyId.toUpperCase()];
    if (trophyData) {
      setCurrentTrophy(trophyData);
    }
    
    // Controlla se è il completista
    if (newTrophies.length >= 5 && !newTrophies.includes('completionist')) {
      setTimeout(() => unlockTrophy('completionist'), 2000);
    }
  };

  // Traccia la visita a una pagina
  const visitPage = (pageName) => {
    const newVisitedPages = new Set([...visitedPages, pageName]);
    setVisitedPages(newVisitedPages);
    saveVisitedPages(newVisitedPages);
    
    // Trofei basati sulle pagine visitate
    switch (pageName) {
      case 'projects':
        unlockTrophy('code_explorer');
        break;
      case 'lighthouse':
        unlockTrophy('lighthouse_checker');
        break;
      case 'books':
        unlockTrophy('book_reader');
        break;
      default:
        break;
    }
  };

  // Traccia il completamento del gioco
  const completeGame = (timeInSeconds) => {
    unlockTrophy('game_master');
    
    if (timeInSeconds <= 30) {
      unlockTrophy('speed_demon');
    }
  };

  // Traccia il riempimento completo della griglia
  const fillGrid = () => {
    if (!unlockedTrophies.includes('grid_filler')) {
      unlockTrophy('grid_filler');
    }
  };

  // Traccia il cambio tema
  const switchTheme = () => {
    if (!unlockedTrophies.includes('theme_switcher')) {
      unlockTrophy('theme_switcher');
    }
  };

  const closeTrophyPopup = () => {
    setCurrentTrophy(null);
  };

  const value = {
    unlockedTrophies,
    visitedPages,
    unlockTrophy,
    visitPage,
    completeGame,
    fillGrid,
    switchTheme,
    getTrophyById: (id) => TROPHIES[id.toUpperCase()],
    getAllTrophies: () => TROPHIES,
    getTrophyCount: () => unlockedTrophies.length,
    getTotalTrophies: () => Object.keys(TROPHIES).length
  };

  return (
    <TrophyContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {currentTrophy && (
          <TrophyPopup
            trophy={currentTrophy}
            onClose={closeTrophyPopup}
          />
        )}
      </AnimatePresence>
    </TrophyContext.Provider>
  );
};

// Componente per mostrare i trofei dell'utente
export const TrophyDisplay = () => {
  const { unlockedTrophies, getAllTrophies } = useTrophies();
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === 'it';
  const allTrophies = getAllTrophies();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaTrophy className="mr-3 text-yellow-500" />
        {t('trophies.myTrophies')} ({unlockedTrophies.length}/{Object.keys(allTrophies).length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(allTrophies).map(([key, trophy]) => {
          const isUnlocked = unlockedTrophies.includes(trophy.id);
          const IconComponent = trophy.icon;
          
          return (
            <motion.div
              key={key}
              className={`p-4 rounded-lg border-2 ${
                isUnlocked 
                  ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-2">
                <IconComponent className={`text-xl mr-3 ${
                  isUnlocked ? trophy.color : 'text-gray-400'
                }`} />
                <h3 className={`font-semibold ${
                  isUnlocked ? 'text-gray-800 dark:text-white' : 'text-gray-500'
                }`}>
                  {isItalian ? trophy.name : trophy.nameEn}
                </h3>
              </div>
              
              {/* Mostra la descrizione solo se il trofeo è sbloccato */}
              {isUnlocked ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {isItalian ? trophy.description : trophy.descriptionEn}
                  </p>
                  {trophy.credits && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                      {trophy.credits}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-400 mb-2 italic">
                  {t('trophies.lockedTrophy')}
                </p>
              )}
              
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${
                isUnlocked ? getRarityColor(trophy.rarity) : 'bg-gray-300 text-gray-600'
              }`}>
                {t(`trophies.rarity.${trophy.rarity}`)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
