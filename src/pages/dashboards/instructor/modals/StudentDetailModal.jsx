import React from 'react';

export default function StudentDetailModal({ student, onClose, onUpdateStatus }) {
  if (!student) return null;

  return (
    <div className="unitrack-modal-overlay" onClick={onClose}>
      <div
        className="student-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="student-modal-header">
          <div className="brand-pill-small">
            <svg viewBox="0 0 28 28" width="16" height="16" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="7" stroke="#F6ECE1" strokeWidth="2.2" />
              <path d="M7 10L14 6L21 10V15C21 19.5 17.5 22.5 14 23.5C10.5 22.5 7 19.5 7 15V10Z" fill="#F6ECE1" fillOpacity="0.2" stroke="#F6ECE1" strokeWidth="1.8" />
            </svg>
            <span>CAIRO UNIVERSITY &bull; FACULTY OF SCIENCE</span>
          </div>

          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Cairo University Student Digital ID Card */}
        <div className="cairo-digital-id-card">
          <div className="digital-id-header">
            <div className="cu-crest-group">
              <div className="cu-shield-badge">CU</div>
              <div className="cu-text">
                <span className="cu-univ-name">CAIRO UNIVERSITY</span>
                <span className="cu-faculty-name">FACULTY OF SCIENCE</span>
                <span className="cu-sub">DIGITAL IDENTITY &bull; CS 309</span>
              </div>
            </div>
            <div className="id-chip-icon">
              <div className="chip-gold-lines"></div>
            </div>
          </div>

          <div className="digital-id-body">
            <div className="student-photo-box">
              <div className="photo-placeholder">
                <span className="initials-huge">{student.avatarInitials || 'ST'}</span>
              </div>
              <span className="verified-stamp">VERIFIED ID</span>
            </div>

            <div className="student-info-credentials">
              <h3 className="student-card-name">{student.name}</h3>
              <div className="info-meta-row">
                <span className="meta-label">ACADEMIC ID:</span>
                <span className="meta-value font-mono">{student.academicId}</span>
              </div>
              <div className="info-meta-row">
                <span className="meta-label">DEPARTMENT:</span>
                <span className="meta-value">{student.department || 'Computer Science'}</span>
              </div>
              <div className="info-meta-row">
                <span className="meta-label">ACADEMIC LEVEL:</span>
                <span className="meta-value">{student.level || 'Level 3 • Year 3'}</span>
              </div>
              <div className="info-meta-row">
                <span className="meta-label">OFFICIAL EMAIL:</span>
                <span className="meta-value text-break">{student.email}</span>
              </div>
              <div className="info-meta-row">
                <span className="meta-label">NATIONAL ID:</span>
                <span className="meta-value font-mono">{student.nationalId || '30309150102433'}</span>
              </div>
            </div>
          </div>

          {/* Barcode Strip */}
          <div className="digital-id-footer-barcode">
            <div className="barcode-graphic">
              {/* Simulated barcode stripes */}
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 1, 2, 4, 2].map((w, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: `${w * 2.2}px`,
                    height: '24px',
                    backgroundColor: '#1F191B',
                    marginRight: '2px',
                  }}
                />
              ))}
            </div>
            <span className="barcode-digits font-mono">* {student.academicId} - CS309 *</span>
          </div>
        </div>

        {/* Academic Attendance Statistics */}
        <div className="student-attendance-summary-pane">
          <h4 className="section-title-small">Attendance Record with You</h4>
          <div className="stats-metric-strip">
            <div className="metric-cell">
              <span className="metric-num text-wine">{student.overallAttendance}%</span>
              <span className="metric-lbl">Attendance Rate</span>
            </div>
            <div className="metric-cell">
              <span className="metric-num text-success">{student.attendedSessions}</span>
              <span className="metric-lbl">Attended</span>
            </div>
            <div className="metric-cell">
              <span className="metric-num text-warning">{student.excusedSessions}</span>
              <span className="metric-lbl">Excused</span>
            </div>
            <div className="metric-cell">
              <span className="metric-num text-danger">{student.absentSessions}</span>
              <span className="metric-lbl">Absent</span>
            </div>
          </div>

          <div className="enrolled-courses-tags">
            <span className="tag-label">Enrolled in your subjects:</span>
            {student.coursesEnrolled?.map((c) => (
              <span key={c} className="course-code-pill">{c}</span>
            ))}
          </div>

          {/* Quick Notice to student */}
          <div className="student-modal-actions">
            <button
              type="button"
              className="btn-secondary-cream"
              onClick={() => {
                alert(`Official absence notice draft created for ${student.name} (${student.email}) and copied to student advisor.`);
              }}
            >
              Send Attendance Notice
            </button>
            <button
              type="button"
              className="btn-primary-wine"
              onClick={onClose}
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
