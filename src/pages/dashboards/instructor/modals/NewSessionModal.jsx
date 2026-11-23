import React, { useState } from 'react';

export default function NewSessionModal({ courses, onClose, onSessionCreated }) {
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'CS 309');
  const [sessionType, setSessionType] = useState('Lecture 12');
  const [topic, setTopic] = useState('');
  const [hall, setHall] = useState('Science Auditorium 2');
  const [geofenceActive, setGeofenceActive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCourse = courses.find((c) => c.code === courseCode) || courses[0];
    const newSession = {
      id: `SES-${Date.now().toString().slice(-6)}`,
      courseId: selectedCourse.id,
      courseCode: selectedCourse.code,
      courseName: selectedCourse.name,
      sessionType,
      topic: topic || `${sessionType} Topics & Applications`,
      date: new Date().toISOString().split('T')[0],
      time: 'Just started',
      hall,
      enrolledTotal: selectedCourse.enrolledCount,
      presentCount: 0,
      absentCount: 0,
      excusedCount: 0,
      attendanceRate: 0,
      status: 'Live',
      expiresInSeconds: 180,
      geofenceActive,
      dynamicRefreshSeconds: Number(refreshInterval),
    };

    onSessionCreated(newSession);
    onClose();
  };

  return (
    <div className="unitrack-modal-overlay" onClick={onClose}>
      <div className="unitrack-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-standard">
          <div>
            <span className="modal-pretag">FACULTY OF SCIENCE &bull; ATTENDANCE</span>
            <h3 className="modal-title-serif">Start New Attendance Session</h3>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="modal-field-group">
            <label className="modal-label">COURSE</label>
            <select
              className="modal-select"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} &mdash; {c.name} ({c.enrolledCount} Students)
                </option>
              ))}
            </select>
          </div>

          <div className="modal-two-col">
            <div className="modal-field-group">
              <label className="modal-label">SESSION TYPE / NUMBER</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Lecture 12 or Lab 05"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                required
              />
            </div>

            <div className="modal-field-group">
              <label className="modal-label">HALL / LOCATION</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Science Auditorium 2"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-field-group">
            <label className="modal-label">LECTURE / DISCUSSION TOPIC</label>
            <input
              type="text"
              className="modal-input"
              placeholder="e.g. System Design and Security Verification"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="modal-two-col">
            <div className="modal-field-group">
              <label className="modal-label">DYNAMIC QR REFRESH RATE</label>
              <select
                className="modal-select"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
              >
                <option value={10}>Every 10 seconds (Strict Anti-Fraud)</option>
                <option value={15}>Every 15 seconds (Recommended)</option>
                <option value={30}>Every 30 seconds (Standard)</option>
              </select>
            </div>

            <div className="modal-field-group">
              <label className="modal-label">GEOFENCE PROTECTION</label>
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={geofenceActive}
                  onChange={(e) => setGeofenceActive(e.target.checked)}
                />
                <span>Enforce Faculty Campus Boundary</span>
              </label>
            </div>
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn-secondary-cream" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-wine">
              Launch Live Session &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
