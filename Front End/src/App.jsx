import React from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import LandingPage from './landingpage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import InstructorDashboard from './pages/dashboards/instructor/InstructorDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import './App.css';

const destinations = {
  '/reports-builder': {
    title: 'Combined attendance report',
    description: 'Your selected courses are ready to be combined into an attendance report.',
    icon: BookOpen,
  },
};

function DestinationPage() {
  const location = useLocation();
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
        <Link className="destination-login" to="/login">
          Sign in <ArrowRight size={15} />
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

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => navigate('/register')}
            />
          }
        />
        <Route
          path="/register"
          element={<Register onNavigateToLogin={() => navigate('/login')} />}
        />
        <Route
          path="/profile"
          element={<Profile onNavigateHome={() => navigate('/login')} />}
        />
        <Route
          path="/student"
          element={<Profile onNavigateHome={() => navigate('/login')} />}
        />
        <Route
          path="/student-profile"
          element={<Profile onNavigateHome={() => navigate('/login')} />}
        />
        <Route
          path="/student-dashboard"
          element={<Profile onNavigateHome={() => navigate('/login')} />}
        />
        <Route
          path="/instructor/*"
          element={<InstructorDashboard onLogout={() => navigate('/login')} />}
        />
        <Route
          path="/instructor-dashboard/*"
          element={<InstructorDashboard onLogout={() => navigate('/login')} />}
        />
        <Route
          path="/admin/*"
          element={<AdminProfile onLogout={() => navigate('/login')} />}
        />
        <Route
          path="/admin-profile/*"
          element={<AdminProfile onLogout={() => navigate('/login')} />}
        />
        <Route
          path="/admin-dashboard/*"
          element={<AdminProfile onLogout={() => navigate('/login')} />}
        />
        {Object.keys(destinations).map((path) => (
          <Route key={path} path={path} element={<DestinationPage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
