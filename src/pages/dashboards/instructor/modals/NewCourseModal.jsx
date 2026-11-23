import React, { useState } from 'react';

export default function NewCourseModal({ onClose, onCourseCreated }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Level 3 • Year 3');
  const [creditHours, setCreditHours] = useState(3);
  const [schedule, setSchedule] = useState('');
  const [hall, setHall] = useState('');
  const [enrolledCount, setEnrolledCount] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !name) return;

    const newCourse = {
      id: code.toLowerCase().replace(/\s+/g, '-'),
      code: code.toUpperCase(),
      name,
      section: 'Section 1',
      level,
      semester: 'Fall 2026',
      creditHours: Number(creditHours),
      department: 'Computer Science',
      enrolledCount: Number(enrolledCount),
      attendanceRate: 100,
      schedule: schedule || 'Sun & Tue 10:00 – 11:30 AM',
      hall: hall || 'Main Science Hall 1',
      status: 'Active',
      nextSession: 'Upcoming',
      syllabusUrl: '#',
      hasLiveSession: false,
    };

    onCourseCreated(newCourse);
    onClose();
  };

  return (
    <div className="unitrack-modal-overlay" onClick={onClose}>
      <div className="unitrack-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-standard">
          <div>
            <span className="modal-pretag">FACULTY OF SCIENCE &bull; CURRICULUM</span>
            <h3 className="modal-title-serif">Add New Academic Course</h3>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="modal-two-col">
            <div className="modal-field-group">
              <label className="modal-label">COURSE CODE</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. CS 304"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="modal-field-group">
              <label className="modal-label">CREDIT HOURS</label>
              <input
                type="number"
                min="1"
                max="6"
                className="modal-input"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-field-group">
            <label className="modal-label">COURSE TITLE</label>
            <input
              type="text"
              className="modal-input"
              placeholder="e.g. Artificial Intelligence & Heuristics"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal-two-col">
            <div className="modal-field-group">
              <label className="modal-label">ACADEMIC LEVEL</label>
              <select
                className="modal-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Level 1 • Year 1">Level 1 &bull; Year 1</option>
                <option value="Level 2 • Year 2">Level 2 &bull; Year 2</option>
                <option value="Level 3 • Year 3">Level 3 &bull; Year 3</option>
                <option value="Level 4 • Year 4">Level 4 &bull; Year 4</option>
                <option value="Postgraduate &bull; M.Sc.">Postgraduate &bull; M.Sc.</option>
              </select>
            </div>
            <div className="modal-field-group">
              <label className="modal-label">EXPECTED ENROLLED STUDENTS</label>
              <input
                type="number"
                min="5"
                max="300"
                className="modal-input"
                value={enrolledCount}
                onChange={(e) => setEnrolledCount(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-two-col">
            <div className="modal-field-group">
              <label className="modal-label">TIMETABLE / SCHEDULE</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Sun &amp; Tue 10:00 – 11:30 AM"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
            <div className="modal-field-group">
              <label className="modal-label">ASSIGNED HALL / LAB</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Computer Science Lab 2"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn-secondary-cream" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-wine">
              Create Course &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
