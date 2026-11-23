import React from 'react';
import Login from './pages/auth/Login';

function App() {
  return (
    <div className="app-root">
      <Login />
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
