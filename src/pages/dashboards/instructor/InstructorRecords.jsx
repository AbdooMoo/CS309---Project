import React, { useState } from 'react';

export default function InstructorRecords({
  records,
  courses,
  onUpdateRecordStatus,
}) {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExcuseRecord, setEditingExcuseRecord] = useState(null);
  const [excuseNoteInput, setExcuseNoteInput] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchesCourse =
      selectedCourse === 'All' || r.courseCode === selectedCourse;
    const matchesStatus =
      selectedStatus === 'All' || r.status === selectedStatus;
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.academicId.includes(searchQuery) ||
      r.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesStatus && matchesSearch;
  });

  const handleStatusChange = (recordId, newStatus) => {
    onUpdateRecordStatus(recordId, newStatus);
  };

  const handleOpenExcuseModal = (record) => {
    setEditingExcuseRecord(record);
    setExcuseNoteInput(record.notes || '');
  };

  const handleSaveExcuse = (e) => {
    e.preventDefault();
    if (!editingExcuseRecord) return;

    onUpdateRecordStatus(
      editingExcuseRecord.id,
      'Excused',
      excuseNoteInput || 'Official medical/academic excuse validated.'
    );
    setEditingExcuseRecord(null);
  };

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">AUDIT TRAIL &amp; LOGS</span>
          <h2 className="subview-title-serif">Attendance Records</h2>
          <p className="subview-description">
            Individual student check-in entries, geofenced IP verification, and manual attendance overrides.
          </p>
        </div>

        <div className="subview-header-actions">
          <button
            type="button"
            className="btn-secondary-cream"
            onClick={() => alert('Exporting all attendance records to CSV...')}
          >
            📥 Export CSV Ledger
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="subview-toolbar-row">
        <div className="filter-pill-group">
          <label className="toolbar-label">Course:</label>
          <select
            className="toolbar-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>

          <label className="toolbar-label" style={{ marginLeft: '1rem' }}>Status:</label>
          <select
            className="toolbar-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Excused">Excused</option>
            <option value="Absent">Absent</option>
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
            placeholder="Search student name, ID or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Records Table with Inline Status Switcher */}
      <div className="unitrack-table-container">
        <table className="unitrack-table">
          <thead>
            <tr>
              <th>REC ID</th>
              <th>STUDENT</th>
              <th>ACADEMIC ID</th>
              <th>COURSE &amp; SESSION</th>
              <th>DATE &amp; TIME</th>
              <th>STATUS (CLICK TO CHANGE)</th>
              <th>VERIFICATION METHOD</th>
              <th>AUDIT NOTES</th>
              <th className="text-right">EXCUSE</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => (
              <tr key={rec.id}>
                <td className="font-mono text-muted text-small">{rec.id}</td>
                <td>
                  <span className="font-semibold">{rec.studentName}</span>
                </td>
                <td>
                  <span className="font-mono academic-id-highlight">{rec.academicId}</span>
                </td>
                <td>
                  <div className="table-course-session-cell">
                    <span className="table-course-pill">{rec.courseCode}</span>
                    <span className="text-muted text-small">{rec.sessionType}</span>
                  </div>
                </td>
                <td>
                  <div className="table-time-cell">
                    <span>{rec.date}</span>
                    <span className="text-muted text-small font-mono">{rec.time}</span>
                  </div>
                </td>
                <td>
                  {/* Interactive Status Switcher Dropdown */}
                  <select
                    className={`inline-status-select status-${rec.status.toLowerCase()}`}
                    value={rec.status}
                    onChange={(e) => handleStatusChange(rec.id, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Excused">Excused</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td>
                  <div className="verification-cell">
                    <span className="method-label">{rec.verificationMethod}</span>
                    <span className="ip-label font-mono text-small text-muted">{rec.ipAddress}</span>
                  </div>
                </td>
                <td>
                  <span className="notes-text text-small">{rec.notes}</span>
                </td>
                <td className="text-right">
                  <button
                    type="button"
                    className="table-btn-outline"
                    onClick={() => handleOpenExcuseModal(rec)}
                  >
                    Add Excuse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Excuse Modal */}
      {editingExcuseRecord && (
        <div className="unitrack-modal-overlay" onClick={() => setEditingExcuseRecord(null)}>
          <div className="unitrack-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-standard">
              <div>
                <span className="modal-pretag">FACULTY OF SCIENCE &bull; EXCUSE AUDIT</span>
                <h3 className="modal-title-serif">Submit Official Absence Excuse</h3>
              </div>
              <button
                type="button"
                className="modal-close-icon-btn"
                onClick={() => setEditingExcuseRecord(null)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveExcuse} className="modal-form-body">
              <p className="form-hint">
                Documenting excuse for: <strong>{editingExcuseRecord.studentName}</strong> ({editingExcuseRecord.academicId}) &bull; {editingExcuseRecord.courseCode} ({editingExcuseRecord.date})
              </p>

              <div className="modal-field-group">
                <label className="modal-label">EXCUSE REASON &amp; CLINIC REFERENCE</label>
                <textarea
                  className="modal-textarea"
                  rows={4}
                  placeholder="e.g. Official Medical Excuse validated by Cairo University Health Center (Ref: MED-CU-991)..."
                  value={excuseNoteInput}
                  onChange={(e) => setExcuseNoteInput(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-secondary-cream"
                  onClick={() => setEditingExcuseRecord(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-wine">
                  Save &amp; Mark as Excused
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
