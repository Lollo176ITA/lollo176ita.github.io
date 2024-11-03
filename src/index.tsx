import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import your Tailwind CSS here
import App from './App';

// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);