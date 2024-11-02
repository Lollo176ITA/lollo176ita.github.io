// src/components/Breadcrumbs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ paths }) {
  return (
    <nav className="text-gray-400 mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          <Link to={path.link} className="hover:text-white">
            {path.name}
          </Link>
          {index < paths.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
