import React, { useState } from 'react';
import './InstructorDashboard.css';

// Subviews
import InstructorOverview from './InstructorOverview';
import InstructorCourses from './InstructorCourses';
import InstructorSessions from './InstructorSessions';
import InstructorStudents from './InstructorStudents';
import InstructorRecords from './InstructorRecords';
import InstructorReports from './InstructorReports';
import InstructorProfile from './InstructorProfile';
import InstructorSettings from './InstructorSettings';

// Modals
import LiveQRModal from './modals/LiveQRModal';
import StudentDetailModal from './modals/StudentDetailModal';
import NewSessionModal from './modals/NewSessionModal';
import NewCourseModal from './modals/NewCourseModal';
import LogOutConfirmModal from './modals/LogOutConfirmModal';

// Mock Initial Data
import {
  INSTRUCTOR_PROFILE,
  INITIAL_SUMMARY_STATS,
  INITIAL_COURSES,
  INITIAL_SESSIONS,
  INITIAL_STUDENTS,
  INITIAL_RECORDS,
  RECENT_CHECK_INS,
} from './instructorData';

export default function InstructorDashboard({ onLogout }) {
  // Navigation State (1 of the 9 sidebar items)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data States
  const [profile, setProfile] = useState(INSTRUCTOR_PROFILE);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [recentCheckIns, setRecentCheckIns] = useState(RECENT_CHECK_INS);

  // Modals State
  const [showLiveQRModal, setShowLiveQRModal] = useState(false);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Compute live session if any
  const liveSession = sessions.find((s) => s.status === 'Live') || null;

  // Summary statistics calculation
  const summaryStats = {
    totalCourses: courses.length,
    totalStudents: INITIAL_SUMMARY_STATS.totalStudents,
    activeSessions: sessions.filter((s) => s.status === 'Live').length,
    averageAttendanceRate: Math.round(
      courses.reduce((acc, c) => acc + c.attendanceRate, 0) / (courses.length || 1) * 10
    ) / 10,
    statsDelta: INITIAL_SUMMARY_STATS.statsDelta,
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavClick = (tabKey) => {
    if (tabKey === 'logout') {
      setShowLogOutModal(true);
    } else {
      setActiveTab(tabKey);
      setMobileMenuOpen(false);
    }
  };

  const handleSessionCreated = (newSession) => {
    setSessions([newSession, ...sessions]);
    showToast(`Live session created for ${newSession.courseCode}! Opening projector...`);
    setShowLiveQRModal(true);
  };

  const handleCourseCreated = (newCourse) => {
    setCourses([...courses, newCourse]);
    showToast(`Course ${newCourse.code} (${newCourse.name}) added to curriculum!`);
  };

  const handleSessionUpdated = (updatedSession) => {
    setSessions(sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s)));
    showToast(`Session ${updatedSession.id} concluded and attendance synchronized.`);
  };

  const handleUpdateRecordStatus = (recordId, newStatus, customNote) => {
    setRecords(
      records.map((r) => {
        if (r.id === recordId) {
          return {
            ...r,
            status: newStatus,
            verificationMethod: `Manual Override by Dr. Moustafa`,
            notes: customNote || `Status manually changed to ${newStatus}`,
          };
        }
        return r;
      })
    );
    showToast(`Record ${recordId} updated to ${newStatus}.`);
  };

  const handleConfirmLogout = () => {
    setShowLogOutModal(false);
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  // Sidebar navigation menu definition (The 9 exact items)
  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      ),
    },
    {
      key: 'courses',
      label: 'My Courses',
      badge: courses.length,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      ),
    },
    {
      key: 'sessions',
      label: 'Attendance Sessions',
      badge: liveSession ? '1 Live' : null,
      badgeType: 'live',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3z" fill="currentColor" />
          <path d="M18 18h3v3h-3z" fill="currentColor" />
          <path d="M14 19h2v2h-2z" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: 'students',
      label: 'Students',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      key: 'records',
      label: 'Attendance Records',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <polyline points="9 14 11 16 15 11" />
        </svg>
      ),
    },
    {
      key: 'reports',
      label: 'Attendance Reports',
      badge: 'Cart',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      key: 'profile',
      label: 'My Profile',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      key: 'logout',
      label: 'Log Out',
      isDanger: true,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`instructor-dashboard-wrapper ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="unitrack-global-toast">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`instructor-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <div className="brand-logo-icon">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="24" height="24" rx="7" stroke="#F6ECE1" strokeWidth="2.2" />
              <path d="M7 10L14 6L21 10V15C21 19.5 17.5 22.5 14 23.5C10.5 22.5 7 19.5 7 15V10Z" fill="#F6ECE1" fillOpacity="0.2" stroke="#F6ECE1" strokeWidth="1.8" />
              <circle cx="14" cy="14" r="2.8" fill="#F6ECE1" />
            </svg>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">UniTrack</span>
            <span className="brand-subtitle">SMART ATTENDANCE &amp; DIGITAL ID</span>
          </div>

          <button
            type="button"
            className="mobile-close-sidebar-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Faculty Badge Tag */}
        <div className="sidebar-faculty-tag-box">
          <span className="faculty-crest-bullet">🏛️</span>
          <span>FACULTY OF SCIENCE &bull; CAIRO UNIV</span>
        </div>

        {/* Navigation Items List */}
        <nav className="sidebar-nav-menu">
          <div className="nav-section-label">MAIN INSTRUCTOR MENU</div>
          <ul className="nav-items-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={`nav-item-button ${activeTab === item.key ? 'active' : ''} ${item.isDanger ? 'item-danger' : ''}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`nav-item-badge ${
                        item.badgeType === 'live' ? 'badge-live-pulse' : ''
                      }`}
                    >
                      {item.badgeType === 'live' && <span className="pulse-dot-tiny" />}
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Instructor User Profile Box at bottom of sidebar */}
        <div className="sidebar-user-footer">
          <div
            className="user-footer-card"
            onClick={() => setActiveTab('profile')}
            role="button"
            tabIndex={0}
            title="View Profile"
          >
            <div className="user-avatar-frame">
              <span className="user-avatar-text">MH</span>
              <span className="online-status-dot" />
            </div>

            <div className="user-details-text">
              <span className="user-full-name">{profile.name}</span>
              <span className="user-role-label">Professor &bull; Faculty Staff</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="instructor-main-viewport">
        {/* Top Navbar */}
        <header className="instructor-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="hamburger-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-app">UniTrack</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-portal">Instructor Portal</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-active font-semibold">
                {navItems.find((n) => n.key === activeTab)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Academic Term Tag */}
            <div className="academic-term-chip">
              <span className="term-circle-dot" />
              <span>Fall 2026 Semester</span>
            </div>

            {/* Quick Action: Start Live Session */}
            <button
              type="button"
              className="btn-quick-new-session"
              onClick={() => setShowNewSessionModal(true)}
            >
              <span className="plus-icon">+</span>
              <span className="btn-label-text">New Session</span>
            </button>

            {/* Notifications Button */}
            <div className="notifications-wrapper">
              <button
                type="button"
                className="topbar-icon-button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="notification-bubble">3</span>
              </button>

              {notificationsOpen && (
                <div className="notifications-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <h4>Notifications</h4>
                    <span className="unread-count">3 unread</span>
                  </div>
                  <div className="notifications-list">
                    <div className="notification-item unread">
                      <span className="notif-icon">🛡️</span>
                      <div className="notif-content">
                        <p className="notif-msg">
                          <strong>Mohamed Ahmed Mansour</strong> checked in to CS 309 Lecture 11 with geofenced QR.
                        </p>
                        <span className="notif-time">Just now</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <span className="notif-icon">⚠️</span>
                      <div className="notif-content">
                        <p className="notif-msg">
                          <strong>Youssef Amr Hassan</strong> dropped below 70% attendance in CS 309.
                        </p>
                        <span className="notif-time">25 mins ago</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <span className="notif-icon">📋</span>
                      <div className="notif-content">
                        <p className="notif-msg">
                          Medical excuse approved by Faculty Clinic for <strong>Karim Mahmoud Zaki</strong>.
                        </p>
                        <span className="notif-time">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="popover-footer">
                    <button
                      type="button"
                      className="mark-read-btn"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Dismiss &bull; Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <div
              className="topbar-profile-pill"
              onClick={() => setActiveTab('profile')}
              role="button"
              tabIndex={0}
            >
              <div className="profile-mini-avatar">MH</div>
              <span className="profile-mini-name">Dr. Moustafa</span>
            </div>
          </div>
        </header>

        {/* Dynamic Subview Body based on Active Tab */}
        <main className="instructor-content-body">
          {activeTab === 'dashboard' && (
            <InstructorOverview
              summaryStats={summaryStats}
              liveSession={liveSession}
              courses={courses}
              recentCheckIns={recentCheckIns}
              onOpenLiveQR={() => setShowLiveQRModal(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'courses' && (
            <InstructorCourses
              courses={courses}
              onOpenNewCourseModal={() => setShowNewCourseModal(true)}
              onOpenLiveQR={() => setShowLiveQRModal(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'sessions' && (
            <InstructorSessions
              sessions={sessions}
              courses={courses}
              onOpenNewSessionModal={() => setShowNewSessionModal(true)}
              onOpenLiveQR={() => setShowLiveQRModal(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'students' && (
            <InstructorStudents
              students={students}
              courses={courses}
              onSelectStudent={(st) => setSelectedStudentForModal(st)}
            />
          )}

          {activeTab === 'records' && (
            <InstructorRecords
              records={records}
              courses={courses}
              onUpdateRecordStatus={handleUpdateRecordStatus}
            />
          )}

          {activeTab === 'reports' && (
            <InstructorReports courses={courses} />
          )}

          {activeTab === 'profile' && (
            <InstructorProfile
              onProfileUpdated={(updated) => {
                setProfile(updated);
                showToast('Profile credentials saved!');
              }}
            />
          )}

          {activeTab === 'settings' && <InstructorSettings />}
        </main>
      </div>

      {/* Modals */}
      {showLiveQRModal && (
        <LiveQRModal
          session={liveSession}
          onClose={() => setShowLiveQRModal(false)}
          onSessionUpdated={handleSessionUpdated}
        />
      )}

      {selectedStudentForModal && (
        <StudentDetailModal
          student={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}

      {showNewSessionModal && (
        <NewSessionModal
          courses={courses}
          onClose={() => setShowNewSessionModal(false)}
          onSessionCreated={handleSessionCreated}
        />
      )}

      {showNewCourseModal && (
        <NewCourseModal
          onClose={() => setShowNewCourseModal(false)}
          onCourseCreated={handleCourseCreated}
        />
      )}

      {showLogOutModal && (
        <LogOutConfirmModal
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogOutModal(false)}
        />
      )}
    </div>
  );
}
