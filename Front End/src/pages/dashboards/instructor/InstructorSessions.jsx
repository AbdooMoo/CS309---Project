import React, { useState } from 'react';

export default function InstructorSessions({ sessions, courses, onStartSession, onOpenSession }) {
  const [courseFilter, setCourseFilter] = useState('All');
  const visibleSessions = sessions.filter((session) => (
    courseFilter === 'All' || session.courseCode === courseFilter
  ));

  return (
    <section className="view-section">
      <div className="view-toolbar">
        <p>Current and recent attendance sessions</p>
        <div className="toolbar-actions">
          <select
            className="search-input"
            aria-label="Filter sessions by course"
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
          >
            <option value="All">All courses</option>
            {courses.map((course) => <option key={course.id} value={course.code}>{course.code}</option>)}
          </select>
          <button className="button button-primary" type="button" onClick={() => onStartSession()}>
            Start attendance
          </button>
        </div>
      </div>

      <div className="session-list">
        {visibleSessions.map((session) => (
          <article className="session-row" key={session.id}>
            <div className="session-date">
              <span>{session.date}</span>
              <small>{session.time}</small>
            </div>
            <div className="session-details">
              <div className="session-title-line">
                <h2>{session.courseCode} <span>·</span> {session.sessionType}</h2>
                <span className={`session-status status-${session.status.toLowerCase()}`}>
                  {session.status}
                </span>
              </div>
              <p>{session.topic}</p>
              <small>{session.hall}</small>
            </div>
            <div className="session-count">
              <strong>{session.presentCount}<span> / {session.enrolledTotal}</span></strong>
              <small>checked in</small>
            </div>
            <div className="row-actions">
              {session.status === 'Live' ? (
                <button className="button button-secondary" type="button" onClick={() => onOpenSession(session)}>
                  Open attendance
                </button>
              ) : (
                <button className="text-button" type="button" onClick={() => onStartSession(session.courseCode)}>
                  Start session
                </button>
              )}
            </div>
          </article>
        ))}
        {visibleSessions.length === 0 && <p className="empty-state">No sessions for this course.</p>}
      </div>
    </section>
  );
}
