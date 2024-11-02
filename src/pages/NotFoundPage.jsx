// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Pagina non trovata</p>
      <Link to="/" className="text-blue-400 underline">Torna alla Home</Link>
    </div>
  );
}

export default NotFoundPage;
