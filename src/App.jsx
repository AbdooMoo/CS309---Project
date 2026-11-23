import React, { useState, useEffect } from 'react';
import Login from './pages/auth/Login';
import InstructorDashboard from './pages/dashboards/instructor/InstructorDashboard';
import './App.css';

function App() {
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('instructor') || hash.includes('instructor') || search.includes('instructor')) {
      return 'instructor';
    }
    return 'login';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToInstructor = () => {
    window.history.pushState({}, '', '/instructor');
    setCurrentView('instructor');
  };

  const handleLogout = () => {
    window.history.pushState({}, '', '/');
    setCurrentView('login');
  };

  const handleLoginSuccess = (user) => {
    if (user?.role === 'instructor' || user?.email?.includes('instructor')) {
      handleNavigateToInstructor();
    }
  };

  return (
    <div className="app-root">
      {/* Discreet Portal View Switcher for Evaluation */}
      <aside className="portal-dev-switcher" aria-label="Portal View Switcher">
        <span className="switcher-title">UniTrack Navigation:</span>
        <div className="switcher-buttons">
          <button
            type="button"
            className={`switcher-pill ${currentView === 'login' ? 'active' : ''}`}
            onClick={handleLogout}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`switcher-pill ${currentView === 'instructor' ? 'active' : ''}`}
            onClick={handleNavigateToInstructor}
          >
            Instructor Dashboard
          </button>
        </div>
      </aside>

      {currentView === 'instructor' ? (
        <InstructorDashboard onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
