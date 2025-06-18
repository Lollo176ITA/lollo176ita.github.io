// src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(next);
  };

  // Mappa la lingua al country code
  const countryCode = i18n.language === 'it' ? 'IT' : 'GB';

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch Language"
    >
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: '2.0em',
          height: '2.0em',
          borderRadius: '9999px',
          objectFit: 'cover',       // Ritaglia in modo che sia centrato e riempia il cerchio
          aspectRatio: '1 / 1',     // Forza proporzione quadrata
          display: 'block',        
        }}
        title={countryCode === 'IT' ? 'Italiano' : 'English'}
      />
    </button>
  );
}
