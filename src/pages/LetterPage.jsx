// src/pages/LetterPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import letterDetails from '../data/letters.json';

function LetterPage() {
  const { alphabetName, letterName } = useParams();

  const letter = letterDetails[alphabetName.toLowerCase()]?.[letterName.toLowerCase()];

  if (!letter) {
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Lettera non trovata</h1>
        <Link to={`/alphabet/${alphabetName}`} className="text-blue-400 underline">Torna all'alfabeto</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-5xl font-bold mb-4">{letter.name}</h1>
      <p className="text-lg mb-4">{letter.description}</p>
      <Link to={`/alphabet/${alphabetName}`} className="text-blue-400 underline">Torna all'alfabeto</Link>
    </div>
  );
}

export default LetterPage;
