import React, { useEffect, useState } from 'react';
import Modal from './Modal';

export default function LiveQRModal({ session, onClose, onSessionUpdated }) {
  const [seconds, setSeconds] = useState(session.dynamicRefreshSeconds || 15);
  const [token, setToken] = useState('CU-' + Math.random().toString(36).slice(2, 8).toUpperCase());
  const [present, setPresent] = useState(session.presentCount);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((remaining) => {
        if (remaining <= 1) {
          setToken('CU-' + Math.random().toString(36).slice(2, 8).toUpperCase());
          return session.dynamicRefreshSeconds || 15;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session.dynamicRefreshSeconds]);

  const addCheckIn = (event) => {
    event.preventDefault();
    if (present >= session.enrolledTotal || !studentName.trim() || !studentId.trim()) return;
    setPresent((count) => count + 1);
    setStudentName('');
    setStudentId('');
  };

  const finishSession = () => {
    onSessionUpdated({
      ...session,
      status: 'Completed',
      presentCount: present,
      absentCount: Math.max(0, session.enrolledTotal - present),
      attendanceRate: Math.round((present / session.enrolledTotal) * 100),
    });
    onClose();
  };

  return (
    <Modal
      title={`${session.courseCode} attendance`}
      description={`${session.sessionType} · ${session.hall}`}
      onClose={onClose}
    >
      <div className="attendance-code" aria-label="Demo attendance code">{token}</div>
      <div className="attendance-summary">
        <span><strong>{present}</strong> / {session.enrolledTotal} present</span>
        <span>Code refreshes in <strong>{seconds}s</strong></span>
      </div>
      <form className="modal-form manual-checkin" onSubmit={addCheckIn}>
        <p className="modal-copy">Record a manual check-in</p>
        <div className="modal-grid">
          <label className="modal-field">
            Student name
            <input value={studentName} onChange={(event) => setStudentName(event.target.value)} required />
          </label>
          <label className="modal-field">
            Academic ID
            <input value={studentId} onChange={(event) => setStudentId(event.target.value)} required />
          </label>
        </div>
        <div className="modal-actions">
          <button className="button button-secondary" type="submit" disabled={present >= session.enrolledTotal}>
            Record check-in
          </button>
          <button className="button button-primary" type="button" onClick={finishSession}>End session</button>
        </div>
      </form>
    </Modal>
  );
}
