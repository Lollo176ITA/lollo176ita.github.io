import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { FiMenu } from "react-icons/fi";
import LanguageSwitcher from './LanguageSwitcher';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [stocazzatoMode, setStocazzatoMode] = useState(false);
  const timerRef = useRef(null);
  const countRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLolloClick = () => {
    if (stocazzatoMode) return; // Disabilita click dopo l'attivazione

    if (timerRef.current) clearTimeout(timerRef.current);
    setClickCount(prev => {
      const newCount = prev + 1;
      countRef.current = newCount;

      if (newCount === 1) {
        timerRef.current = setTimeout(() => {
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
  if (location.pathname === '/stocazzato') return null;

  return (
    <header className="fixed top-0 w-full bg-white text-black dark:bg-black dark:text-white py-4 z-30 shadow-lg dark:shadow-white">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            <FiMenu />
          </button>
          <div
            className={`text-2xl font-bold select-none transition-all duration-500 ${
              stocazzatoMode ? 'pointer-events-none opacity-40' : 'cursor-pointer'
            }`}
            onClick={handleLolloClick}
            title="Click me!"
          >
            Lollo176ITA
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
        </div>
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}
