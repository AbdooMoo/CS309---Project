import React, { useState } from 'react';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('profile');

  return (
    <div className="app-root">
      {currentPage === 'profile' ? (
        <Profile onNavigateHome={() => setCurrentPage('login')} />
      ) : (
        <Login onNavigateToRegister={() => {}} />
      )}
    </div>
  );
}

export default App;
