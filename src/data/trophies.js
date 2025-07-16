import { 
  FaStar, 
  FaGamepad, 
  FaCode, 
  FaRocket, 
  FaHeart, 
  FaFire, 
  FaGem, 
  FaCrown
} from 'react-icons/fa';

// Definizione dei trofei disponibili
export const TROPHIES = {
  FIRST_VISIT: {
    id: 'first_visit',
    name: 'Primo Visitatore',
    nameEn: 'First Visitor',
    description: 'Benvenuto sul mio sito!',
    descriptionEn: 'Welcome to my website!',
    icon: FaStar,
    color: 'text-yellow-500',
    rarity: 'common'
  },
  GAME_MASTER: {
    id: 'game_master',
    name: 'Maestro del Gioco',
    nameEn: 'Game Master',
    description: 'Hai completato il gioco della griglia!',
    descriptionEn: 'You completed the grid game!',
    icon: FaGamepad,
    color: 'text-purple-500',
    rarity: 'rare'
  },
  CODE_EXPLORER: {
    id: 'code_explorer',
    name: 'Esploratore del Codice',
    nameEn: 'Code Explorer',
    description: 'Hai visitato la sezione progetti!',
    descriptionEn: 'You visited the projects section!',
    icon: FaCode,
    color: 'text-blue-500',
    rarity: 'common'
  },
  LIGHTHOUSE_CHECKER: {
    id: 'lighthouse_checker',
    name: 'Ispettore Lighthouse',
    nameEn: 'Lighthouse Inspector',
    description: 'Hai controllato le statistiche del sito!',
    descriptionEn: 'You checked the site statistics!',
    icon: FaRocket,
    color: 'text-green-500',
    rarity: 'uncommon'
  },
  BOOK_READER: {
    id: 'book_reader',
    name: 'Lettore Appassionato',
    nameEn: 'Book Reader',
    description: 'Hai letto un capitolo dei miei libri!',
    descriptionEn: 'You read a chapter of my books!',
    icon: FaHeart,
    color: 'text-red-500',
    rarity: 'uncommon'
  },
  THEME_SWITCHER: {
    id: 'theme_switcher',
    name: 'Cambia Tema',
    nameEn: 'Theme Switcher',
    description: 'Hai cambiato il tema del sito!',
    descriptionEn: 'You changed the site theme!',
    icon: FaFire,
    color: 'text-orange-500',
    rarity: 'common'
  },
  COMPLETIONIST: {
    id: 'completionist',
    name: 'Completista',
    nameEn: 'Completionist',
    description: 'Hai visitato tutte le sezioni!',
    descriptionEn: 'You visited all sections!',
    icon: FaCrown,
    color: 'text-gold-500',
    rarity: 'legendary'
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Demone della Velocità',
    nameEn: 'Speed Demon',
    description: 'Hai completato il gioco in 30 secondi o meno!',
    descriptionEn: 'You completed the game in 30 seconds or less!',
    icon: FaGem,
    color: 'text-cyan-500',
    rarity: 'epic'
  },
  GRID_FILLER: {
    id: 'grid_filler',
    name: 'Riempitore di Griglie',
    nameEn: 'Grid Filler',
    description: 'Hai riempito completamente la griglia del gioco!',
    descriptionEn: 'You completely filled the game grid!',
    icon: FaFire,
    color: 'text-orange-500',
    rarity: 'community',
    credits: 'LoreLuca'
  }
};

// Utility per ottenere il colore basato sulla rarità
export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common': return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
    case 'uncommon': return 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-200';
    case 'rare': return 'bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-blue-200';
    case 'epic': return 'bg-purple-200 text-purple-800 dark:bg-purple-600 dark:text-purple-200';
    case 'legendary': return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-200';
    case 'community': return 'bg-teal-200 text-teal-800 dark:bg-teal-600 dark:text-teal-200';
    default: return 'bg-gray-200 text-gray-800';
  }
};
