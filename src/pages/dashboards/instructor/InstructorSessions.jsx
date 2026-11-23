import React, { useState } from 'react';

export default function InstructorSessions({
  sessions,
  courses,
  onOpenNewSessionModal,
  onOpenLiveQR,
  onNavigateTab,
}) {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  const filteredSessions = sessions.filter((s) => {
    const matchesCourse =
      selectedCourseFilter === 'All' || s.courseCode === selectedCourseFilter;
    const matchesStatus =
      selectedStatusFilter === 'All' || s.status === selectedStatusFilter;
    return matchesCourse && matchesStatus;
  });

  const activeSession = sessions.find((s) => s.status === 'Live');

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">ATTENDANCE LOGISTICS</span>
          <h2 className="subview-title-serif">Attendance Sessions</h2>
          <p className="subview-description">
            Broadcast dynamic QR codes for live lectures, enforce geofencing, and review past session attendance logs.
          </p>
        </div>

        <div className="subview-header-actions">
          <button
            type="button"
            className="btn-primary-wine"
            onClick={onOpenNewSessionModal}
          >
            <span className="btn-icon">⚡</span>
            <span>Start Attendance Session</span>
          </button>
        </div>
      </div>

      {/* Featured Live Session Banner */}
      {activeSession ? (
        <div className="active-session-featured-card">
          <div className="featured-card-left">
            <div className="featured-badge-row">
              <span className="live-badge-glow">
                <span className="pulse-dot" />
                SESSION IN PROGRESS
              </span>
              <span className="featured-hall-tag">🏛️ {activeSession.hall}</span>
              <span className="featured-geo-tag">📍 Faculty Campus Geofenced</span>
            </div>

            <h3 className="featured-session-title">
              {activeSession.courseCode}: {activeSession.courseName}
            </h3>
            <p className="featured-topic-desc">
              <strong>{activeSession.sessionType}:</strong> {activeSession.topic}
            </p>

            <div className="featured-stats-strip">
              <div className="f-stat">
                <span className="f-val">{activeSession.presentCount}</span>
                <span className="f-lbl">Present</span>
              </div>
              <span className="f-divider">/</span>
              <div className="f-stat">
                <span className="f-val">{activeSession.enrolledTotal}</span>
                <span className="f-lbl">Total Enrolled</span>
              </div>
              <span className="f-divider">&bull;</span>
              <div className="f-stat">
                <span className="f-val font-serif text-wine">{activeSession.attendanceRate}%</span>
                <span className="f-lbl">Rate</span>
              </div>
            </div>
          </div>

          <div className="featured-card-right">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onOpenLiveQR}
            >
              Open Fullscreen Projector &rarr;
            </button>
            <span className="f-note">Dynamic QR changes every 15 seconds</span>
          </div>
        </div>
      ) : (
        <div className="no-active-session-banner">
          <div className="no-active-text">
            <h4>No Active Session at This Moment</h4>
            <p>Ready to take attendance? Click &ldquo;Start Attendance Session&rdquo; to project a dynamic QR code.</p>
          </div>
          <button
            type="button"
            className="btn-primary-wine"
            onClick={onOpenNewSessionModal}
          >
            Launch Session Now
          </button>
        </div>
      )}

      {/* Sessions Filter Toolbar */}
      <div className="subview-toolbar-row">
        <div className="filter-pill-group">
          <label className="toolbar-label">Course:</label>
          <select
            className="toolbar-select"
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
          >
            <option value="All">All Courses ({courses.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code} &mdash; {c.name}
              </option>
            ))}
          </select>

          <label className="toolbar-label" style={{ marginLeft: '1rem' }}>Status:</label>
          <select
            className="toolbar-select"
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        <button
          type="button"
          className="btn-secondary-cream"
          onClick={() => {
            alert('Exporting session history as CSV...');
          }}
        >
          📥 Download Sessions Log (.CSV)
        </button>
      </div>

      {/* Sessions Table */}
      <div className="unitrack-table-container">
        <table className="unitrack-table">
          <thead>
            <tr>
              <th>SESSION ID</th>
              <th>COURSE</th>
              <th>TYPE &amp; TOPIC</th>
              <th>DATE &amp; TIME</th>
              <th>HALL</th>
              <th>ATTENDEES</th>
              <th>ATTENDANCE %</th>
              <th>STATUS</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session.id} className={session.status === 'Live' ? 'row-highlight-live' : ''}>
                <td className="font-mono text-muted text-small">{session.id}</td>
                <td>
                  <span className="table-course-pill">{session.courseCode}</span>
                </td>
                <td>
                  <div className="table-topic-cell">
                    <strong className="session-type-strong">{session.sessionType}</strong>
                    <span className="session-topic-sub">{session.topic}</span>
                  </div>
                </td>
                <td>
                  <div className="table-time-cell">
                    <span>{session.date}</span>
                    <span className="text-muted text-small">{session.time}</span>
                  </div>
                </td>
                <td>{session.hall}</td>
                <td>
                  <div className="table-attendees-counts">
                    <span className="text-success font-semibold">{session.presentCount}P</span>
                    <span className="text-danger font-semibold">{session.absentCount}A</span>
                    <span className="text-warning font-semibold">{session.excusedCount}E</span>
                    <span className="text-muted text-small">/ {session.enrolledTotal}</span>
                  </div>
                </td>
                <td>
                  <div className="table-rate-cell">
                    <span className="font-semibold">{session.attendanceRate}%</span>
                    <div className="table-mini-progress">
                      <div
                        className="table-mini-fill"
                        style={{ width: `${session.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`table-status-badge status-${session.status.toLowerCase()}`}>
                    {session.status === 'Live' && <span className="pulse-dot-small" />}
                    {session.status}
                  </span>
                </td>
                <td className="text-right">
                  {session.status === 'Live' ? (
                    <button
                      type="button"
                      className="table-btn-primary"
                      onClick={onOpenLiveQR}
                    >
                      Project QR
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="table-btn-outline"
                      onClick={() => onNavigateTab('records')}
                    >
                      View Ledger
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
