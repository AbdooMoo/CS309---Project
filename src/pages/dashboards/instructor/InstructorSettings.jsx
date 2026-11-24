import React, { useState } from 'react';

export default function InstructorSettings() {
  const [qrRefreshRate, setQrRefreshRate] = useState('15');
  const [geofenceRadius, setGeofenceRadius] = useState('35');
  const [strictScreenshotBlock, setStrictScreenshotBlock] = useState(true);
  const [absenceThreshold, setAbsenceThreshold] = useState('75');
  const [maxUnexcusedAbsences, setMaxUnexcusedAbsences] = useState('3');
  const [autoEmailAdvisor, setAutoEmailAdvisor] = useState(true);
  const [soundChimeEnabled, setSoundChimeEnabled] = useState(true);
  const [dailyDigestEmail, setDailyDigestEmail] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  return (
    <div className="instructor-subview-container">
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">PORTAL PREFERENCES</span>
          <h2 className="subview-title-serif">System Settings</h2>
          <p className="subview-description">
            Configure dynamic QR anti-fraud parameters, Cairo University attendance enforcement bylaws, and alerts.
          </p>
        </div>

        <div className="subview-header-actions">
          <button
            type="button"
            className="btn-primary-wine"
            onClick={handleSaveSettings}
          >
            Save All Preferences
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="profile-toast-success">
          <span className="toast-icon">✓</span>
          <span>Settings and attendance policies saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="settings-cards-stack">
        <div className="settings-section-card">
          <div className="settings-card-header">
            <span className="settings-section-icon">🛡️</span>
            <div>
              <h3 className="settings-section-title">Anti-Fraud &amp; Dynamic QR Security</h3>
              <p className="settings-section-desc">
                Controls to prevent students from sharing QR code screenshots with peers outside the lecture hall.
              </p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="modal-field-group">
              <label className="modal-label">DYNAMIC QR REFRESH CADENCE</label>
              <select
                className="modal-select"
                value={qrRefreshRate}
                onChange={(e) => setQrRefreshRate(e.target.value)}
              >
                <option value="10">Every 10 Seconds (Maximum Anti-Fraud)</option>
                <option value="15">Every 15 Seconds (Recommended Standard)</option>
                <option value="30">Every 30 Seconds (Relaxed Network)</option>
              </select>
              <span className="field-help-text">Codes older than this duration expire instantly and cannot be scanned.</span>
            </div>

            <div className="modal-field-group">
              <label className="modal-label">GEOFENCING CAMPUS RADIUS</label>
              <select
                className="modal-select"
                value={geofenceRadius}
                onChange={(e) => setGeofenceRadius(e.target.value)}
              >
                <option value="25">25 Meters (Auditorium Boundary Only)</option>
                <option value="35">35 Meters (Auditorium &amp; Immediate Hallway)</option>
                <option value="50">50 Meters (Faculty of Science Wing)</option>
                <option value="disabled">Disabled (Remote / Online Session)</option>
              </select>
              <span className="field-help-text">Validates GPS coordinates and Cairo University Wi-Fi subnet before accepting check-in.</span>
            </div>

            <div className="modal-field-group full-width">
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={strictScreenshotBlock}
                  onChange={(e) => setStrictScreenshotBlock(e.target.checked)}
                />
                <div>
                  <strong>Enable Dynamic Screen Watermarking</strong>
                  <p className="text-muted text-small">
                    Displays moving micro-dots and student academic ID watermark across projected and scanned screens.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section-card">
          <div className="settings-card-header">
            <span className="settings-section-icon">🏛️</span>
            <div>
              <h3 className="settings-section-title">Cairo University Academic Regulations</h3>
              <p className="settings-section-desc">
                Faculty of Science bylaws governing student attendance limits and final examination qualification.
              </p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="modal-field-group">
              <label className="modal-label">MINIMUM ATTENDANCE THRESHOLD</label>
              <select
                className="modal-select"
                value={absenceThreshold}
                onChange={(e) => setAbsenceThreshold(e.target.value)}
              >
                <option value="75">75% (Cairo University Standard Bylaw)</option>
                <option value="80">80% (Department Honors Requirement)</option>
                <option value="70">70% (Provisional Waiver)</option>
              </select>
              <span className="field-help-text">Students falling below this percentage receive an automated warning notice.</span>
            </div>

            <div className="modal-field-group">
              <label className="modal-label">CONSECUTIVE UNEXCUSED ABSENCE LIMIT</label>
              <select
                className="modal-select"
                value={maxUnexcusedAbsences}
                onChange={(e) => setMaxUnexcusedAbsences(e.target.value)}
              >
                <option value="2">2 Consecutive Lectures</option>
                <option value="3">3 Consecutive Lectures (Standard Rule)</option>
                <option value="4">4 Consecutive Lectures</option>
              </select>
              <span className="field-help-text">Triggers urgent notification to student academic advisor.</span>
            </div>

            <div className="modal-field-group full-width">
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={autoEmailAdvisor}
                  onChange={(e) => setAutoEmailAdvisor(e.target.checked)}
                />
                <div>
                  <strong>Automated Warning Copy to Academic Advising Council</strong>
                  <p className="text-muted text-small">
                    Forward attendance disqualification warnings directly to the Faculty of Science Education Affairs office.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section-card">
          <div className="settings-card-header">
            <span className="settings-section-icon">🔔</span>
            <div>
              <h3 className="settings-section-title">Live Session Audio &amp; Digests</h3>
              <p className="settings-section-desc">
                Configure auditory chime during projector display and daily session email summaries.
              </p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="modal-field-group full-width">
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={soundChimeEnabled}
                  onChange={(e) => setSoundChimeEnabled(e.target.checked)}
                />
                <div>
                  <strong>Auditory Check-In Chime on Projector</strong>
                  <p className="text-muted text-small">
                    Plays subtle confirmation chime when a student successfully scans during live lecture broadcast.
                  </p>
                </div>
              </label>
            </div>

            <div className="modal-field-group full-width">
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={dailyDigestEmail}
                  onChange={(e) => setDailyDigestEmail(e.target.checked)}
                />
                <div>
                  <strong>Daily Session Summary Email</strong>
                  <p className="text-muted text-small">
                    Receive an end-of-day attendance digest with CSV attachment sent to your university inbox.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-footer-save">
          <button type="submit" className="btn-primary-wine btn-large">
            Save All Preferences &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
