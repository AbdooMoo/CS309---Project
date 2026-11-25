import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/validation';
import sciBuildingImg from '../../assets/SCI-CU.jpg';
import './Register.css';

const DEPARTMENT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Geology',
  'Computer Science',
  'Botany',
  'Zoology',
];

const ACADEMIC_YEAR_OPTIONS = [
  '1st Year (Freshman)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Senior)',
  'Postgraduate (Master\'s / PhD)',
  'Department Staff / Teaching Assistant',
];

export default function Register({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    universityId: '',
    department: '',
    academicYear: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (touched[name]) {
      validateSingleField(name, fieldValue);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateSingleField(fieldName, formData[fieldName]);
  };

  const validateSingleField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value || !value.trim()) {
          newErrors.fullName = 'Full name is required.';
        } else if (value.trim().length < 3) {
          newErrors.fullName = 'Name must be at least 3 characters long.';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'email': {
        const emailResult = validateEmail(value);
        if (!emailResult.isValid) {
          newErrors.email = emailResult.error;
          delete newErrors.emailWarning;
        } else {
          delete newErrors.email;
          if (!emailResult.isAcademic && value.length > 0) {
            newErrors.emailWarning = 'Tip: Using your official university email (@science.cu.edu.eg) is recommended.';
          } else {
            delete newErrors.emailWarning;
          }
        }
        break;
      }

      case 'universityId':
        if (!value || !value.trim()) {
          newErrors.universityId = 'University ID is required.';
        } else if (value.trim().length < 4) {
          newErrors.universityId = 'University ID must be at least 4 characters.';
        } else {
          delete newErrors.universityId;
        }
        break;

      case 'department':
        if (!value) {
          newErrors.department = 'Please select your department.';
        } else {
          delete newErrors.department;
        }
        break;

      case 'academicYear':
        if (!value) {
          newErrors.academicYear = 'Please select your academic year.';
        } else {
          delete newErrors.academicYear;
        }
        break;

      case 'password': {
        const passResult = validatePassword(value);
        if (!passResult.isValid) {
          newErrors.password = passResult.error;
        } else {
          delete newErrors.password;
        }

        if (formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;
      }

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password.';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'agreeTerms':
        if (!value) {
          newErrors.agreeTerms = 'You must agree to the Terms & Conditions.';
        } else {
          delete newErrors.agreeTerms;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const validateAll = () => {
    const allTouched = {
      fullName: true,
      email: true,
      universityId: true,
      department: true,
      academicYear: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    };
    setTouched(allTouched);

    const newErrors = {};

    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long.';
    }

    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      newErrors.email = emailResult.error;
    } else if (!emailResult.isAcademic && formData.email.length > 0) {
      newErrors.emailWarning = 'Tip: Using your official university email (@science.cu.edu.eg) is recommended.';
    }

    if (!formData.universityId || !formData.universityId.trim()) {
      newErrors.universityId = 'University ID is required.';
    } else if (formData.universityId.trim().length < 4) {
      newErrors.universityId = 'University ID must be at least 4 characters.';
    }

    if (!formData.department) {
      newErrors.department = 'Please select your department.';
    }

    if (!formData.academicYear) {
      newErrors.academicYear = 'Please select your academic year.';
    }

    const passResult = validatePassword(formData.password);
    if (!passResult.isValid) {
      newErrors.password = passResult.error;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter((k) => k !== 'emailWarning').length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    setTimeout(() => {
      setIsLoading(false);
      setFeedback({
        type: 'success',
        message: `Account created successfully for ${formData.fullName}! You can now sign in.`,
      });

      if (onNavigateToLogin) {
        setTimeout(() => {
          onNavigateToLogin();
        }, 1800);
      }
    }, 1200);
  };

  return (
    <div className="unitrack-register-wrapper">
      <div className="unitrack-register-card">
        <section className="register-hero-pane">
          <div
            className="register-hero-background"
            style={{ backgroundImage: `url(${sciBuildingImg})` }}
          />
          <div className="register-hero-overlay" />

          <div className="register-brand">
            <div className="register-brand-logo-icon">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="24" height="24" rx="7" stroke="#F6ECE1" strokeWidth="2.2" />
                <path
                  d="M7 10L14 6L21 10V15C21 19.5 17.5 22.5 14 23.5C10.5 22.5 7 19.5 7 15V10Z"
                  fill="#F6ECE1"
                  fillOpacity="0.2"
                  stroke="#F6ECE1"
                  strokeWidth="1.8"
                />
                <circle cx="14" cy="14" r="2.8" fill="#F6ECE1" />
              </svg>
            </div>
            <div className="register-brand-text-group">
              <span className="register-brand-title">UniTrack</span>
              <span className="register-brand-subtitle">SMART ATTENDANCE &amp; DIGITAL ID</span>
            </div>
          </div>

          <div className="register-hero-content">
            <span className="register-faculty-tag">
              FACULTY OF SCIENCE &bull; CAIRO UNIVERSITY
            </span>
            <h1 className="register-hero-heading">
              Smart attendance,
              <br />
              simplified for you.
            </h1>
            <p className="register-hero-description">
              Create your verified student or staff profile to attend lectures, track attendance records, and manage your digital campus ID seamlessly across Science departments.
            </p>

            <div className="register-feature-list">
              <div className="register-feature-item">
                <span className="feature-check-icon">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </span>
                <span>Fast QR &amp; BLE classroom check-in</span>
              </div>
              <div className="register-feature-item">
                <span className="feature-check-icon">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </span>
                <span>Real-time absence notifications &amp; alerts</span>
              </div>
              <div className="register-feature-item">
                <span className="feature-check-icon">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </span>
                <span>Official student &amp; staff digital ID card</span>
              </div>
            </div>
          </div>

          <footer className="register-hero-footer">
            &copy; {new Date().getFullYear()} UniTrack Smart Attendance System. All rights reserved.
          </footer>
        </section>

        <section className="register-form-pane">
          <div className="register-top-bar">
            <span className="switch-prompt">Already have an account?</span>
            <button
              type="button"
              className="switch-action-btn"
              onClick={() => {
                if (onNavigateToLogin) {
                  onNavigateToLogin();
                } else {
                  window.location.href = '#login';
                }
              }}
            >
              Sign in
            </button>
          </div>

          <div className="register-form-body">
            <div className="register-form-header">
              <span className="register-welcome-tag">&mdash;&mdash; GET STARTED</span>
              <h2 className="register-form-title">Create your account</h2>
              <p className="register-form-subtitle">
                Enter your academic details below to create your Faculty of Science profile.
              </p>
            </div>

            {feedback && (
              <div className={`feedback-alert ${feedback.type}`}>
                <span className="feedback-icon">
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </span>
                <span>{feedback.message}</span>
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit} noValidate>
              <div className={`input-field-group ${errors.fullName ? 'has-error' : ''}`}>
                <label htmlFor="reg-fullname" className="field-label">
                  FULL NAME
                </label>
                <div className="input-control-wrapper">
                  <input
                    id="reg-fullname"
                    name="fullName"
                    type="text"
                    placeholder="e.g. Mohamed Ahmed Ali"
                    className="text-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('fullName')}
                    autoComplete="name"
                  />
                  <span className="input-adornment">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                </div>
                {errors.fullName && (
                  <span className="error-message" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className={`input-field-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="reg-email" className="field-label">
                  UNIVERSITY EMAIL
                </label>
                <div className="input-control-wrapper">
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="you@science.cu.edu.eg"
                    className="text-input"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    autoComplete="email"
                  />
                  <span className="input-adornment">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                </div>
                {errors.email && (
                  <span className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
                {errors.emailWarning && !errors.email && (
                  <span className="warning-message">
                    {errors.emailWarning}
                  </span>
                )}
              </div>

              <div className={`input-field-group ${errors.universityId ? 'has-error' : ''}`}>
                <label htmlFor="reg-university-id" className="field-label">
                  UNIVERSITY ID
                </label>
                <div className="input-control-wrapper">
                  <input
                    id="reg-university-id"
                    name="universityId"
                    type="text"
                    placeholder="e.g. 202401892"
                    className="text-input"
                    value={formData.universityId}
                    onChange={handleChange}
                    onBlur={() => handleBlur('universityId')}
                  />
                  <span className="input-adornment">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="7" y1="8" x2="11" y2="8" />
                      <line x1="7" y1="12" x2="17" y2="12" />
                      <line x1="7" y1="16" x2="14" y2="16" />
                    </svg>
                  </span>
                </div>
                {errors.universityId && (
                  <span className="error-message" role="alert">
                    {errors.universityId}
                  </span>
                )}
              </div>

              <div className="form-grid-row">
                <div className={`input-field-group ${errors.department ? 'has-error' : ''}`}>
                  <label htmlFor="reg-department" className="field-label">
                    DEPARTMENT
                  </label>
                  <div className="input-control-wrapper">
                    <select
                      id="reg-department"
                      name="department"
                      className="select-input"
                      value={formData.department}
                      onChange={handleChange}
                      onBlur={() => handleBlur('department')}
                    >
                      <option value="">Select Department...</option>
                      {DEPARTMENT_OPTIONS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.department && (
                    <span className="error-message" role="alert">
                      {errors.department}
                    </span>
                  )}
                </div>

                <div className={`input-field-group ${errors.academicYear ? 'has-error' : ''}`}>
                  <label htmlFor="reg-academic-year" className="field-label">
                    ACADEMIC YEAR
                  </label>
                  <div className="input-control-wrapper">
                    <select
                      id="reg-academic-year"
                      name="academicYear"
                      className="select-input"
                      value={formData.academicYear}
                      onChange={handleChange}
                      onBlur={() => handleBlur('academicYear')}
                    >
                      <option value="">Select Year...</option>
                      {ACADEMIC_YEAR_OPTIONS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.academicYear && (
                    <span className="error-message" role="alert">
                      {errors.academicYear}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid-row">
                <div className={`input-field-group ${errors.password ? 'has-error' : ''}`}>
                  <label htmlFor="reg-password" className="field-label">
                    PASSWORD
                  </label>
                  <div className="input-control-wrapper">
                    <input
                      id="reg-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min 6 characters"
                      className="text-input"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message" role="alert">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className={`input-field-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <label htmlFor="reg-confirm-password" className="field-label">
                    CONFIRM PASSWORD
                  </label>
                  <div className="input-control-wrapper">
                    <input
                      id="reg-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat password"
                      className="text-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur('confirmPassword')}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message" role="alert">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className={`terms-row ${errors.agreeTerms ? 'has-error' : ''}`}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="custom-checkbox"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" className="terms-link" onClick={(e) => e.preventDefault()}>
                      Terms &amp; Conditions
                    </a>{' '}
                    and University Code of Conduct.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="error-message" role="alert">
                    {errors.agreeTerms}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-wrapper">
                    <span className="button-spinner" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="submit-arrow">&rarr;</span>
                  </>
                )}
              </button>
            </form>

            <p className="register-bottom-prompt">
              Already have an account?{' '}
              <button
                type="button"
                className="switch-action-btn"
                onClick={() => {
                  if (onNavigateToLogin) {
                    onNavigateToLogin();
                  } else {
                    window.location.href = '#login';
                  }
                }}
              >
                Sign in
              </button>
            </p>
          </div>

          <footer className="form-footer-note">
            New students, researchers, and academic staff register here.
          </footer>
        </section>
      </div>
    </div>
  );
}
