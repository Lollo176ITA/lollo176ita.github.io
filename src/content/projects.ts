// Progetti pubblici da https://github.com/Lollo176ITA

export type ProjectCategory = 'android' | 'web' | 'desktop' | 'tool';

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  repo: string;
  url?: string;
  stack: string[];
  description: { it: string; en: string };
};

export const projects: Project[] = [
  {
    slug: 'manga-downloader',
    name: 'Manga Downloader',
    category: 'android',
    repo: 'https://github.com/Lollo176ITA/Manga-dowloader',
    stack: ['Kotlin', 'Android', 'WorkManager'],
    description: {
      it: 'Cerca manga su più fonti insieme, li legge online o li scarica in .cbz. Reader integrato, preferiti con notifiche dei nuovi capitoli e sincronizzazione con AniList.',
      en: 'Searches several manga sources at once, reads chapters online or downloads them as .cbz. Built-in reader, favourites with new-chapter notifications and AniList sync.',
    },
  },
  {
    slug: 'fai-il-pieno',
    name: 'Fai il pieno',
    category: 'android',
    repo: 'https://github.com/Lollo176ITA/Fai-il-pieno',
    stack: ['Kotlin', 'Jetpack Compose'],
    description: {
      it: 'Dice dove e quando conviene fare rifornimento usando i prezzi ufficiali pubblicati ogni giorno dal MIMIT. Tutti i calcoli avvengono sul telefono, senza backend.',
      en: 'Tells you where and when to refuel using the official prices published daily by the Italian ministry (MIMIT). Everything runs on the phone, no backend.',
    },
  },
  {
    slug: 'ai-calendar',
    name: 'AI Calendar',
    category: 'android',
    repo: 'https://github.com/Lollo176ITA/AI-calendar',
    stack: ['Kotlin', 'Jetpack Compose', 'Room'],
    description: {
      it: 'Agenda voice-first: parli o scrivi in italiano e l\'assistente crea, sposta ed elimina eventi, segnala i conflitti e arma i promemoria.',
      en: 'Voice-first planner: speak or type in Italian and the assistant creates, moves and deletes events, flags conflicts and sets reminders.',
    },
  },
  {
    slug: 'noteai',
    name: 'NoteAi',
    category: 'android',
    repo: 'https://github.com/Lollo176ITA/NoteAi',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Hilt'],
    description: {
      it: 'Note locali organizzate per progetto, con ricerca e collegamenti manuali tra note.',
      en: 'Local notes organised by project, with search and manual links between notes.',
    },
  },
  {
    slug: 'lanshare',
    name: 'LanShare Desktop',
    category: 'desktop',
    repo: 'https://github.com/Lollo176ITA/Lan-test',
    stack: ['Kotlin', 'Compose Desktop', 'Ktor'],
    description: {
      it: 'Condivisione di file e cartelle in rete locale tra macOS, Windows e Linux: scoperta automatica degli host, TLS, ripresa dei trasferimenti e sync delle cartelle.',
      en: 'LAN file and folder sharing across macOS, Windows and Linux: automatic host discovery, TLS, resumable transfers and folder sync.',
    },
  },
  {
    slug: 'passo',
    name: 'P.A.S.S.O.',
    category: 'web',
    repo: 'https://github.com/Lollo176ITA/P.A.S.S.O',
    url: 'https://passo-opal.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    description: {
      it: 'Sito dell\'associazione che accompagna i ragazzi 16–24 anni in uscita da comunità e case famiglia verso l\'autonomia.',
      en: 'Website for an association supporting 16–24 year olds leaving care homes on their way to independent adult life.',
    },
  },
  {
    slug: 'healt-site',
    name: 'Health planner',
    category: 'web',
    repo: 'https://github.com/Lollo176ITA/healt-site',
    url: 'https://healt-site.vercel.app',
    stack: ['Next.js', 'TypeScript'],
    description: {
      it: 'Prototipo: dal profilo del paziente un sistema multi-agente propone le visite consigliate e le ricalcola quando arrivano nuovi eventi di salute.',
      en: 'Prototype: from a patient profile, a multi-agent system suggests check-ups and re-plans them as new health events come in.',
    },
  },
  {
    slug: 'riscrivi-tracciato',
    name: 'Riscrivi tracciato',
    category: 'tool',
    repo: 'https://github.com/Lollo176ITA/Riscrivi-tracciato',
    stack: ['Python'],
    description: {
      it: 'Riordina e filtra le colonne di file CSV secondo una configurazione, convertendo date, importi e codici.',
      en: 'Reorders and filters CSV columns from a config file, converting dates, amounts and codes.',
    },
  },
  {
    slug: 'elimina-spazi',
    name: 'Elimina spazi',
    category: 'tool',
    repo: 'https://github.com/Lollo176ITA/elimina-spazi',
    stack: ['Python'],
    description: {
      it: 'Corregge in blocco i tag <causale> errati in file XML; una build Windows .exe viene pubblicata da GitHub Actions.',
      en: 'Batch-fixes malformed <causale> tags in XML files; a Windows .exe build is published by GitHub Actions.',
    },
  },
];
