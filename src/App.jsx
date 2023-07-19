import React, { useState, useEffect } from 'react';
import './App.css';
import Survey from './Survey';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showWelcome ? (
        <div className="welcome-screen">
          <h1 className='app-heading'>Welcome to our Shop</h1>
          <button onClick={() => setShowWelcome(false)} className='app-btn' >Start</button>
        </div>
      ) : (
        <Survey />
      )}
    </div>
  );
}

export default App;