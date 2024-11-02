// src/pages/AlphabetPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import alphabetsData from '../data/alphabets.json';


function AlphabetPage() {
  const { alphabetName } = useParams();

  // Definisci le lettere per ogni alfabeto

  const letters = alphabetsData[alphabetName.toLowerCase()];

  if (!letters) {
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Alfabeto non trovato</h1>
        <Link to="/" className="text-blue-400 underline">Torna alla Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">
        Alfabeto {alphabetName.charAt(0).toUpperCase() + alphabetName.slice(1)}
      </h1>
      <ul className="grid grid-cols-4 gap-4">
        {letters.map((letter) => (
          <li key={letter}>
            <Link
              to={`/alphabet/${alphabetName}/${letter.toLowerCase()}`}
              className="text-blue-400 hover:text-blue-200 underline"
            >
              {letter}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="text-blue-400 underline mt-4 block">Torna alla Home</Link>
    </div>
  );
}

export default AlphabetPage;
