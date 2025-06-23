import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaBrain, 
  FaEye, 
  FaHandPaper,
  FaLungs,
  FaTimes,
  FaTooth,
  FaBone,
  FaSkull
} from 'react-icons/fa';
import { 
  GiStomach,
  GiKidneys, 
  GiLiver,
  GiHeartOrgan,
  GiInternalOrgan
} from 'react-icons/gi';

const MeInPieces = () => {
  const { t } = useTranslation();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [pulsingOrgans, setPulsingOrgans] = useState([]);  // Organi con descrizioni, statistiche ironiche e colori realistici
  const organs = useMemo(() => [
    {
      id: 'brain',
      icon: FaBrain,
      name: t('aboutPage.brain') || 'Cervello',
      color: '#FFB6C1', // Rosa pallido per materia grigia
      description: t('aboutPage.brainDescription') || 'Il centro di comando dove nascono le idee più folli. Processa caffè e codice in quantità industriali, spesso alle 3 del mattino.',
      personality: t('aboutPage.brainPersonality') || '🧠 Sempre attivo, mai spento',
      stats: [
        t('aboutPage.brainStat1') || '456 idee generate',
        t('aboutPage.brainStat2') || '2,847 tazze di caffè processate', 
        t('aboutPage.brainStat3') || '847 notti insonni'
      ]
    },
    {
      id: 'eyes',
      icon: FaEye, 
      name: t('aboutPage.eyes') || 'Occhi',
      color: '#87CEEB', // Azzurro per l'iride
      description: t('aboutPage.eyesDescription') || 'Testimoni silenziosi di migliaia di righe di codice. Hanno visto errori, bug e quella volta che ho dimenticato un punto e virgola per 3 ore.',
      personality: t('aboutPage.eyesPersonality') || '👀 Vedono tutto, dimenticano poco',
      stats: [
        t('aboutPage.eyesStat1') || '5,333 righe di codice viste',
        t('aboutPage.eyesStat2') || '1,203 bug individuati', 
        t('aboutPage.eyesStat3') || '∞ Stack Overflow consultazioni'
      ]
    },{
      id: 'heart',
      icon: GiHeartOrgan,
      name: t('aboutPage.heart') || 'Cuore',
      color: '#DC143C', // Rosso carminio per il cuore
      description: t('aboutPage.heartDescription') || 'Batte per la programmazione, accelera quando il codice funziona al primo colpo, si ferma quando vedo un merge conflict.',
      personality: t('aboutPage.heartPersonality') || '❤️ Appassionato e determinato',
      stats: [
        t('aboutPage.heartStat1') || '23 progetti amati',
        t('aboutPage.heartStat2') || '100% dedicazione', 
        t('aboutPage.heartStat3') || 'Battiti extra per ogni deploy'
      ]
    },
    {
      id: 'lungs',
      icon: FaLungs,
      name: t('aboutPage.lungs') || 'Polmoni',
      color: '#FFE4E1', // Rosa chiaro per i polmoni
      description: t('aboutPage.lungsDescription') || 'Respirano codice pulito e sospirano profondamente ad ogni refactoring. Hanno trattenuto il fiato durante troppi build di produzione.',
      personality: t('aboutPage.lungsPersonality') || '🫁 Pazienti ma spesso in apnea',
      stats: [
        t('aboutPage.lungsStat1') || '1,205 sospiri profondi',
        t('aboutPage.lungsStat2') || '3,400 respiri trattenuti', 
        t('aboutPage.lungsStat3') || '∞ "Finalmente funziona!"'
      ]
    },    {
      id: 'hands',
      icon: FaHandPaper,
      name: t('aboutPage.hands') || 'Mani',
      color: '#FDBCB4', // Colore pelle
      description: t('aboutPage.handsDescription') || 'Le vere eroine di questa storia. Hanno digitato, debuggato, e lanciato oggetti contro il monitor (sempre senza romperlo).',
      personality: t('aboutPage.handsPersonality') || '🤲 Instancabili e creative',
      stats: [
        t('aboutPage.handsStat1') || 'Milioni di tasti premuti',
        t('aboutPage.handsStat2') || 'Zero monitor rotti', 
        t('aboutPage.handsStat3') || 'Infinite gesture di frustrazione'
      ]
    },
    {
      id: 'stomach',
      icon: GiStomach,
      name: t('aboutPage.stomach') || 'Stomaco',
      color: '#DDA0DD', // Viola pallido per lo stomaco
      description: t('aboutPage.stomachDescription') || 'Convertitore ufficiale di caffè in codice. Ha sviluppato una tolleranza leggendaria alla caffeina e una dipendenza dai biscotti.',
      personality: t('aboutPage.stomachPersonality') || '☕ Sempre affamato di caffè',
      stats: [
        t('aboutPage.stomachStat1') || '2,847 caffè processati',
        t('aboutPage.stomachStat2') || 'Tolleranza caffeina: leggendaria', 
        t('aboutPage.stomachStat3') || 'Biscotti consumati: innumerevoli'
      ]
    },
    {
      id: 'liver',
      icon: GiLiver,
      name: t('aboutPage.liver') || 'Fegato',
      color: '#8B4513', // Marrone rossastro per il fegato
      description: t('aboutPage.liverDescription') || 'Il filtro silenzioso che purifica lo stress da deadline impossibili. Ha sviluppato super-poteri per metabolizzare la frustrazione.',
      personality: t('aboutPage.liverPersonality') || '🔄 Resiliente e purificatore',
      stats: [
        t('aboutPage.liverStat1') || '1,847 stress metabolizzati',
        t('aboutPage.liverStat2') || '456 deadline superate', 
        t('aboutPage.liverStat3') || 'Tossine da bug: eliminate'
      ]
    },
    {
      id: 'kidneys',
      icon: GiKidneys,
      name: t('aboutPage.kidneys') || 'Reni',
      color: '#CD853F', // Marrone chiaro per i reni
      description: t('aboutPage.kidneysDescription') || 'Filtrano le cattive decisioni architetturali e mantengono l\'equilibrio tra ottimismo e realismo nel codice.',
      personality: t('aboutPage.kidneysPersonality') || '⚖️ Equilibratori nati',      stats: [
        t('aboutPage.kidneysStat1') || '2,344 decisioni filtrate',
        t('aboutPage.kidneysStat2') || '100% purezza architetturale', 
        t('aboutPage.kidneysStat3') || 'Zero compromessi accettati'
      ]    },
    {
      id: 'spleen',
      icon: GiInternalOrgan,
      name: t('aboutPage.spleen') || 'Milza',
      color: '#800080', // Viola scuro per la milza
      description: t('aboutPage.spleenDescription') || 'L\'organo più misterioso, che accumula tutta la rabbia repressa quando il codice non compila. Ha una memoria perfetta di ogni errore stupido.',
      personality: t('aboutPage.spleenPersonality') || '😤 Collezionista di frustrazioni',
      stats: [
        t('aboutPage.spleenStat1') || '1,567 rabbie accumulate',
        t('aboutPage.spleenStat2') || 'Perfect bug memory', 
        t('aboutPage.spleenStat3') || 'Errori stupidi ricordati: tutti'
      ]
    },
    {
      id: 'ribcage',
      icon: FaBone,
      name: t('aboutPage.ribcage') || 'Costole',
      color: '#F5F5DC', // Beige per le ossa
      description: t('aboutPage.ribcageDescription') || 'La struttura di supporto che protegge tutto il resto. Come l\'architettura del codice, se cede tutto va a rotoli.',
      personality: t('aboutPage.ribcagePersonality') || '🦴 Struttura e sostegno',
      stats: [
        t('aboutPage.ribcageStat1') || '100% codice protetto',
        t('aboutPage.ribcageStat2') || '0 architetture crollate', 
        t('aboutPage.ribcageStat3') || 'Struttura: sempre solida'
      ]
    },
    {
      id: 'skull',
      icon: FaSkull,
      name: t('aboutPage.skull') || 'Cranio',
      color: '#FFFAF0', // Bianco avorio per il cranio
      description: t('aboutPage.skullDescription') || 'La fortezza che protegge il cervello dai colpi esterni. Ha resistito a infinite testate contro il muro quando il codice non andava.',
      personality: t('aboutPage.skullPersonality') || '💀 Guardiano del pensiero',
      stats: [
        t('aboutPage.skullStat1') || '2,340 testate evitate',
        t('aboutPage.skullStat2') || 'Cervello: sempre protetto', 
        t('aboutPage.skullStat3') || 'Resistenza: leggendaria'
      ]
    },
    {
      id: 'teeth',
      icon: FaTooth,
      name: t('aboutPage.teeth') || 'Denti',
      color: '#FFFFF0', // Bianco avorio per i denti
      description: t('aboutPage.teethDescription') || 'Strumenti di sopravvivenza che masticano problemi complessi. Hanno morso troppe volte la lingua durante sessioni di debugging intense.',
      personality: t('aboutPage.teethPersonality') || '🦷 Masticatori di problemi',
      stats: [
        t('aboutPage.teethStat1') || '5,678 problemi masticati',
        t('aboutPage.teethStat2') || '234 volte morsa la lingua', 
        t('aboutPage.teethStat3') || 'Debugging intensity: massima'
      ]
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
              >                {/* Container icona */}
                <motion.div
                  className="w-16 h-16 mb-3 flex items-center justify-center transition-all duration-200"
                  style={{ 
                    color: organ.color,
                    filter: isPulsing 
                      ? `brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 2px rgba(0,0,0,0.8))` 
                      : `drop-shadow(0 0 2px rgba(0,0,0,0.6))`,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    filter: `brightness(1.1) drop-shadow(0 0 12px ${organ.color}50) drop-shadow(0 0 3px rgba(0,0,0,0.8))`
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={isPulsing ? {
                    scale: [1, 1.2, 1],
                    filter: [
                      `brightness(1) drop-shadow(0 0 0px transparent) drop-shadow(0 0 2px rgba(0,0,0,0.6))`,
                      `brightness(1.3) drop-shadow(0 0 16px ${organ.color}80) drop-shadow(0 0 4px rgba(0,0,0,0.9))`,
                      `brightness(1) drop-shadow(0 0 0px transparent) drop-shadow(0 0 2px rgba(0,0,0,0.6))`
                    ]
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
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    color: isSelected ? organ.color : 'inherit'
                  }}
                  whileHover={{ 
                    color: organ.color,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                  }}
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
                  <div className="flex items-center">                    <div 
                      className="w-12 h-12 flex items-center justify-center mr-4"
                      style={{ 
                        color: selectedOrgan.color,
                        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.7))',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}
                    >
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
                <div className="space-y-2">                  <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                    📊 {t('common.statistics') || 'Statistiche'}:
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
                </div>                {/* Pulsante chiudi */}
                <motion.button
                  className="w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all duration-200"                  style={{ 
                    backgroundColor: selectedOrgan.color,
                    color: selectedOrgan.color === '#FFFAF0' || selectedOrgan.color === '#FFFFF0' || selectedOrgan.color === '#F5F5DC' || selectedOrgan.color === '#FFE4E1' ? '#333333' : '#FFFFFF',
                    textShadow: selectedOrgan.color === '#FFFAF0' || selectedOrgan.color === '#FFFFF0' || selectedOrgan.color === '#F5F5DC' || selectedOrgan.color === '#FFE4E1' ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)',
                    boxShadow: `0 4px 12px ${selectedOrgan.color}30`
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 6px 16px ${selectedOrgan.color}40`
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOrgan(null)}
                >
                  {t('common.close') || 'Chiudi'}
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
