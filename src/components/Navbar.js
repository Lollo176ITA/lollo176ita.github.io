import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isOpen, toggleMenu }) {
  const handleLinkClick = () => {
    // Puoi aggiungere altra logica qui se necessario
    toggleMenu();
  };

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
        <li>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
        </li>
        <li>
          <Link to="/projects" onClick={handleLinkClick}>Projects</Link>
        </li>
      </ul>
    </div>
  );
}
