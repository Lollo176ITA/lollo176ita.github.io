import React, { useState } from "react";
import Navbar from "./Navbar";
import { FiMenu } from "react-icons/fi"; // Importa l'icona dal pacchetto react-icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-white text-black py-4 z-30 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Parte sinistra con l'hamburger e il titolo */}
        <div className="flex items-center space-x-4">
          {/* Menu Icon Button, sempre visibile e più a sinistra */}
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            <FiMenu />
          </button>
          {/* Brand Name */}
          <div className="text-2xl font-bold">Lollo176ITA</div>
        </div>
        {/* Contact Button */}
        <a
          href="mailto:lollo176ita@gmail.com"
          className="relative px-6 py-2 border-2 border-black text-black font-medium rounded-full bg-white transition-all duration-300 hover:bg-black hover:text-white"
        >
          Contact
        </a>
        {/* Navbar Component */}
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}
