import React from 'react';
import Modal from './Modal';

export default function StudentDetailModal({ student, onClose }) {
  return (
    <Modal title={student.name} description={`Student record · ${student.academicId}`} onClose={onClose}>
      <p className="modal-copy">{student.email}</p>
      <p className="modal-copy">{student.department} · {student.level}</p>
      <div className="student-summary">
        <span><strong>{student.overallAttendance}%</strong> attendance</span>
        <span><strong>{student.attendedSessions}</strong> attended</span>
        <span><strong>{student.excusedSessions}</strong> excused</span>
        <span><strong>{student.absentSessions}</strong> absent</span>
      </div>
      <p className="modal-copy">Courses: {student.coursesEnrolled.join(', ')}</p>
      <div className="modal-actions">
        <button className="button button-primary" type="button" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
