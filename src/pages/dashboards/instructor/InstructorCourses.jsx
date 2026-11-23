import React, { useState } from 'react';

export default function InstructorCourses({
  courses,
  onOpenNewCourseModal,
  onOpenLiveQR,
  onNavigateTab,
}) {
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((c) => {
    const matchesDept =
      filterDepartment === 'All' || c.department.includes(filterDepartment);
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hall.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">ACADEMIC CURRICULUM</span>
          <h2 className="subview-title-serif">My Courses</h2>
          <p className="subview-description">
            Manage your academic subjects, student rosters, lecture schedules, and attendance metrics for Fall 2026.
          </p>
        </div>

        <div className="subview-header-actions">
          <button
            type="button"
            className="btn-primary-wine"
            onClick={onOpenNewCourseModal}
          >
            <span className="btn-icon">+</span>
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="subview-toolbar-row">
        <div className="filter-pill-group">
          {['All', 'Computer Science', 'Statistics'].map((dept) => (
            <button
              key={dept}
              type="button"
              className={`filter-tab-pill ${filterDepartment === dept ? 'active' : ''}`}
              onClick={() => setFilterDepartment(dept)}
            >
              {dept} {dept === 'All' ? `(${courses.length})` : ''}
            </button>
          ))}
        </div>

        <div className="search-control-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-text-input"
            placeholder="Search course code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="courses-cards-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="academic-course-card">
            <div className="course-card-top">
              <div className="course-code-badge-large">
                <span>{course.code}</span>
              </div>
              <div className="course-meta-tags">
                <span className="level-tag">{course.level}</span>
                <span className="credit-tag">{course.creditHours} CH</span>
              </div>
            </div>

            <div className="course-card-body">
              <h3 className="course-card-title">{course.name}</h3>
              <p className="course-section-label">{course.section}</p>

              <div className="course-schedule-strip">
                <div className="schedule-line">
                  <span className="sched-icon">🕒</span>
                  <span>{course.schedule}</span>
                </div>
                <div className="schedule-line">
                  <span className="sched-icon">🏛️</span>
                  <span>{course.hall}</span>
                </div>
              </div>

              {/* Attendance Meter */}
              <div className="attendance-gauge-box">
                <div className="gauge-label-row">
                  <span className="gauge-title">ATTENDANCE RATE</span>
                  <span className="gauge-val font-serif">{course.attendanceRate}%</span>
                </div>
                <div className="gauge-track">
                  <div
                    className="gauge-fill"
                    style={{ width: `${course.attendanceRate}%` }}
                  />
                </div>
                <div className="gauge-footer-meta">
                  <span>{course.enrolledCount} enrolled students</span>
                  <span className="status-active-pill">● {course.status}</span>
                </div>
              </div>
            </div>

            <div className="course-card-actions">
              {course.hasLiveSession ? (
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={onOpenLiveQR}
                >
                  <span className="pulse-dot-small" />
                  View Live Session
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={() => onNavigateTab('sessions')}
                >
                  Start Live Session
                </button>
              )}

              <button
                type="button"
                className="btn-action-secondary"
                onClick={() => onNavigateTab('students')}
              >
                View Roster
              </button>

              <button
                type="button"
                className="btn-action-outline-small"
                onClick={() => onNavigateTab('records')}
                title="View attendance records"
              >
                Records
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
