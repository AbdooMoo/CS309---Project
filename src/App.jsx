import React, { useState, useEffect } from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#register' ? 'register' : 'login';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#register') {
        setCurrentView('register');
      } else if (window.location.hash === '#login') {
        setCurrentView('login');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToRegister = () => {
    window.location.hash = 'register';
    setCurrentView('register');
  };

  const navigateToLogin = () => {
    window.location.hash = 'login';
    setCurrentView('login');
  };

  return (
    <div className="app-root">
      {currentView === 'register' ? (
        <Register onNavigateToLogin={navigateToLogin} />
      ) : (
        <Login onNavigateToRegister={navigateToRegister} />
      )}
    </div>
  );
}

export default App;
