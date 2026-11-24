import React, { useState, useRef } from 'react';
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

function getInitials(name) {
  if (!name || typeof name !== 'string') return 'A';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'A';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

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
  const [toast, setToast] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewFileName, setPreviewFileName] = useState('');
  const fileInputRef = useRef(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validatePersonalForm = () => {
    const errs = {};
    const trimmedName = (personalForm.fullName || '').trim();
    const trimmedEmail = (personalForm.email || '').trim();
    const trimmedPhone = (personalForm.phone || '').trim();
    const trimmedDept = (personalForm.department || '').trim();
    const trimmedJob = (personalForm.jobTitle || '').trim();

    if (!trimmedName) {
      errs.fullName = 'Full name is required.';
    } else if (trimmedName.length < 3) {
      errs.fullName = 'Full name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email format (e.g. user@university.edu).';
    }

    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      errs.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(trimmedPhone) || phoneDigits.length < 8) {
      errs.phone = 'Please enter a valid international phone number (e.g. +20 100 234 5678).';
    }

    if (!trimmedDept) {
      errs.department = 'Department is required.';
    } else if (trimmedDept.length < 2) {
      errs.department = 'Department must be at least 2 characters.';
    }

    if (!trimmedJob) {
      errs.jobTitle = 'Job title is required.';
    } else if (trimmedJob.length < 2) {
      errs.jobTitle = 'Job title must be at least 2 characters.';
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
    setToast({ type: 'success', message: 'Personal information updated successfully.' });
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const hasValidExtension = /\.(png|jpe?g|webp)$/i.test(file.name || '');

    if (!allowedTypes.includes(file.type.toLowerCase()) && !hasValidExtension) {
      setToast({ type: 'error', message: 'Invalid file format. Please upload a PNG, JPG, or WEBP image.' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setToast({ type: 'error', message: 'Image size exceeds the 5MB maximum limit. Please choose a smaller file.' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setPreviewFileName(file.name);
    };
    reader.onerror = () => {
      setToast({ type: 'error', message: 'An error occurred while loading the image. Please try again.' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleApplyImage = () => {
    if (!previewImage) return;
    setProfile((prev) => ({ ...prev, profilePicture: previewImage }));
    setPreviewImage(null);
    setPreviewFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setToast({ type: 'success', message: 'Profile picture updated successfully.' });
  };

  const handleCancelImage = () => {
    setPreviewImage(null);
    setPreviewFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = () => {
    setProfile((prev) => ({ ...prev, profilePicture: '' }));
    setPreviewImage(null);
    setPreviewFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setToast({ type: 'success', message: 'Profile picture removed.' });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const pErrs = {};

    if (!passwordForm.currentPassword) {
      pErrs.currentPassword = 'Current password is required.';
    }

    if (!passwordForm.newPassword) {
      pErrs.newPassword = 'New password is required.';
    } else if (passwordForm.newPassword.length < 6) {
      pErrs.newPassword = 'New password must be at least 6 characters.';
    } else if (!/[A-Z]/.test(passwordForm.newPassword)) {
      pErrs.newPassword = 'New password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(passwordForm.newPassword)) {
      pErrs.newPassword = 'New password must contain at least one number.';
    } else if (!/[^A-Za-z0-9]/.test(passwordForm.newPassword)) {
      pErrs.newPassword = 'New password must contain at least one special character.';
    } else if (passwordForm.currentPassword && passwordForm.newPassword === passwordForm.currentPassword) {
      pErrs.newPassword = 'New password must be different from current password.';
    }

    if (!passwordForm.confirmPassword) {
      pErrs.confirmPassword = 'Confirmation password is required.';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      pErrs.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(pErrs).length > 0) {
      setPasswordErrors(pErrs);
      return;
    }

    setPasswordErrors({});
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    setToast({
      type: 'info',
      message: 'Demo Mode: Password validated successfully. Backend service is currently in mock/disconnected state; credentials are not permanently committed to database.'
    });
  };

  const handleCancelPassword = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
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
        {toast && (
          <div className={`toast-banner toast-banner-${toast.type}`}>
            <div className="toast-content">
              {toast.type === 'success' && (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setToast(null)}
            >
              &times;
            </button>
          </div>
        )}

        <section className="profile-header-card">
          <div className="profile-header-left">
            <div className="avatar-container">
              <div className="profile-avatar-wrapper">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt={profile.fullName} className="profile-avatar-img" />
                ) : (
                  <div className="profile-avatar-fallback">
                    <span>{getInitials(profile.fullName)}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="avatar-upload-btn"
                title="Upload Profile Picture"
                onClick={handleTriggerUpload}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="file-input-hidden"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageSelect}
              />
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleTriggerUpload}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Upload Picture</span>
            </button>
            {profile.profilePicture && (
              <button
                type="button"
                className="btn btn-cancel"
                onClick={handleRemoveImage}
              >
                Remove
              </button>
            )}
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

          {previewImage && (
            <div className="photo-preview-card">
              <div className="photo-preview-details">
                <div className="preview-thumb-box">
                  <img src={previewImage} alt="Preview" className="preview-thumb-img" />
                </div>
                <div>
                  <h4 className="preview-meta-title">New Profile Picture Selected</h4>
                  <p className="preview-meta-desc">{previewFileName || 'Image preview'} &bull; Ready to save</p>
                </div>
              </div>
              <div className="photo-preview-actions">
                <button
                  type="button"
                  className="btn btn-cancel btn-sm"
                  onClick={handleCancelImage}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleApplyImage}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Apply Picture</span>
                </button>
              </div>
            </div>
          )}
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

          <section className="profile-card security-card-full">
            <div className="card-header-bar">
              <div className="card-title-group">
                <div className="card-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Security & Password</h3>
                  <p className="card-subtitle">Update your system access credentials and security settings</p>
                </div>
              </div>
            </div>

            <div className="security-info-box">
              <svg className="security-info-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Passwords must be at least 6 characters and contain at least one uppercase letter, one number, and one special character.</span>
            </div>

            <form onSubmit={handleSavePassword} noValidate>
              <div className="form-inputs-grid">
                <div className="input-field-group">
                  <label className="field-label" htmlFor="currentPassword">
                    Current Password <span className="field-required">*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      className={`form-input ${passwordErrors.currentPassword ? 'form-input-error' : ''}`}
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => togglePasswordVisibility('current')}
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.current ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <span className="form-error-msg">{passwordErrors.currentPassword}</span>
                  )}
                </div>

                <div className="input-field-group">
                  <label className="field-label" htmlFor="newPassword">
                    New Password <span className="field-required">*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      className={`form-input ${passwordErrors.newPassword ? 'form-input-error' : ''}`}
                      placeholder="Enter new password (min. 6 characters)"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => togglePasswordVisibility('new')}
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.new ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <span className="form-error-msg">{passwordErrors.newPassword}</span>
                  )}
                </div>

                <div className="input-field-group info-field-full">
                  <label className="field-label" htmlFor="confirmPassword">
                    Confirm New Password <span className="field-required">*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      className={`form-input ${passwordErrors.confirmPassword ? 'form-input-error' : ''}`}
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => togglePasswordVisibility('confirm')}
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.confirm ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <span className="form-error-msg">{passwordErrors.confirmPassword}</span>
                  )}
                </div>
              </div>

              <div className="card-actions-bar">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={handleCancelPassword}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Save Password</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
