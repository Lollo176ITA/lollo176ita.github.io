import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar({ isOpen, toggleMenu }) {
  const handleLinkClick = () => {
    // Puoi aggiungere altra logica qui se necessario
    toggleMenu();
  };

  const { t } = useTranslation();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <button onClick={toggleMenu} className="absolute top-4 right-4 text-3xl focus:outline-none">
        &times; {/* Icona di chiusura */}
      </button>
      <ul className="flex flex-col p-8 space-y-6 mt-12">
        <li><Link to="/" onClick={handleLinkClick}>{t('nav.home')}</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>{t('nav.about')}</Link></li>
        <li><Link to="/projects" onClick={handleLinkClick}>{t('nav.projects')}</Link></li>
        <li><Link to="/creations" onClick={handleLinkClick}>{t('nav.creations')}</Link></li>
        <li><Link to="/history" onClick={handleLinkClick}>{t('nav.history')}</Link></li>
      </ul>
    </div>
  );
}
