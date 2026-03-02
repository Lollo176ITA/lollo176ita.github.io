import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { FiMenu } from "react-icons/fi";
import LanguageSwitcher from './LanguageSwitcher';
import { useHashNavigation } from '../../hooks/useHashRouter';
import { HashRouter } from '../../utils/hashRouter';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [stocazzatoMode, setStocazzatoMode] = useState(false);
  const timerRef = useRef(null);
  const countRef = useRef(0);
  const { navigate } = useHashNavigation();
  const currentPath = HashRouter.getCurrentPath();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLolloClick = () => {
    if (stocazzatoMode) return; // Disabilita click dopo l'attivazione

    if (timerRef.current) clearTimeout(timerRef.current);
    setClickCount(prev => {
      const newCount = prev + 1;
      countRef.current = newCount;

      if (newCount === 1) {        timerRef.current = setTimeout(() => {
          if (countRef.current === 1) {
            navigate('/');
            setClickCount(0);
            countRef.current = 0;
          }
        }, 450);
      }
      if (newCount >= 10) {
        setClickCount(0);
        countRef.current = 0;
        setStocazzatoMode(true); // Abilita la modalità "stocazzato"
        navigate('/stocazzato');
        return 0;
      }
      timerRef.current = setTimeout(() => {
        setClickCount(0);
        countRef.current = 0;
      }, 5000);
      return newCount;
    });
  };
  // Non mostrare la topbar se siamo in /stocazzato
  if (currentPath === 'stocazzato') return null;

  const navId = 'primary-navigation';

  return (
    <header className="fixed top-0 w-full bg-white text-black dark:bg-black dark:text-white py-4 z-30 shadow-lg dark:shadow-white">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Apri il menu di navigazione"
            aria-expanded={isOpen}
            aria-controls={navId}
            className="text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-md"
          >
            <FiMenu />
          </button>
          <button
            type="button"
            className={`text-2xl font-bold select-none transition-all duration-500 ${
              stocazzatoMode ? 'pointer-events-none opacity-40' : 'cursor-pointer'
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-md`}
            onClick={handleLolloClick}
            title="Click me!"
          >
            Lollo176ITA
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
        </div>
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} navId={navId} />
      </div>
    </header>
  );
}
