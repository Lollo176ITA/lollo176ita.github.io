// src/pages/NotFoundPage.jsx
import Navbar from '../components/NavBar';

function NotFoundPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="p-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-4">Oops! La pagina che stai cercando non esiste.</p>
        <Link to="/" className="text-blue-400 hover:text-blue-200 underline">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
