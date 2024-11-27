import React from 'react';

export default function Navbar({ isOpen, toggleMenu }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <button onClick={toggleMenu} className="absolute top-4 right-4 text-3xl focus:outline-none">
        &times; {/* Close icon */}
      </button>
      <ul className="flex flex-col p-8 space-y-6 mt-12">
        <li><a href="#home" className="hover:underline text-xl">Home</a></li>
        <li><a href="#about" className="hover:underline text-xl">About</a></li>
        <li><a href="#projects" className="hover:underline text-xl">Projects</a></li>
      </ul>
    </div>
  );
}
