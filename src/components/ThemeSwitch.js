// src/components/ThemeSwitch.js
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-black rounded-full flex items-center justify-center transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : ''
        }`}
      >
        {theme === 'light' ? (
          <FaSun className="text-yellow-500" />
        ) : (
          <FaMoon className="text-yellow-300" />
        )}
      </div>
    </button>
  );
}
