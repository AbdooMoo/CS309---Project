import React, { useState } from 'react';
import './AdminProfile.css';

const INITIAL_PROFILE = {
  fullName: 'Dr. Tariq Mansour',
  email: 'admin.tariq@science.cu.edu.eg',
  phone: '+20 100 234 5678',
  department: 'Faculty Information Technology Center',
  jobTitle: 'Senior Systems & Database Administrator',
  adminId: 'ADM-2024-8841',
  role: 'Administrator',
  status: 'Active',
  accountCreated: 'October 14, 2023',
  lastLogin: 'Today at 09:42 AM',
  accessScope: 'Full System Access (Course Sessions, Attendance Logs, System Audit)',
  profilePicture: ''
};

export default function AdminProfile() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    fullName: INITIAL_PROFILE.fullName,
    email: INITIAL_PROFILE.email,
    phone: INITIAL_PROFILE.phone,
    department: INITIAL_PROFILE.department,
    jobTitle: INITIAL_PROFILE.jobTitle
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const validatePersonalForm = () => {
    const errs = {};
    if (!personalForm.fullName || !personalForm.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    } else if (personalForm.fullName.trim().length < 3) {
      errs.fullName = 'Full name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!personalForm.email || !personalForm.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(personalForm.email.trim())) {
      errs.email = 'Please enter a valid email format.';
    }

    if (!personalForm.phone || !personalForm.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (personalForm.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!personalForm.department || !personalForm.department.trim()) {
      errs.department = 'Department is required.';
    }

    if (!personalForm.jobTitle || !personalForm.jobTitle.trim()) {
      errs.jobTitle = 'Job title is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleStartEditing = () => {
    setPersonalForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
      jobTitle: profile.jobTitle
    });
    setErrors({});
    setIsEditingPersonal(true);
  };

  const handleCancelEditing = () => {
    setPersonalForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
      jobTitle: profile.jobTitle
    });
    setErrors({});
    setIsEditingPersonal(false);
  };

  const handleSavePersonal = (e) => {
    e.preventDefault();
    if (!validatePersonalForm()) {
      return;
    }

    setProfile((prev) => ({
      ...prev,
      fullName: personalForm.fullName.trim(),
      email: personalForm.email.trim(),
      phone: personalForm.phone.trim(),
      department: personalForm.department.trim(),
      jobTitle: personalForm.jobTitle.trim()
    }));

    setIsEditingPersonal(false);
    setToastMessage('Personal information updated successfully.');
  };

  return (
    <div className="admin-profile-page">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="brand-group">
            <div className="brand-crest">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand-titles">
              <h1 className="brand-name">UniTrack</h1>
              <span className="brand-sub">Cairo University &bull; Faculty of Science</span>
            </div>
          </div>
          <div className="topbar-role-tag">
            <span className="role-dot"></span>
            <span>Admin Console</span>
          </div>
        </div>
      </header>

      <main className="admin-container">
        {toastMessage && (
          <div className="toast-banner toast-banner-success">
            <div className="toast-content">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setToastMessage(null)}
            >
              &times;
            </button>
          </div>
        )}

        <section className="profile-header-card">
          <div className="profile-header-left">
            <div className="profile-avatar-wrapper">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt={profile.fullName} className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-fallback">
                  <span>TM</span>
                </div>
              )}
            </div>
            <div className="profile-header-info">
              <div className="profile-name-row">
                <h2 className="admin-name">{profile.fullName}</h2>
                <span className="status-badge status-badge-active">
                  <span className="status-dot"></span>
                  {profile.status}
                </span>
              </div>
              <p className="admin-email-text">{profile.email}</p>
              <div className="admin-badges-row">
                <span className="role-pill">{profile.role}</span>
                <span className="id-pill">ID: {profile.adminId}</span>
              </div>
            </div>
          </div>
          <div className="profile-header-actions">
            {!isEditingPersonal && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartEditing}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </section>

        <div className="profile-content-grid">
          <section className="profile-card personal-info-card">
            <div className="card-header-bar">
              <div className="card-title-group">
                <div className="card-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Personal Information</h3>
                  <p className="card-subtitle">Manage your personal and institutional contact credentials</p>
                </div>
              </div>
              {!isEditingPersonal && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleStartEditing}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingPersonal ? (
              <form onSubmit={handleSavePersonal} noValidate>
                <div className="form-inputs-grid">
                  <div className="input-field-group">
                    <label className="field-label" htmlFor="fullName">
                      Full Name <span className="field-required">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                      value={personalForm.fullName}
                      onChange={handlePersonalChange}
                    />
                    {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="email">
                      Email Address <span className="field-required">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                      value={personalForm.email}
                      onChange={handlePersonalChange}
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="phone">
                      Phone Number <span className="field-required">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                      value={personalForm.phone}
                      onChange={handlePersonalChange}
                    />
                    {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="department">
                      Department <span className="field-required">*</span>
                    </label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      className={`form-input ${errors.department ? 'form-input-error' : ''}`}
                      value={personalForm.department}
                      onChange={handlePersonalChange}
                    />
                    {errors.department && <span className="form-error-msg">{errors.department}</span>}
                  </div>

                  <div className="input-field-group info-field-full">
                    <label className="field-label" htmlFor="jobTitle">
                      Job Title <span className="field-required">*</span>
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      className={`form-input ${errors.jobTitle ? 'form-input-error' : ''}`}
                      value={personalForm.jobTitle}
                      onChange={handlePersonalChange}
                    />
                    {errors.jobTitle && <span className="form-error-msg">{errors.jobTitle}</span>}
                  </div>
                </div>

                <div className="card-actions-bar">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={handleCancelEditing}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display-grid">
                <div className="info-field-item">
                  <label className="info-label">Full Name</label>
                  <div className="info-value">{profile.fullName}</div>
                </div>
                <div className="info-field-item">
                  <label className="info-label">Email Address</label>
                  <div className="info-value">{profile.email}</div>
                </div>
                <div className="info-field-item">
                  <label className="info-label">Phone Number</label>
                  <div className="info-value">{profile.phone}</div>
                </div>
                <div className="info-field-item">
                  <label className="info-label">Department</label>
                  <div className="info-value">{profile.department}</div>
                </div>
                <div className="info-field-item info-field-full">
                  <label className="info-label">Job Title</label>
                  <div className="info-value">{profile.jobTitle}</div>
                </div>
              </div>
            )}
          </section>

          <section className="profile-card account-info-card">
            <div className="card-header-bar">
              <div className="card-title-group">
                <div className="card-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Account Information</h3>
                  <p className="card-subtitle">System credentials and access rights</p>
                </div>
              </div>
            </div>

            <div className="account-details-list">
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">Account Role</span>
                  <span className="role-tag-gold">{profile.role}</span>
                </div>
              </div>
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">Account Status</span>
                  <span className="status-badge status-badge-active">
                    <span className="status-dot"></span>
                    {profile.status}
                  </span>
                </div>
              </div>
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">Admin Identifier</span>
                  <span className="detail-code">{profile.adminId}</span>
                </div>
              </div>
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">Account Creation Date</span>
                  <span className="detail-value">{profile.accountCreated}</span>
                </div>
              </div>
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">Last System Access</span>
                  <span className="detail-value">{profile.lastLogin}</span>
                </div>
              </div>
              <div className="account-detail-item">
                <div className="detail-meta">
                  <span className="detail-key">System Scope</span>
                  <span className="detail-value">{profile.accessScope}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
