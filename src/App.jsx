import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import AdminProfile from './pages/admin/AdminProfile';
import './App.css';

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
      </div>
    </BrowserRouter>
  );
}

export default App;
