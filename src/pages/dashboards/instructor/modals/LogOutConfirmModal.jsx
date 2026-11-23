import React from 'react';

export default function LogOutConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="unitrack-modal-overlay" onClick={onCancel}>
      <div className="unitrack-modal-card logout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="logout-icon-wrapper">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#581825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        <h3 className="logout-modal-title">Sign Out of UniTrack</h3>
        <p className="logout-modal-desc">
          Are you sure you want to end your instructor session? Any unsaved live attendance data will be finalized automatically.
        </p>

        <div className="logout-modal-actions">
          <button type="button" className="btn-secondary-cream" onClick={onCancel}>
            Stay Signed In
          </button>
          <button type="button" className="btn-primary-wine" onClick={onConfirm}>
            Yes, Sign Out &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
