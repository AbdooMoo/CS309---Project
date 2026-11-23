import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login';
import LandingPage from './landingpage';
import { ArrowLeft, ArrowRight, BarChart3, BookOpen, GraduationCap, ScanLine } from 'lucide-react';
import './App.css';

const destinations = {
  '/student-dashboard': {
    title: 'Student portal',
    description: 'Your attendance history and digital student ID will be waiting here.',
    icon: GraduationCap,
  },
  '/instructor-dashboard': {
    title: 'Instructor portal',
    description: 'Manage class sessions, attendance windows, and live check-ins here.',
    icon: ScanLine,
  },
  '/admin-dashboard': {
    title: 'Admin portal',
    description: 'Department analytics, course management, and audit tools live here.',
    icon: BarChart3,
  },
  '/reports-builder': {
    title: 'Combined attendance report',
    description: 'Your selected courses are ready to be combined into an attendance report.',
    icon: BookOpen,
  },
  '/live-demo': {
    title: 'Interactive demo',
    description: 'Explore a sample instructor session and student QR check-in from the landing page.',
    icon: ScanLine,
  },
};

function DestinationPage() {
  const location = useLocation();
  const destination = destinations[location.pathname];
  const Icon = destination.icon;
  const selectedCount = location.state?.selectedCourses?.length ?? 0;

  return (
    <main className="destination-page">
      <div className="destination-card">
        <Link className="destination-brand" to="/">UniTrack <span>FACULTY OF SCIENCE</span></Link>
        <div className="destination-icon"><Icon size={28} /></div>
        <span className="destination-kicker">SMART ATTENDANCE &amp; DIGITAL ID</span>
        <h1>{destination.title}</h1>
        <p>{destination.description}</p>
        {location.pathname === '/reports-builder' && (
          <div className="destination-selection">
            {selectedCount ? `${selectedCount} course${selectedCount === 1 ? '' : 's'} selected from the landing page.` : 'Choose courses in the report builder preview on the home page to get started.'}
          </div>
        )}
        {location.pathname === '/live-demo' && (
          <p className="destination-hint">The interactive instructor-to-student simulation is on the home page.</p>
        )}
        <Link className="destination-link" to="/"><ArrowLeft size={16} /> Back to UniTrack home</Link>
        <Link className="destination-login" to="/login">Sign in <ArrowRight size={15} /></Link>
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
        <Link className="destination-link" to="/"><ArrowLeft size={16} /> Back to UniTrack home</Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {Object.keys(destinations).map((path) => (
          <Route key={path} path={path} element={<DestinationPage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
