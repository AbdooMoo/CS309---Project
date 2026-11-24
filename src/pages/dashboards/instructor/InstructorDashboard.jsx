import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ClipboardCheck, LogOut, Menu, QrCode, Users, X } from 'lucide-react';
import './InstructorDashboard.css';
import InstructorCourses from './InstructorCourses';
import InstructorSessions from './InstructorSessions';
import InstructorStudents from './InstructorStudents';
import InstructorRecords from './InstructorRecords';
import LiveQRModal from './modals/LiveQRModal';
import StudentDetailModal from './modals/StudentDetailModal';
import NewSessionModal from './modals/NewSessionModal';
import NewCourseModal from './modals/NewCourseModal';
import LogOutConfirmModal from './modals/LogOutConfirmModal';
import {
  INITIAL_COURSES,
  INITIAL_SESSIONS,
  INITIAL_STUDENTS,
  INITIAL_RECORDS,
} from './instructorData';

const sections = [
  { id: 'courses', label: 'Courses', Icon: BookOpen },
  { id: 'sessions', label: 'Sessions', Icon: CalendarDays },
  { id: 'students', label: 'Students', Icon: Users },
  { id: 'records', label: 'Records', Icon: ClipboardCheck },
];

const headings = {
  courses: ['Teaching', 'My courses'],
  sessions: ['Attendance', 'Class sessions'],
  students: ['Teaching', 'Student directory'],
  records: ['Attendance', 'Attendance records'],
};

function Brand() {
  return (
    <Link className="brand instructor-brand" to="/" aria-label="UniTrack home">
      <span className="brand-mark"><QrCode size={21} strokeWidth={2.2} /></span>
      <span className="brand-copy">
        <strong>UniTrack</strong>
        <small>SMART ATTENDANCE &amp; DIGITAL ID</small>
      </span>
    </Link>
  );
}

export default function InstructorDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('courses');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [projectingSession, setProjectingSession] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newSessionCourse, setNewSessionCourse] = useState('');
  const [showNewSession, setShowNewSession] = useState(false);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [studentCourseFilter, setStudentCourseFilter] = useState('All');

  const startSession = (courseCode = '') => {
    setNewSessionCourse(courseCode);
    setShowNewSession(true);
  };

  const addSession = (session) => {
    setSessions((current) => [session, ...current]);
    setProjectingSession(session);
  };

  const updateSession = (updatedSession) => {
    setSessions((current) => current.map((session) => (
      session.id === updatedSession.id ? updatedSession : session
    )));
  };

  const updateRecord = (recordId, status) => {
    setRecords((current) => current.map((record) => (
      record.id === recordId
        ? { ...record, status, verificationMethod: 'Instructor update' }
        : record
    )));
  };

  const navigateToStudents = (courseCode = 'All') => {
    setStudentCourseFilter(courseCode);
    setActiveSection('students');
  };

  const [eyebrow, title] = headings[activeSection];
  const liveSession = sessions.find((session) => session.status === 'Live');

  return (
    <div className="instructor-page">
      <header className="instructor-header">
        <div className="header-inner instructor-header-inner">
          <Brand />
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav instructor-nav${mobileMenuOpen ? ' nav-open' : ''}`} aria-label="Instructor sections">
            {sections.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={activeSection === id ? 'active' : ''}
                aria-current={activeSection === id ? 'page' : undefined}
                onClick={() => {
                  setActiveSection(id);
                  setMobileMenuOpen(false);
                }}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>
          <div className="header-actions instructor-header-actions">
            <button className="button button-primary button-small" type="button" onClick={() => startSession()}>
              New session
            </button>
            <button
              className="button button-quiet button-small sign-out-button"
              type="button"
              onClick={() => setShowLogout(true)}
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="content-width instructor-main">
        <div className="instructor-page-heading">
          <div>
            <p className="instructor-kicker">{eyebrow} <span>·</span> Fall 2026</p>
            <h1>{title}</h1>
          </div>
          {liveSession && (
            <button
              type="button"
              className="live-link"
              onClick={() => setProjectingSession(liveSession)}
            >
              <span className="live-dot" /> Resume {liveSession.courseCode} attendance
            </button>
          )}
        </div>

        {activeSection === 'courses' && (
          <InstructorCourses
            courses={courses}
            onAddCourse={() => setShowNewCourse(true)}
            onStartSession={startSession}
            onViewStudents={navigateToStudents}
          />
        )}
        {activeSection === 'sessions' && (
          <InstructorSessions
            sessions={sessions}
            courses={courses}
            onStartSession={startSession}
            onOpenSession={setProjectingSession}
          />
        )}
        {activeSection === 'students' && (
          <InstructorStudents
            students={INITIAL_STUDENTS}
            courses={courses}
            initialCourseFilter={studentCourseFilter}
            onSelectStudent={setSelectedStudent}
          />
        )}
        {activeSection === 'records' && (
          <InstructorRecords
            records={records}
            courses={courses}
            onUpdateRecordStatus={updateRecord}
          />
        )}
      </main>

      {showNewSession && (
        <NewSessionModal
          courses={courses}
          initialCourseCode={newSessionCourse}
          onClose={() => setShowNewSession(false)}
          onSessionCreated={addSession}
        />
      )}
      {showNewCourse && (
        <NewCourseModal
          onClose={() => setShowNewCourse(false)}
          onCourseCreated={(course) => setCourses((current) => [...current, course])}
        />
      )}
      {projectingSession && (
        <LiveQRModal
          session={projectingSession}
          onClose={() => setProjectingSession(null)}
          onSessionUpdated={updateSession}
        />
      )}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      {showLogout && (
        <LogOutConfirmModal
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            setShowLogout(false);
            onLogout?.();
          }}
        />
      )}
    </div>
  );
}
