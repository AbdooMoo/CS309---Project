import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import LandingPage from './landingpage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import InstructorDashboard from './pages/dashboards/instructor/InstructorDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import { useAuth, getHomePathForRole } from './context/AuthContext';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import './App.css';

const destinations = {
  '/reports-builder': {
    title: 'Combined attendance report',
    description: 'Your selected courses are ready to be combined into an attendance report.',
    icon: BookOpen,
  },
};

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  return children;
}

function DestinationPage() {
  const location = useLocation();
  const { user } = useAuth();
  const destination = destinations[location.pathname];
  if (!destination) return <NotFoundPage />;
  const Icon = destination.icon;
  const selectedCount = location.state?.selectedCourses?.length ?? 0;

  return (
    <main className="destination-page">
      <div className="destination-card">
        <Link className="destination-brand" to="/">
          UniTrack <span>FACULTY OF SCIENCE</span>
        </Link>
        <div className="destination-icon">
          <Icon size={28} />
        </div>
        <span className="destination-kicker">SMART ATTENDANCE &amp; DIGITAL ID</span>
        <h1>{destination.title}</h1>
        <p>{destination.description}</p>
        {location.pathname === '/reports-builder' && (
          <div className="destination-selection">
            {selectedCount
              ? `${selectedCount} course${selectedCount === 1 ? '' : 's'} selected from the landing page.`
              : 'Choose courses in the report builder preview on the home page to get started.'}
          </div>
        )}
        <Link className="destination-link" to="/">
          <ArrowLeft size={16} /> Back to UniTrack home
        </Link>
        <Link className="destination-login" to={user ? getHomePathForRole(user.role) : '/login'}>
          {user ? 'Go to portal' : 'Sign in'} <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="destination-page">
      <div className="destination-card">
        <span className="destination-kicker">UNITRACK</span>
        <h1>We can’t find that page.</h1>
        <p>Head back to the home page to find the right portal.</p>
        <Link className="destination-link" to="/">
          <ArrowLeft size={16} /> Back to UniTrack home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleLoginSuccess = (authenticatedUser) => {
    login(authenticatedUser);
    navigate(getHomePathForRole(authenticatedUser?.role));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={getHomePathForRole(user.role)} replace />
            ) : (
              <Login
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={() => navigate('/register')}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to={getHomePathForRole(user.role)} replace />
            ) : (
              <Register
                onNavigateToLogin={() => navigate('/login')}
                onRegisterVerified={handleLoginSuccess}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <Profile onNavigateHome={() => navigate('/')} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <Profile onNavigateHome={() => navigate('/')} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <Profile onNavigateHome={() => navigate('/')} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <Profile onNavigateHome={() => navigate('/')} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfile onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-profile/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfile onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfile onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        {Object.keys(destinations).map((path) => (
          <Route key={path} path={path} element={<DestinationPage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
