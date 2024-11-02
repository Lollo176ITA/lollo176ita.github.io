// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';

function HomePage() {
  const alphabets = ['latin', 'greek', 'cyrillic']; // Esempio di alfabeti disponibili

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Alfabeti Disponibili</h1>
        <ul className="space-y-2">
          {alphabets.map((alphabet) => (
            <li key={alphabet}>
              <Link
                to={`/alphabet/${alphabet}`}
                className="text-blue-400 hover:text-blue-200 underline"
              >
                {alphabet.charAt(0).toUpperCase() + alphabet.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
