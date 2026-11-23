import React from 'react';

export default function InstructorOverview({
  summaryStats,
  liveSession,
  courses,
  recentCheckIns,
  onOpenLiveQR,
  onNavigateTab,
}) {
  return (
    <div className="instructor-overview-view">
      {/* 1. Welcome Hero Banner */}
      <section className="overview-hero-banner">
        <div className="hero-banner-content">
          <div className="faculty-heritage-badge">
            <span className="badge-crest-dot" />
            FACULTY OF SCIENCE &bull; CAIRO UNIVERSITY &bull; 100 YEARS
          </div>
          <h1 className="hero-greeting-title">
            Welcome Back, Professor!
          </h1>
          <p className="hero-greeting-subtitle">
            Department of Mathematics &amp; Computer Science &bull; Fall Semester 2026
          </p>

          <div className="hero-quick-meta-strip">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>Monday, Nov 23, 2026</span>
            </div>
            <span className="meta-divider">&bull;</span>
            <div className="meta-item">
              <span className="meta-icon">🏛️</span>
              <span>Central Campus &bull; Building 3</span>
            </div>
            <span className="meta-divider">&bull;</span>
            <div className="meta-item">
              <span className="live-status-pill">
                <span className="live-indicator-dot" />
                1 Live Session Active
              </span>
            </div>
          </div>
        </div>

        <div className="hero-banner-actions">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={onOpenLiveQR}
          >
            <span className="btn-icon">⚡</span>
            <span>Launch Live QR Session</span>
          </button>
          <button
            type="button"
            className="btn-hero-secondary"
            onClick={() => onNavigateTab('reports')}
          >
            <span className="btn-icon">📊</span>
            <span>Batch Report Cart</span>
          </button>
        </div>
      </section>

      {/* 2. Four Summary Cards (Required) */}
      <section className="summary-cards-grid">
        {/* Card 1: Total Courses */}
        <div
          className="metric-summary-card"
          onClick={() => onNavigateTab('courses')}
          role="button"
          tabIndex={0}
        >
          <div className="card-top-row">
            <span className="summary-card-label">TOTAL COURSES</span>
            <div className="summary-icon-box wine">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
          </div>
          <div className="card-main-val">
            <span className="stat-number">{summaryStats.totalCourses}</span>
            <span className="stat-unit">Subjects</span>
          </div>
          <div className="card-footer-delta positive">
            <span className="delta-badge">{summaryStats.statsDelta?.courses || '+1 active course'}</span>
            <span className="delta-text">Level 2 &amp; Level 3</span>
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div
          className="metric-summary-card"
          onClick={() => onNavigateTab('students')}
          role="button"
          tabIndex={0}
        >
          <div className="card-top-row">
            <span className="summary-card-label">TOTAL STUDENTS</span>
            <div className="summary-icon-box gold">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="card-main-val">
            <span className="stat-number">{summaryStats.totalStudents}</span>
            <span className="stat-unit">Enrolled</span>
          </div>
          <div className="card-footer-delta positive">
            <span className="delta-badge">98.5% Digital IDs</span>
            <span className="delta-text">Across 4 lecture sections</span>
          </div>
        </div>

        {/* Card 3: Active Sessions */}
        <div
          className="metric-summary-card active-card-accent"
          onClick={() => onNavigateTab('sessions')}
          role="button"
          tabIndex={0}
        >
          <div className="card-top-row">
            <span className="summary-card-label">ACTIVE SESSIONS</span>
            <div className="summary-icon-box live-pulse-box">
              <span className="pulse-beacon" />
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>
          <div className="card-main-val">
            <span className="stat-number">{summaryStats.activeSessions}</span>
            <span className="stat-unit">Live Now</span>
          </div>
          <div className="card-footer-delta positive">
            <span className="delta-badge live-tag">CS 309 &bull; Hall 2</span>
            <span className="delta-text">15s anti-fraud refresh</span>
          </div>
        </div>

        {/* Card 4: Average Attendance Rate */}
        <div
          className="metric-summary-card"
          onClick={() => onNavigateTab('reports')}
          role="button"
          tabIndex={0}
        >
          <div className="card-top-row">
            <span className="summary-card-label">AVERAGE ATTENDANCE RATE</span>
            <div className="summary-icon-box green">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="card-main-val">
            <span className="stat-number">{summaryStats.averageAttendanceRate}%</span>
            <span className="stat-unit">Overall</span>
          </div>
          <div className="card-footer-delta positive">
            <span className="delta-badge">{summaryStats.statsDelta?.attendance || '+3.2%'}</span>
            <span className="delta-text">Cairo Univ benchmark: 75%</span>
          </div>
        </div>
      </section>

      {/* 3. Live Active Session Monitor Banner */}
      {liveSession && (
        <section className="live-session-broadcast-panel">
          <div className="broadcast-left-details">
            <div className="broadcast-status-row">
              <span className="broadcast-live-pill">
                <span className="pulsing-radar-dot" />
                LIVE IN PROGRESS
              </span>
              <span className="broadcast-hall-tag">🏛️ {liveSession.hall}</span>
              <span className="broadcast-geofence-tag">📍 Campus Geofenced (35m)</span>
            </div>

            <h3 className="broadcast-course-name">
              {liveSession.courseCode} &mdash; {liveSession.courseName}
            </h3>
            <p className="broadcast-topic-text">
              <strong>{liveSession.sessionType}:</strong> {liveSession.topic}
            </p>

            <div className="broadcast-progress-group">
              <div className="progress-text-row">
                <span>
                  Attendance Progress: <strong>{liveSession.presentCount}</strong> of <strong>{liveSession.enrolledTotal}</strong> checked in
                </span>
                <span className="progress-percentage-val">
                  {Math.round((liveSession.presentCount / liveSession.enrolledTotal) * 100)}%
                </span>
              </div>
              <div className="broadcast-progress-track">
                <div
                  className="broadcast-progress-fill"
                  style={{
                    width: `${Math.round((liveSession.presentCount / liveSession.enrolledTotal) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="broadcast-right-qr-preview">
            <div className="mini-qr-card-preview" onClick={onOpenLiveQR}>
              <div className="mini-qr-header">
                <span className="mini-tag">PROJECTOR MODE</span>
                <span className="mini-timer">15s cycle</span>
              </div>
              {/* Mini QR representation */}
              <div className="mini-qr-svg-wrapper">
                <svg viewBox="0 0 64 64" width="76" height="76" fill="#3F101A">
                  <rect x="4" y="4" width="18" height="18" rx="2" fill="none" stroke="#581825" strokeWidth="3" />
                  <rect x="9" y="9" width="8" height="8" rx="1" fill="#581825" />
                  <rect x="42" y="4" width="18" height="18" rx="2" fill="none" stroke="#581825" strokeWidth="3" />
                  <rect x="47" y="9" width="8" height="8" rx="1" fill="#581825" />
                  <rect x="4" y="42" width="18" height="18" rx="2" fill="none" stroke="#581825" strokeWidth="3" />
                  <rect x="9" y="47" width="8" height="8" rx="1" fill="#581825" />
                  <rect x="28" y="8" width="6" height="6" rx="1" fill="#C29D62" />
                  <rect x="24" y="24" width="16" height="16" rx="3" fill="#581825" />
                  <circle cx="32" cy="32" r="3.5" fill="#FAF6F0" />
                  <rect x="42" y="44" width="18" height="16" rx="2" fill="#581825" />
                </svg>
              </div>
              <span className="click-to-fullscreen-prompt">Click to Project Fullscreen</span>
            </div>

            <button
              type="button"
              className="btn-open-projector"
              onClick={onOpenLiveQR}
            >
              Open Projector Display &rarr;
            </button>
          </div>
        </section>
      )}

      {/* 4. Split Grid: Today's Schedule & Real-Time Check-In Stream */}
      <div className="overview-split-layout">
        {/* Left Column: Today's Lecture Timetable */}
        <div className="overview-column-card">
          <div className="column-card-header">
            <div className="header-title-group">
              <span className="header-sublabel">TIMETABLE</span>
              <h3 className="card-title-serif">Today's Academic Schedule</h3>
            </div>
            <button
              type="button"
              className="text-link-gold"
              onClick={() => onNavigateTab('courses')}
            >
              All Courses &rarr;
            </button>
          </div>

          <div className="schedule-items-list">
            {courses.map((c) => (
              <div key={c.id} className={`schedule-item-row ${c.hasLiveSession ? 'is-live-now' : ''}`}>
                <div className="schedule-time-badge">
                  <span className="time-primary">{c.schedule.split(' ')[2] || '09:00'}</span>
                  <span className="time-ampm">{c.schedule.split(' ')[3] || 'AM'}</span>
                </div>

                <div className="schedule-details">
                  <div className="course-code-row">
                    <span className="code-pill">{c.code}</span>
                    <span className="hall-pill">🏛️ {c.hall.split('(')[0]}</span>
                    {c.hasLiveSession && <span className="live-status-chip">LIVE NOW</span>}
                  </div>
                  <h4 className="schedule-course-name">{c.name}</h4>
                  <p className="schedule-meta-text">
                    {c.section} &bull; {c.enrolledCount} Students Enrolled &bull; {c.level}
                  </p>
                </div>

                <div className="schedule-action-btn">
                  {c.hasLiveSession ? (
                    <button
                      type="button"
                      className="btn-pill-wine"
                      onClick={onOpenLiveQR}
                    >
                      View Live QR
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-pill-outline"
                      onClick={() => onNavigateTab('sessions')}
                    >
                      Start Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Check-in Activity Feed */}
        <div className="overview-column-card">
          <div className="column-card-header">
            <div className="header-title-group">
              <span className="header-sublabel">REAL-TIME ACTIVITY</span>
              <h3 className="card-title-serif">Recent Check-In Stream</h3>
            </div>
            <button
              type="button"
              className="text-link-gold"
              onClick={() => onNavigateTab('records')}
            >
              Full Ledger &rarr;
            </button>
          </div>

          <div className="live-stream-list">
            {recentCheckIns.map((item) => (
              <div key={item.id} className="stream-checkin-item">
                <div className="stream-avatar-initials">
                  {item.studentName.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                </div>

                <div className="stream-info">
                  <div className="stream-student-row">
                    <span className="student-name-bold">{item.studentName}</span>
                    <span className="academic-id-tag font-mono">{item.academicId}</span>
                  </div>
                  <div className="stream-subtext">
                    <span className="course-tag-small">{item.course}</span>
                    <span>&bull;</span>
                    <span className="method-text">{item.method} (Geofenced)</span>
                  </div>
                </div>

                <div className="stream-timestamp-col">
                  <span className="verified-check-mark">✓ Verified</span>
                  <span className="time-ago-text">{item.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Academic Benchmark Footer */}
          <div className="stream-footer-benchmark">
            <div className="benchmark-icon">💡</div>
            <p className="benchmark-text">
              Cairo University Faculty of Science requires a <strong>75% minimum attendance</strong>. UniTrack automatically flags at-risk students for academic council review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
