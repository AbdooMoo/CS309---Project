import React, { useState } from 'react';
import { ATTENDANCE_WEEKLY_TRENDS, AT_RISK_STUDENTS } from './instructorData';

export default function InstructorReports({ courses }) {
  // Multi-course Report Cart state
  const [selectedCourseIds, setSelectedCourseIds] = useState(['cs-309', 'cs-301']);
  const [reportFormat, setReportFormat] = useState('pdf');
  const [reportSemester, setReportSemester] = useState('Fall 2026 (Full Semester)');
  const [showReportPreview, setShowReportPreview] = useState(false);

  const toggleCourseInCart = (courseId) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCourseIds.length === courses.length) {
      setSelectedCourseIds([]);
    } else {
      setSelectedCourseIds(courses.map((c) => c.id));
    }
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (selectedCourseIds.length === 0) {
      alert('Please select at least one course into your Report Cart.');
      return;
    }
    setShowReportPreview(true);
  };

  const selectedCoursesList = courses.filter((c) => selectedCourseIds.includes(c.id));

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">ANALYTICS &amp; COMPLIANCE</span>
          <h2 className="subview-title-serif">Attendance Reports &amp; Report Cart</h2>
          <p className="subview-description">
            Batch-export multi-course attendance certificates, track semester weekly trends, and manage university attendance compliance.
          </p>
        </div>
      </div>

      {/* 1. Feature Highlight: The Report Cart */}
      <div className="report-cart-featured-box">
        <div className="cart-header-row">
          <div className="cart-title-group">
            <span className="cart-badge-icon">🛒</span>
            <div>
              <h3 className="cart-title">Multi-Course Report Cart</h3>
              <p className="cart-subtitle">
                Select one or more courses to compile a unified, official attendance packet for the Faculty Board.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-select-all-toggle"
            onClick={handleSelectAll}
          >
            {selectedCourseIds.length === courses.length ? 'Deselect All' : 'Select All Courses'}
          </button>
        </div>

        {/* Course Checkbox Selectors */}
        <div className="cart-courses-checklist">
          {courses.map((course) => {
            const isChecked = selectedCourseIds.includes(course.id);
            return (
              <label
                key={course.id}
                className={`cart-course-card-option ${isChecked ? 'is-selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCourseInCart(course.id)}
                  className="cart-checkbox"
                />
                <div className="option-content">
                  <div className="option-code-row">
                    <span className="option-code font-bold">{course.code}</span>
                    <span className="option-rate font-serif">{course.attendanceRate}% Att.</span>
                  </div>
                  <span className="option-name">{course.name}</span>
                  <span className="option-students text-muted text-small">
                    {course.enrolledCount} Students Enrolled &bull; {course.section}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Report Configuration and Action */}
        <div className="cart-options-bar">
          <div className="cart-options-left">
            <div className="cart-param-group">
              <label className="param-label">REPORT PERIOD:</label>
              <select
                className="param-select"
                value={reportSemester}
                onChange={(e) => setReportSemester(e.target.value)}
              >
                <option value="Fall 2026 (Full Semester)">Fall 2026 (Weeks 1 &ndash; 11 to date)</option>
                <option value="Last 4 Weeks (Recent Compliance)">Last 4 Weeks (Recent Compliance)</option>
                <option value="Midterm Snapshot (Weeks 1-7)">Midterm Snapshot (Weeks 1 &ndash; 7)</option>
              </select>
            </div>

            <div className="cart-param-group">
              <label className="param-label">EXPORT FORMAT:</label>
              <div className="format-toggle-pills">
                <button
                  type="button"
                  className={`format-pill ${reportFormat === 'pdf' ? 'active' : ''}`}
                  onClick={() => setReportFormat('pdf')}
                >
                  📄 Official PDF (Sealed)
                </button>
                <button
                  type="button"
                  className={`format-pill ${reportFormat === 'csv' ? 'active' : ''}`}
                  onClick={() => setReportFormat('csv')}
                >
                  📊 Excel / CSV Sheet
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary-wine btn-generate-cart"
            onClick={handleGenerateReport}
          >
            <span>Compile &amp; Generate Report ({selectedCourseIds.length}) &rarr;</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Weekly Attendance Trend Chart */}
      <div className="overview-column-card" style={{ marginTop: '2rem' }}>
        <div className="column-card-header">
          <div className="header-title-group">
            <span className="header-sublabel">HISTORICAL PROGRESSION</span>
            <h3 className="card-title-serif">Weekly Attendance Progression (Fall 2026)</h3>
          </div>
          <span className="average-indicator-pill">Average: 91.4%</span>
        </div>

        <div className="weekly-bar-chart-container">
          <div className="chart-baseline-marker" style={{ bottom: '75%' }}>
            <span className="baseline-label">75% Faculty Science Disqualification Threshold</span>
          </div>

          <div className="bars-flex-wrapper">
            {ATTENDANCE_WEEKLY_TRENDS.map((item) => (
              <div key={item.week} className="bar-column">
                <span className="bar-percentage-label">{item.rate}%</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: `${item.rate}%` }}
                  />
                </div>
                <span className="bar-week-name font-mono">{item.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. At-Risk Warning List (Below 75% threshold) */}
      <div className="overview-column-card" style={{ marginTop: '2rem' }}>
        <div className="column-card-header">
          <div className="header-title-group">
            <span className="header-sublabel text-danger">MANDATORY COMPLIANCE</span>
            <h3 className="card-title-serif">Students At Risk of Exam Disqualification (&lt;75%)</h3>
          </div>
          <span className="warning-count-chip">{AT_RISK_STUDENTS.length} Flagged</span>
        </div>

        <p className="section-hint-text">
          According to Cairo University Faculty of Science Academic Bylaws, any student whose attendance drops below 75% without certified medical board approval may be denied entry to the final examination.
        </p>

        <div className="unitrack-table-container">
          <table className="unitrack-table">
            <thead>
              <tr>
                <th>STUDENT NAME</th>
                <th>ACADEMIC ID</th>
                <th>COURSE</th>
                <th>ATTENDANCE %</th>
                <th>MISSED SESSIONS</th>
                <th>COMPLIANCE STATUS</th>
                <th className="text-right">ADVISOR ACTION</th>
              </tr>
            </thead>
            <tbody>
              {AT_RISK_STUDENTS.map((st) => (
                <tr key={st.id} className="row-highlight-critical">
                  <td className="font-semibold">{st.name}</td>
                  <td>
                    <span className="font-mono academic-id-highlight">{st.academicId}</span>
                  </td>
                  <td>
                    <span className="table-course-pill">{st.courseCode}</span>
                  </td>
                  <td>
                    <span className="font-bold text-danger">{st.attendanceRate}%</span>
                  </td>
                  <td>
                    <span className="font-semibold text-danger">{st.missedCount} unexcused</span>
                  </td>
                  <td>
                    <span className="table-status-badge status-critical">
                      ⚠️ {st.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="table-btn-primary"
                      onClick={() => {
                        alert(`Formal academic warning dispatched to ${st.name} and Advisor (${st.advisorEmail}).`);
                      }}
                    >
                      Send Warning Notice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportPreview && (
        <div className="unitrack-modal-overlay" onClick={() => setShowReportPreview(false)}>
          <div className="report-preview-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="report-doc-toolbar">
              <span>Official Academic Document Preview</span>
              <div className="doc-toolbar-actions">
                <button
                  type="button"
                  className="btn-print-action"
                  onClick={() => window.print()}
                >
                  🖨️ Print / Save as PDF
                </button>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setShowReportPreview(false)}
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Official Cairo University Science Document Layout */}
            <div className="official-report-sheet">
              <div className="report-sheet-header">
                <div className="sheet-crest">
                  <div className="cu-stamp-circle">
                    <span>CAIRO UNIV</span>
                    <strong>1925</strong>
                    <span>SCIENCE</span>
                  </div>
                </div>

                <div className="sheet-header-titles">
                  <h2>CAIRO UNIVERSITY &bull; FACULTY OF SCIENCE</h2>
                  <h3>DEPARTMENT OF MATHEMATICS &amp; COMPUTER SCIENCE</h3>
                  <p>OFFICIAL ATTENDANCE COMPLIANCE &amp; VERIFICATION RECORD</p>
                  <span className="report-academic-term">{reportSemester}</span>
                </div>

                <div className="sheet-meta-block">
                  <div><strong>Date:</strong> 2026-11-23</div>
                  <div><strong>Staff ID:</strong> FAC-SCI-0489</div>
                  <div><strong>Instructor:</strong> Prof. Dr. Moustafa Hamed</div>
                </div>
              </div>

              <div className="report-sheet-divider" />

              <div className="report-sheet-summary-grid">
                {selectedCoursesList.map((c) => (
                  <div key={c.id} className="sheet-course-box">
                    <div className="sheet-c-code">{c.code}: {c.name}</div>
                    <div className="sheet-c-meta">
                      <span>{c.section}</span> &bull; <span>{c.enrolledCount} Students</span> &bull; <span>Attendance: <strong>{c.attendanceRate}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sheet-declaration-box">
                <p>
                  This document certifies that student check-in records have been verified using UniTrack's dynamic geofenced digital ID system at Cairo University Faculty of Science. All entries conform to the attendance regulations mandated by the Faculty Academic Affairs Council.
                </p>
              </div>

              <div className="sheet-signatures-row">
                <div className="signature-col">
                  <span className="sig-title">Course Instructor</span>
                  <div className="sig-line">Prof. Dr. Moustafa Hamed</div>
                  <span className="sig-sub">Department of Computer Science</span>
                </div>

                <div className="signature-col center-seal">
                  <div className="official-faculty-seal">
                    <span>FACULTY OF SCIENCE</span>
                    <span>OFFICIAL SEAL</span>
                    <span>CAIRO UNIVERSITY</span>
                  </div>
                </div>

                <div className="signature-col">
                  <span className="sig-title">Vice Dean for Education &amp; Student Affairs</span>
                  <div className="sig-line">Prof. Dr. Academic Dean</div>
                  <span className="sig-sub">Faculty of Science, Cairo University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
