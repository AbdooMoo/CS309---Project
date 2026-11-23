import React, { useState } from 'react';
import { INSTRUCTOR_PROFILE } from './instructorData';

export default function InstructorProfile({ onProfileUpdated }) {
  const [profile, setProfile] = useState(INSTRUCTOR_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [successToast, setSuccessToast] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    setSuccessToast(true);
    if (onProfileUpdated) onProfileUpdated(formData);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  return (
    <div className="instructor-subview-container">
      {/* Subview Header */}
      <div className="subview-header-row">
        <div>
          <span className="subview-pretag">FACULTY IDENTITY &amp; CREDENTIALS</span>
          <h2 className="subview-title-serif">My Profile</h2>
          <p className="subview-description">
            Your official faculty identification, office hours, departmental contact details, and academic profile.
          </p>
        </div>

        <div className="subview-header-actions">
          <button
            type="button"
            className="btn-primary-wine"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Editing' : '✏️ Edit Profile Info'}
          </button>
        </div>
      </div>

      {successToast && (
        <div className="profile-toast-success">
          <span className="toast-icon">✓</span>
          <span>Faculty profile credentials updated successfully!</span>
        </div>
      )}

      {/* Official Faculty Digital ID Card */}
      <div className="faculty-digital-id-card-wrapper">
        <div className="faculty-id-card">
          <div className="faculty-id-header">
            <div className="faculty-cu-crest">
              <div className="cu-shield-badge">CU</div>
              <div>
                <span className="crest-univ">CAIRO UNIVERSITY</span>
                <span className="crest-faculty">FACULTY OF SCIENCE</span>
                <span className="crest-heritage">100 YEARS &bull; EST. 1925</span>
              </div>
            </div>

            <div className="faculty-card-chip">
              <span className="faculty-staff-stamp">STAFF ID</span>
            </div>
          </div>

          <div className="faculty-id-body">
            <div className="faculty-photo-frame">
              <div className="faculty-avatar-circle">
                <span>MH</span>
              </div>
              <span className="verified-faculty-pill">🛡️ ACCREDITED FACULTY</span>
            </div>

            <div className="faculty-info-column">
              <h3 className="faculty-name-serif">{profile.name}</h3>
              <p className="faculty-rank-text">{profile.title}</p>

              <div className="faculty-specs-grid">
                <div className="spec-item">
                  <span className="spec-lbl">STAFF ID</span>
                  <span className="spec-val font-mono">{profile.staffId}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-lbl">DEPARTMENT</span>
                  <span className="spec-val">{profile.department}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-lbl">OFFICIAL EMAIL</span>
                  <span className="spec-val font-mono">{profile.email}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-lbl">CAMPUS OFFICE</span>
                  <span className="spec-val">{profile.office}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="faculty-id-footer">
            <div className="faculty-barcode-container">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 1, 2, 4, 2].map((w, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: `${w * 2.2}px`,
                    height: '22px',
                    backgroundColor: '#1F191B',
                    marginRight: '2px',
                  }}
                />
              ))}
            </div>
            <span className="barcode-code font-mono">* {profile.staffId} &bull; CAIRO-SCIENCE *</span>
          </div>
        </div>
      </div>

      {/* Profile Details or Edit Form */}
      {isEditing ? (
        <div className="profile-edit-card">
          <h3 className="card-title-serif">Update Faculty Information</h3>
          <p className="section-hint-text">
            Update your public office hours, direct telephone number, or research biography shown to enrolled students.
          </p>

          <form onSubmit={handleSave} className="profile-form-grid">
            <div className="modal-field-group">
              <label className="modal-label">OFFICE HOURS</label>
              <input
                type="text"
                className="modal-input"
                value={formData.officeHours}
                onChange={(e) => handleChange('officeHours', e.target.value)}
                required
              />
            </div>

            <div className="modal-field-group">
              <label className="modal-label">CAMPUS OFFICE LOCATION</label>
              <input
                type="text"
                className="modal-input"
                value={formData.office}
                onChange={(e) => handleChange('office', e.target.value)}
                required
              />
            </div>

            <div className="modal-field-group">
              <label className="modal-label">TELEPHONE / EXTENSION</label>
              <input
                type="text"
                className="modal-input"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            <div className="modal-field-group">
              <label className="modal-label">RESEARCH SPECIALIZATION</label>
              <input
                type="text"
                className="modal-input"
                value={formData.researchFocus}
                onChange={(e) => handleChange('researchFocus', e.target.value)}
              />
            </div>

            <div className="profile-form-actions">
              <button
                type="button"
                className="btn-secondary-cream"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary-wine">
                Save Changes &rarr;
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overview-split-layout" style={{ marginTop: '2rem' }}>
          {/* Academic Details */}
          <div className="overview-column-card">
            <div className="column-card-header">
              <div className="header-title-group">
                <span className="header-sublabel">OFFICE &amp; ADVISING</span>
                <h3 className="card-title-serif">Office Hours &amp; Location</h3>
              </div>
            </div>

            <div className="profile-info-rows">
              <div className="p-info-row">
                <span className="p-lbl">Office Hours:</span>
                <span className="p-val font-semibold">{profile.officeHours}</span>
              </div>
              <div className="p-info-row">
                <span className="p-lbl">Location:</span>
                <span className="p-val">{profile.office}</span>
              </div>
              <div className="p-info-row">
                <span className="p-lbl">Faculty Extension:</span>
                <span className="p-val font-mono">{profile.phone}</span>
              </div>
              <div className="p-info-row">
                <span className="p-lbl">Academic Rank:</span>
                <span className="p-val">{profile.academicRank}</span>
              </div>
            </div>
          </div>

          {/* Research & Courses */}
          <div className="overview-column-card">
            <div className="column-card-header">
              <div className="header-title-group">
                <span className="header-sublabel">RESEARCH &amp; INSTRUCTION</span>
                <h3 className="card-title-serif">Instruction Summary</h3>
              </div>
            </div>

            <div className="profile-info-rows">
              <div className="p-info-row">
                <span className="p-lbl">Courses Taught:</span>
                <span className="p-val font-semibold">{profile.coursesTaughtCount} Subjects (Fall 2026)</span>
              </div>
              <div className="p-info-row">
                <span className="p-lbl">Total Students:</span>
                <span className="p-val font-semibold">{profile.totalStudentsTaught} Students Enrolled</span>
              </div>
              <div className="p-info-row">
                <span className="p-lbl">Research Focus:</span>
                <span className="p-val">{profile.researchFocus}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
