import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    
<nav className="bg-blue-500 p-4 text-white flex justify-around">
  <Link to="/" className="hover:underline">Home</Link>
  <Link to="/about" className="hover:underline">About</Link>
  <Link to="/contact" className="hover:underline">Contact</Link>
</nav>

);

export default Navbar;
