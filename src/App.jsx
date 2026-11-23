import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import InstructorDashboard from './pages/dashboards/instructor/InstructorDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (user) => {
    if (user?.role === 'instructor' || user?.email?.toLowerCase().includes('instructor')) {
      navigate('/instructor');
    } else if (user?.role === 'admin' || user?.email?.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  const currentPath = location.pathname.toLowerCase();
  const isProfileActive = currentPath === '/' || currentPath.includes('profile') || currentPath.includes('student');
  const isInstructorActive = currentPath.includes('instructor');
  const isAdminActive = currentPath.includes('admin');
  const isLoginActive = currentPath.includes('login');

  return (
    <div className="app-root">
      <aside className="portal-dev-switcher" aria-label="Portal View Switcher">
        <span className="switcher-title">UniTrack Navigation:</span>
        <div className="switcher-buttons">
          <button
            type="button"
            className={`switcher-pill ${isLoginActive ? 'active' : ''}`}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`switcher-pill ${isProfileActive ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            Student Profile
          </button>
          <button
            type="button"
            className={`switcher-pill ${isInstructorActive ? 'active' : ''}`}
            onClick={() => navigate('/instructor')}
          >
            Instructor Dashboard
          </button>
          <button
            type="button"
            className={`switcher-pill ${isAdminActive ? 'active' : ''}`}
            onClick={() => navigate('/admin')}
          >
            Admin Profile
          </button>
        </div>
      </aside>

      <Routes>
        <Route path="/" element={<Profile onNavigateHome={() => navigate('/login')} />} />
        <Route path="/profile" element={<Profile onNavigateHome={() => navigate('/login')} />} />
        <Route path="/student" element={<Profile onNavigateHome={() => navigate('/login')} />} />
        <Route path="/student-profile" element={<Profile onNavigateHome={() => navigate('/login')} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => {}} />} />
        <Route path="/instructor/*" element={<InstructorDashboard onLogout={() => navigate('/login')} />} />
        <Route path="/admin/*" element={<AdminProfile onLogout={() => navigate('/login')} />} />
        <Route path="/admin-profile" element={<AdminProfile onLogout={() => navigate('/login')} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
