import React, { useState, useEffect } from 'react';

export default function LiveQRModal({ session, onClose, onSessionUpdated }) {
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [qrToken, setQrToken] = useState('CU-SCI-CS309-89B2');
  const [checkedInCount, setCheckedInCount] = useState(session ? session.presentCount : 76);
  const [isPaused, setIsPaused] = useState(false);
  const [manualStudentName, setManualStudentName] = useState('');
  const [manualStudentId, setManualStudentId] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [recentNotification, setRecentNotification] = useState(null);

  const totalEnrolled = session ? session.enrolledTotal : 88;
  const percentage = Math.round((checkedInCount / totalEnrolled) * 100);

  // Dynamic QR code token generator
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Generate new dynamic token
          const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
          setQrToken(`CU-SCI-CS309-${randomHex}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Simulate occasional live student check-ins during projector display
  useEffect(() => {
    const simulatedStudents = [
      'Ahmed Essam Bayoumi (20230204)',
      'Dina Waleed Fikry (20230355)',
      'Hassan Mahmoud Ali (20230199)',
      'Salma Tarek Helmy (20230278)',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (checkedInCount < totalEnrolled && Math.random() > 0.4) {
        setCheckedInCount((c) => Math.min(c + 1, totalEnrolled));
        const student = simulatedStudents[index % simulatedStudents.length];
        index++;
        setRecentNotification(`Check-in verified: ${student}`);
        setTimeout(() => setRecentNotification(null), 3500);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [checkedInCount, totalEnrolled]);

  const handleManualCheckIn = (e) => {
    e.preventDefault();
    if (!manualStudentName || !manualStudentId) return;

    setCheckedInCount((c) => Math.min(c + 1, totalEnrolled));
    setRecentNotification(`Manual override added: ${manualStudentName} (${manualStudentId})`);
    setManualStudentName('');
    setManualStudentId('');
    setShowManualForm(false);
    setTimeout(() => setRecentNotification(null), 3500);
  };

  const handleEndSession = () => {
    if (window.confirm('Are you sure you want to end this live attendance session? Attendance records will be permanently finalized.')) {
      if (onSessionUpdated) {
        onSessionUpdated({
          ...session,
          status: 'Completed',
          presentCount: checkedInCount,
          absentCount: totalEnrolled - checkedInCount,
        });
      }
      onClose();
    }
  };

  return (
    <div className="unitrack-modal-overlay" onClick={onClose}>
      <div
        className="live-qr-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="live-qr-header">
          <div className="header-left">
            <span className="live-badge-pulsing">
              <span className="pulse-dot"></span>
              LIVE ATTENDANCE BROADCAST
            </span>
            <h2 className="modal-course-title">
              {session?.courseCode || 'CS 309'}: {session?.courseName || 'Software Engineering & System Architecture'}
            </h2>
            <p className="modal-session-subtitle">
              {session?.sessionType || 'Lecture 11'} &bull; {session?.hall || 'Science Auditorium 2'} &bull; Faculty of Science, Cairo University
            </p>
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

        {recentNotification && (
          <div className="live-notification-toast">
            <span className="toast-icon">✓</span>
            <span>{recentNotification}</span>
          </div>
        )}

        <div className="live-qr-body-grid">
          {/* Big QR Display Area */}
          <div className="qr-projector-card">
            <div className="qr-box-wrapper">
              <div className="qr-watermark-tag">FACULTY OF SCIENCE &bull; CAIRO UNIVERSITY</div>
              
              <div className="qr-svg-holder">
                {/* Stylized high-res SVG dynamic QR code */}
                <svg className="large-qr-svg" viewBox="0 0 160 160" fill="#3F101A">
                  <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke="#581825" strokeWidth="6" />
                  <rect x="22" y="22" width="16" height="16" rx="2" fill="#581825" />
                  
                  <rect x="110" y="10" width="40" height="40" rx="4" fill="none" stroke="#581825" strokeWidth="6" />
                  <rect x="122" y="22" width="16" height="16" rx="2" fill="#581825" />
                  
                  <rect x="10" y="110" width="40" height="40" rx="4" fill="none" stroke="#581825" strokeWidth="6" />
                  <rect x="22" y="122" width="16" height="16" rx="2" fill="#581825" />

                  {/* Dynamic internal data blocks */}
                  <rect x="62" y="14" width="12" height="12" rx="2" fill="#C29D62" />
                  <rect x="82" y="20" width="16" height="10" rx="2" fill="#581825" />
                  <rect x="62" y="38" width="14" height="14" rx="2" fill="#581825" />
                  <rect x="86" y="42" width="12" height="12" rx="2" fill="#C29D62" />

                  <rect x="14" y="62" width="12" height="14" rx="2" fill="#581825" />
                  <rect x="34" y="70" width="16" height="10" rx="2" fill="#581825" />
                  <rect x="14" y="86" width="14" height="12" rx="2" fill="#C29D62" />
                  <rect x="36" y="88" width="12" height="14" rx="2" fill="#581825" />

                  {/* Center university badge */}
                  <rect x="60" y="60" width="40" height="40" rx="8" fill="#581825" stroke="#C29D62" strokeWidth="2" />
                  <circle cx="80" cy="80" r="12" fill="#FBF8F3" />
                  <text x="80" y="84" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581825">CU</text>

                  {/* Bottom right data blocks */}
                  <rect x="110" y="62" width="14" height="12" rx="2" fill="#581825" />
                  <rect x="132" y="70" width="16" height="10" rx="2" fill="#C29D62" />
                  <rect x="114" y="86" width="12" height="14" rx="2" fill="#581825" />
                  <rect x="134" y="88" width="14" height="12" rx="2" fill="#581825" />

                  <rect x="62" y="110" width="16" height="10" rx="2" fill="#581825" />
                  <rect x="84" y="114" width="12" height="14" rx="2" fill="#C29D62" />
                  <rect x="62" y="132" width="14" height="14" rx="2" fill="#C29D62" />
                  <rect x="86" y="136" width="16" height="12" rx="2" fill="#581825" />

                  <rect x="110" y="110" width="14" height="12" rx="2" fill="#C29D62" />
                  <rect x="132" y="116" width="14" height="14" rx="2" fill="#581825" />
                  <rect x="114" y="134" width="16" height="12" rx="2" fill="#581825" />
                  <rect x="136" y="136" width="12" height="12" rx="2" fill="#C29D62" />
                </svg>
              </div>

              <div className="dynamic-token-bar">
                <span className="token-label">Security Hash:</span>
                <span className="token-code">{qrToken}</span>
              </div>
            </div>

            {/* Countdown timer & fraud prevention status */}
            <div className="timer-countdown-row">
              <div className="timer-badge">
                <svg className="timer-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Dynamic refresh in <strong>{secondsRemaining}s</strong></span>
              </div>

              <button
                type="button"
                className="pause-refresh-btn"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? 'Resume Refresh' : 'Pause Refresh'}
              </button>
            </div>

            <p className="anti-fraud-note">
              🛡️ Anti-fraud protection active. Screenshots will expire in 15 seconds. Cairo University campus geofence is enforced.
            </p>
          </div>

          {/* Session Statistics & Quick Controls */}
          <div className="live-qr-sidebar-stats">
            <div className="stats-box-attendees">
              <span className="stat-label">CHECKED IN ATTENDEES</span>
              <div className="stat-big-number">
                <span className="number-highlight">{checkedInCount}</span>
                <span className="number-total">/ {totalEnrolled}</span>
              </div>
              <div className="attendees-progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="progress-footer-labels">
                <span>{percentage}% Present</span>
                <span>{totalEnrolled - checkedInCount} Awaiting</span>
              </div>
            </div>

            <div className="session-security-badges">
              <div className="sec-item">
                <span className="sec-icon">📍</span>
                <div className="sec-text">
                  <strong>Auditorium 2 Geofence:</strong>
                  <span>Active (35m radius)</span>
                </div>
              </div>
              <div className="sec-item">
                <span className="sec-icon">📶</span>
                <div className="sec-text">
                  <strong>Network:</strong>
                  <span>Cairo University Science Wi-Fi</span>
                </div>
              </div>
              <div className="sec-item">
                <span className="sec-icon">⏱️</span>
                <div className="sec-text">
                  <strong>Session Started:</strong>
                  <span>09:00 AM (42 mins elapsed)</span>
                </div>
              </div>
            </div>

            {/* Manual check in accordion */}
            <div className="manual-override-card">
              <button
                type="button"
                className="toggle-manual-btn"
                onClick={() => setShowManualForm(!showManualForm)}
              >
                <span>Manual Student Override</span>
                <span>{showManualForm ? '▲' : '▼'}</span>
              </button>

              {showManualForm && (
                <form className="manual-form" onSubmit={handleManualCheckIn}>
                  <p className="form-hint">Manually mark student present if device battery died or camera malfunctioned.</p>
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="modal-input"
                    value={manualStudentName}
                    onChange={(e) => setManualStudentName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Academic ID (e.g., 20230199)"
                    className="modal-input"
                    value={manualStudentId}
                    onChange={(e) => setManualStudentId(e.target.value)}
                    required
                  />
                  <button type="submit" className="submit-manual-btn">
                    Confirm &amp; Mark Present
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="modal-bottom-actions">
              <button
                type="button"
                className="btn-danger-outline"
                onClick={handleEndSession}
              >
                End &amp; Finalize Session
              </button>
              <button
                type="button"
                className="btn-primary-wine"
                onClick={onClose}
              >
                Keep Running in Background
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
