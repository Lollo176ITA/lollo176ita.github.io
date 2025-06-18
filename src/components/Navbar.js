import React from 'react';
import { useTranslation } from 'react-i18next';
import HashLink from './HashLink';
import { useActiveRoute } from '../hooks/useNavigation';

export default function Navbar({ isOpen, toggleMenu }) {
  const { t } = useTranslation();
  const { isActive, isActivePartial } = useActiveRoute();
  
  const handleLinkClick = () => {
    toggleMenu();
  };
    const getLinkClassName = (path) => {
    const baseClass = "text-lg transition-colors font-medium";
    const activeClass = "text-blue-600 dark:text-blue-400";
    const inactiveClass = "hover:text-blue-600 dark:hover:text-blue-400";
    
    // For non-root paths, use partial matching; for root, use exact matching
    const isCurrentlyActive = path === '/' ? isActive(path) : isActivePartial(path);
    
    return `${baseClass} ${isCurrentlyActive ? activeClass : inactiveClass}`;
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <button onClick={toggleMenu} className="absolute top-4 right-4 text-3xl focus:outline-none">
        &times; {/* Icona di chiusura */}
      </button>      <ul className="flex flex-col p-8 space-y-6 mt-12">
        <li><HashLink to="/" onClick={handleLinkClick} className={getLinkClassName("/")}>{t('nav.home')}</HashLink></li>
        <li><HashLink to="/about" onClick={handleLinkClick} className={getLinkClassName("/about")}>{t('nav.about')}</HashLink></li>
        <li><HashLink to="/projects" onClick={handleLinkClick} className={getLinkClassName("/projects")}>{t('nav.projects')}</HashLink></li>
        <li><HashLink to="/creations" onClick={handleLinkClick} className={getLinkClassName("/creations")}>{t('nav.creations')}</HashLink></li>
        <li><HashLink to="/history" onClick={handleLinkClick} className={getLinkClassName("/history")}>{t('nav.history')}</HashLink></li>
      </ul>
    </div>
  );
}
