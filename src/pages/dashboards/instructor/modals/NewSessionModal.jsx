import React, { useState } from 'react';
import Modal from './Modal';

export default function NewSessionModal({ courses, initialCourseCode, onClose, onSessionCreated }) {
  const [courseCode, setCourseCode] = useState(initialCourseCode || courses[0]?.code || '');
  const [sessionType, setSessionType] = useState('Lecture');
  const [topic, setTopic] = useState('');
  const [hall, setHall] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = courses.find((item) => item.code === courseCode);
    if (!course) return;

    onSessionCreated({
      id: `SES-${Date.now()}`,
      courseId: course.id,
      courseCode: course.code,
      courseName: course.name,
      sessionType: sessionType.trim(),
      topic: topic.trim() || sessionType.trim(),
      date: new Date().toISOString().slice(0, 10),
      time: 'Just started',
      hall: hall.trim() || course.hall,
      enrolledTotal: course.enrolledCount,
      presentCount: 0,
      absentCount: 0,
      excusedCount: 0,
      attendanceRate: 0,
      status: 'Live',
      expiresInSeconds: 180,
      geofenceActive: false,
      dynamicRefreshSeconds: 15,
    });
    onClose();
  };

  return (
    <Modal title="Start attendance" description="Choose a course and add the session details." onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-field">
          Course
          <select value={courseCode} onChange={(event) => setCourseCode(event.target.value)} required>
            {courses.map((course) => <option key={course.id} value={course.code}>{course.code} · {course.name}</option>)}
          </select>
        </label>
        <div className="modal-grid">
          <label className="modal-field">
            Session
            <input value={sessionType} onChange={(event) => setSessionType(event.target.value)} required />
          </label>
          <label className="modal-field">
            Room
            <input value={hall} onChange={(event) => setHall(event.target.value)} placeholder="Course room" />
          </label>
        </div>
        <label className="modal-field">
          Topic
          <input value={topic} onChange={(event) => setTopic(event.target.value)} />
        </label>
        <div className="modal-actions">
          <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button button-primary" type="submit" disabled={!courses.length}>Start session</button>
        </div>
      </form>
    </Modal>
  );
}
