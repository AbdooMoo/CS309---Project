<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Login from './pages/auth/Login';
import InstructorDashboard from './pages/dashboards/instructor/InstructorDashboard';
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import AdminProfile from './pages/admin/AdminProfile';
>>>>>>> 28f91eb5f8ed4243474d102e244d3779569cb4b2
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
<<<<<<< HEAD
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
=======
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<AdminProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 28f91eb5f8ed4243474d102e244d3779569cb4b2
  );
}

export default App;
