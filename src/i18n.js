// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import it from './locales/it/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    lng: 'it',            // lingua di partenza
    fallbackLng: 'en',     // se manca una chiave in it, usa en
    interpolation: { escapeValue: false },
  });

export default i18n;
