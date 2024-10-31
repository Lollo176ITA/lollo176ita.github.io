import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleAnimationEnd = () => {
    setShowMainContent(true);
  };

  return (
    <div className="App">
      {!showMainContent ? (
        <IntroAnimation onAnimationEnd={handleAnimationEnd} />
      ) : (
        // Contenuto principale dell'app
        <div className="main-content">
          <h1 className="text-center text-4xl mt-20">Benvenuto nella schermata principale!</h1>
        </div>
      )}
    </div>
  );
}

export default App;
