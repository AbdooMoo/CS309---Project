import React, { useState } from 'react';

export default function InstructorStudents({
  students,
  courses,
  onSelectStudent,
}) {
  const [courseFilter, setCourseFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((st) => {
    const matchesCourse =
      courseFilter === 'All' || st.coursesEnrolled.includes(courseFilter);
    const matchesRisk = riskFilter === 'All' || st.riskLevel === riskFilter;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.academicId.includes(searchQuery) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesRisk && matchesSearch;
  });

  const goodCount = students.filter((s) => s.riskLevel === 'good').length;
  const warningCount = students.filter((s) => s.riskLevel === 'warning').length;
  const criticalCount = students.filter((s) => s.riskLevel === 'critical').length;

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">STUDENT ROSTER</span>
          <h2 className="subview-title-serif">Students Directory</h2>
          <p className="subview-description">
            Monitor student attendance health, inspect official Cairo University Digital IDs, and identify at-risk students.
          </p>
        </div>

        {/* Quick Health Stats Strip */}
        <div className="students-summary-badges">
          <div className="badge-stat-pill">
            <span className="count-num font-mono">{students.length}</span>
            <span className="count-label">Total Enrolled</span>
          </div>
          <div className="badge-stat-pill good">
            <span className="count-num font-mono">{goodCount}</span>
            <span className="count-label">&ge;85% Good</span>
          </div>
          <div className="badge-stat-pill warning">
            <span className="count-num font-mono">{warningCount}</span>
            <span className="count-label">75-84% Warning</span>
          </div>
          <div className="badge-stat-pill critical">
            <span className="count-num font-mono">{criticalCount}</span>
            <span className="count-label">&lt;75% Critical</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="subview-toolbar-row">
        <div className="filter-pill-group">
          <label className="toolbar-label">Course:</label>
          <select
            className="toolbar-select"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code} &mdash; {c.name}
              </option>
            ))}
          </select>

          <label className="toolbar-label" style={{ marginLeft: '1rem' }}>Standing:</label>
          <select
            className="toolbar-select"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All Standing Levels</option>
            <option value="good">Good (&ge;85%)</option>
            <option value="warning">Warning (75% &ndash; 84%)</option>
            <option value="critical">Critical / At Risk (&lt;75%)</option>
          </select>
        </div>

        <div className="search-control-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-text-input"
            placeholder="Search by name, academic ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="unitrack-table-container">
        <table className="unitrack-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>ACADEMIC ID</th>
              <th>LEVEL &amp; DEPT</th>
              <th>COURSES ENROLLED</th>
              <th>ATTENDANCE %</th>
              <th>SESSIONS (ATT / EXC / ABS)</th>
              <th>DIGITAL ID STATUS</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((st) => (
              <tr key={st.id} className={st.riskLevel === 'critical' ? 'row-highlight-critical' : ''}>
                <td>
                  <div className="student-profile-cell">
                    <div className="student-avatar-circle">
                      {st.avatarInitials}
                    </div>
                    <div className="student-name-group">
                      <span className="student-fullname">{st.name}</span>
                      <span className="student-email-sub">{st.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-mono academic-id-highlight">{st.academicId}</span>
                </td>
                <td>
                  <div className="table-dept-cell">
                    <span className="level-badge">{st.level.split('•')[0]}</span>
                    <span className="dept-sub">{st.department}</span>
                  </div>
                </td>
                <td>
                  <div className="table-course-pill-list">
                    {st.coursesEnrolled.map((c) => (
                      <span key={c} className="course-code-pill-mini">{c}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="table-rate-cell">
                    <span
                      className={`font-semibold ${
                        st.riskLevel === 'critical'
                          ? 'text-danger'
                          : st.riskLevel === 'warning'
                          ? 'text-warning'
                          : 'text-wine'
                      }`}
                    >
                      {st.overallAttendance}%
                    </span>
                    <div className="table-mini-progress">
                      <div
                        className={`table-mini-fill ${
                          st.riskLevel === 'critical'
                            ? 'fill-danger'
                            : st.riskLevel === 'warning'
                            ? 'fill-warning'
                            : 'fill-wine'
                        }`}
                        style={{ width: `${st.overallAttendance}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-breakdown-counts">
                    <span className="text-success font-semibold">{st.attendedSessions}</span>
                    <span className="text-muted">/</span>
                    <span className="text-warning font-semibold">{st.excusedSessions}</span>
                    <span className="text-muted">/</span>
                    <span className="text-danger font-semibold">{st.absentSessions}</span>
                  </div>
                </td>
                <td>
                  <span className={`digital-id-badge ${st.riskLevel === 'critical' ? 'warning' : 'verified'}`}>
                    <span className="shield-icon">🛡️</span>
                    {st.digitalIdStatus}
                  </span>
                </td>
                <td className="text-right">
                  <button
                    type="button"
                    className="table-btn-primary"
                    onClick={() => onSelectStudent(st)}
                  >
                    View Digital ID
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
