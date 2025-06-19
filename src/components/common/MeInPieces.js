import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaBrain, 
  FaEye, 
  FaHeart, 
  FaHandPaper,
  FaLungs,
  FaTimes
} from 'react-icons/fa';
import { 
  GiStomach,
  GiKidneys, 
  GiLiver
} from 'react-icons/gi';

const MeInPieces = () => {
  const { t } = useTranslation();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [pulsingOrgans, setPulsingOrgans] = useState([]);
  // Organi con descrizioni e statistiche ironiche
  const organs = useMemo(() => [
    {
      id: 'brain',
      icon: FaBrain,
      name: t('aboutPage.brain') || 'Cervello',
      description: t('aboutPage.brainDescription') || 'Il centro di comando dove nascono le idee più folli. Processa caffè e codice in quantità industriali, spesso alle 3 del mattino.',
      personality: '🧠 Sempre attivo, mai spento',
      stats: ['456 idee generate', '2,847 tazze di caffè processate', '847 notti insonni']
    },
    {
      id: 'eyes',
      icon: FaEye, 
      name: t('aboutPage.eyes') || 'Occhi',
      description: t('aboutPage.eyesDescription') || 'Testimoni silenziosi di migliaia di righe di codice. Hanno visto errori, bug e quella volta che ho dimenticato un punto e virgola per 3 ore.',
      personality: '👀 Vedono tutto, dimenticano poco',
      stats: ['5,333 righe di codice viste', '1,203 bug individuati', '∞ Stack Overflow consultazioni']
    },
    {
      id: 'heart',
      icon: FaHeart,
      name: t('aboutPage.heart') || 'Cuore',
      description: t('aboutPage.heartDescription') || 'Batte per la programmazione, accelera quando il codice funziona al primo colpo, si ferma quando vedo un merge conflict.',
      personality: '❤️ Appassionato e determinato',
      stats: ['23 progetti amati', '100% dedicazione', 'Battiti extra per ogni deploy']
    },
    {
      id: 'lungs',
      icon: FaLungs,
      name: t('aboutPage.lungs') || 'Polmoni',
      description: t('aboutPage.lungsDescription') || 'Respirano codice pulito e sospirano profondamente ad ogni refactoring. Hanno trattenuto il fiato durante troppi build di produzione.',
      personality: '� Pazienti ma spesso in apnea',
      stats: ['1,205 sospiri profondi', '3,400 respiri trattenuti', '∞ "Finalmente funziona!"']
    },    {
      id: 'hands',
      icon: FaHandPaper,
      name: t('aboutPage.hands') || 'Mani',
      description: t('aboutPage.handsDescription') || 'Le vere eroine di questa storia. Hanno digitato, debuggato, e lanciato oggetti contro il monitor (sempre senza romperlo).',
      personality: '🤲 Instancabili e creative',
      stats: ['Milioni di tasti premuti', 'Zero monitor rotti', 'Infinite gesture di frustrazione']
    },
    {
      id: 'stomach',
      icon: GiStomach,
      name: t('aboutPage.stomach') || 'Stomaco',
      description: t('aboutPage.stomachDescription') || 'Convertitore ufficiale di caffè in codice. Ha sviluppato una tolleranza leggendaria alla caffeina e una dipendenza dai biscotti.',
      personality: '☕ Sempre affamato di caffè',
      stats: ['2,847 caffè processati', 'Tolleranza caffeina: leggendaria', 'Biscotti consumati: innumerevoli']
    },
    {
      id: 'liver',
      icon: GiLiver,
      name: t('aboutPage.liver') || 'Fegato',
      description: t('aboutPage.liverDescription') || 'Il filtro silenzioso che purifica lo stress da deadline impossibili. Ha sviluppato super-poteri per metabolizzare la frustrazione.',
      personality: '🔄 Resiliente e purificatore',
      stats: ['1,847 stress metabolizzati', '456 deadline superate', 'Tossine da bug: eliminate']
    },
    {
      id: 'kidneys',
      icon: GiKidneys,
      name: t('aboutPage.kidneys') || 'Reni',
      description: t('aboutPage.kidneysDescription') || 'Filtrano le cattive decisioni architetturali e mantengono l\'equilibrio tra ottimismo e realismo nel codice.',
      personality: '⚖️ Equilibratori nati',
      stats: ['2,100 decisioni filtrate', '67% realismo mantenuto', 'Equilibrio: sempre instabile']
    }
  ], [t]);

  // Auto-pulsing degli organi
  useEffect(() => {
    const interval = setInterval(() => {
      const randomOrgan = organs[Math.floor(Math.random() * organs.length)];
      setPulsingOrgans(prev => {
        const newPulsing = [...prev, randomOrgan.id];
        // Mantieni solo gli ultimi 2 organi pulsanti
        return newPulsing.slice(-2);
      });
      
      // Rimuovi il pulsing dopo 2 secondi
      setTimeout(() => {
        setPulsingOrgans(prev => prev.filter(id => id !== randomOrgan.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, [organs]);

  const handleOrganClick = (organ) => {
    setSelectedOrgan(selectedOrgan?.id === organ.id ? null : organ);
  };
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <motion.h3 
          className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('aboutPage.meInPieces') || 'Io in Pezzi'}
        </motion.h3>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Griglia degli organi */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {organs.map((organ, index) => {
            const isPulsing = pulsingOrgans.includes(organ.id);
            const isSelected = selectedOrgan?.id === organ.id;
            
            return (
              <motion.div
                key={organ.id}
                className="flex flex-col items-center cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isPulsing ? 1.1 : isSelected ? 1.05 : 1,
                  opacity: 1,
                }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring", 
                  stiffness: 300,
                  duration: isPulsing ? 0.5 : 0.3
                }}
                onClick={() => handleOrganClick(organ)}
              >
                {/* Container icona */}
                <motion.div
                  className="w-16 h-16 mb-3 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isPulsing ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={isPulsing ? {
                    duration: 1,
                    repeat: Infinity
                  } : {}}
                >
                  <organ.icon className="text-4xl" />
                </motion.div>
                
                {/* Nome organo */}
                <motion.span 
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center"
                  whileHover={{ color: 'inherit' }}
                >
                  {organ.name}
                </motion.span>
              </motion.div>
            );
          })}
        </div>        {/* Modal di dettaglio organo */}
        <AnimatePresence>
          {selectedOrgan && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrgan(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center text-gray-700 dark:text-gray-300 mr-4">
                      <selectedOrgan.icon className="text-3xl" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {selectedOrgan.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedOrgan.personality}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrgan(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Descrizione */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedOrgan.description}
                </p>

                {/* Statistiche */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                    📊 Statistiche:
                  </h5>
                  {selectedOrgan.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      • {stat}
                    </motion.div>
                  ))}
                </div>

                {/* Pulsante chiudi */}
                <motion.button
                  className="w-full mt-6 py-3 px-4 bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg text-white font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOrgan(null)}
                >
                  Chiudi
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};

export default MeInPieces;
