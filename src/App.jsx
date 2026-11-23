import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './pages/auth/Login';
import AdminProfile from './pages/admin/AdminProfile';
import './App.css';

function AppNavigation() {
  return (
    <nav className="app-nav-switcher" aria-label="Page switcher">
      <NavLink
        to="/admin/profile"
        className={({ isActive }) =>
          `app-nav-link ${isActive ? 'app-nav-link-active' : ''}`
        }
      >
        Admin Profile
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `app-nav-link ${isActive ? 'app-nav-link-active' : ''}`
        }
      >
        Login Page
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<AdminProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <AppNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
