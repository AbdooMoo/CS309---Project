import React, { useState } from 'react';
import Modal from './Modal';

export default function NewCourseModal({ onClose, onCourseCreated }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [enrolledCount, setEnrolledCount] = useState(60);
  const [schedule, setSchedule] = useState('');
  const [hall, setHall] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    onCourseCreated({
      id: normalizedCode.toLowerCase().replace(/\s+/g, '-'),
      code: normalizedCode,
      name: name.trim(),
      section: 'Section 1',
      level: 'Level 3',
      semester: 'Fall 2026',
      creditHours: 3,
      department: 'Computer Science',
      enrolledCount: Number(enrolledCount),
      attendanceRate: 0,
      schedule: schedule.trim() || 'To be scheduled',
      hall: hall.trim() || 'To be assigned',
      status: 'Active',
      hasLiveSession: false,
    });
    onClose();
  };

  return (
    <Modal title="Add a course" description="Create a course for this semester." onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-grid">
          <label className="modal-field">
            Course code
            <input value={code} onChange={(event) => setCode(event.target.value)} required />
          </label>
          <label className="modal-field">
            Students
            <input
              type="number"
              min="1"
              value={enrolledCount}
              onChange={(event) => setEnrolledCount(event.target.value)}
              required
            />
          </label>
        </div>
        <label className="modal-field">
          Course title
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <div className="modal-grid">
          <label className="modal-field">
            Schedule
            <input value={schedule} onChange={(event) => setSchedule(event.target.value)} />
          </label>
          <label className="modal-field">
            Room
            <input value={hall} onChange={(event) => setHall(event.target.value)} />
          </label>
        </div>
        <div className="modal-actions">
          <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button button-primary" type="submit">Add course</button>
        </div>
      </form>
    </Modal>
  );
}
