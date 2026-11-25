import React, { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'unitrack_user';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getHomePathForRole(role) {
  if (role === 'admin') return '/admin';
  if (role === 'instructor') return '/instructor';
  return '/profile';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch {
      return;
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      return;
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        return next;
      }
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
