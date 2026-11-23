import React, { useState, useEffect, useRef } from 'react';
import { validateEmail, validatePassword } from '../../utils/validation';
import sciBuildingImg from '../../assets/SCI-CU.jpg';
import './Login.css';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(161);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setMousePos({ x: normX, y: normY });

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let newErrors = { ...errors };

    if (field === 'email') {
      const emailResult = validateEmail(email);
      if (!emailResult.isValid) {
        newErrors.email = emailResult.error;
      } else {
        delete newErrors.email;
        if (!emailResult.isAcademic && email.length > 0) {
          newErrors.emailWarning = 'Tip: Using your official university email (@science.cu.edu.eg) is recommended.';
        } else {
          delete newErrors.emailWarning;
        }
      }
    }

    if (field === 'password') {
      const passResult = validatePassword(password);
      if (!passResult.isValid) {
        newErrors.password = passResult.error;
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailResult = validateEmail(email);
    const passResult = validatePassword(password);

    const validationErrors = {};
    if (!emailResult.isValid) validationErrors.email = emailResult.error;
    if (!passResult.isValid) validationErrors.password = passResult.error;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setLoginFeedback(null);

    setTimeout(() => {
      setIsLoading(false);
      setLoginFeedback({
        type: 'success',
        message: `Welcome back, ${email.split('@')[0]}! Signed in successfully. Loading your portal...`,
      });
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess({
            email,
            role: email.toLowerCase().includes('instructor') ? 'instructor' : 'student',
          });
        }, 900);
      }
    }, 1200);
  };

  const handleQuickFill = (role) => {
    if (role === 'student') {
      setEmail('mohamed.ahmed@science.cu.edu.eg');
      setPassword('Student#2026');
    } else {
      setEmail('dr.instructor@science.cu.edu.eg');
      setPassword('Faculty#2026');
    }
    setErrors({});
    setTouched({ email: true, password: true });
  };

  return (
    <div
      className="unitrack-auth-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="ambient-spotlight" />

      <div
        className="parallax-particle particle-1"
        style={{
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
        }}
      />
      <div
        className="parallax-particle particle-2"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      />

      <div className="unitrack-auth-card">
        <section
          className="auth-hero-pane"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 2.5}deg) rotateX(${mousePos.y * -2.5
              }deg)`,
          }}
        >
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(${sciBuildingImg})`,
              transform: `scale(1.04) translate(${mousePos.x * -6}px, ${mousePos.y * -6
                }px)`,
            }}
          />
          <div className="hero-overlay" />

          <div className="hero-brand">
            <div className="brand-logo-icon">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="24" height="24" rx="7" stroke="#F6ECE1" strokeWidth="2.2" />
                <path d="M7 10L14 6L21 10V15C21 19.5 17.5 22.5 14 23.5C10.5 22.5 7 19.5 7 15V10Z" fill="#F6ECE1" fillOpacity="0.2" stroke="#F6ECE1" strokeWidth="1.8" />
                <circle cx="14" cy="14" r="2.8" fill="#F6ECE1" />
              </svg>
            </div>
            <div className="brand-text-group">
              <span className="brand-title">UniTrack</span>
              <span className="brand-subtitle">SMART ATTENDANCE &amp; DIGITAL ID</span>
            </div>
          </div>

          <div className="hero-content">
            <span className="hero-faculty-tag">
              FACULTY OF SCIENCE &bull; 100 YEARS
            </span>
            <h1 className="hero-heading">
              Attendance,
              <br />
              without the paper.
            </h1>

            <div
              className="live-session-card"
              style={{
                transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12
                  }px) perspective(600px) rotateY(${mousePos.x * 4}deg) rotateX(${mousePos.y * -4
                  }deg)`,
              }}
            >
              <div className="live-info">
                <div className="live-pill">
                  <span className="live-dot" />
                  LIVE SESSION
                </div>
                <h3 className="course-name">CS 301 &bull; Web Basics</h3>
                <p className="timer-text">
                  Code expires in <span className="timer-value">{formatCountdown(secondsLeft)}</span>
                </p>
              </div>

              <div className="qr-container">
                <svg className="qr-svg" viewBox="0 0 64 64" fill="currentColor">
                  <rect x="4" y="4" width="18" height="18" rx="2" fill="none" stroke="#2D1117" strokeWidth="3" />
                  <rect x="9" y="9" width="8" height="8" rx="1" fill="#2D1117" />
                  <rect x="42" y="4" width="18" height="18" rx="2" fill="none" stroke="#2D1117" strokeWidth="3" />
                  <rect x="47" y="9" width="8" height="8" rx="1" fill="#2D1117" />
                  <rect x="4" y="42" width="18" height="18" rx="2" fill="none" stroke="#2D1117" strokeWidth="3" />
                  <rect x="9" y="47" width="8" height="8" rx="1" fill="#2D1117" />
                  <rect x="28" y="6" width="6" height="6" rx="1" fill="#2D1117" />
                  <rect x="36" y="16" width="4" height="4" rx="1" fill="#2D1117" />
                  <rect x="6" y="28" width="5" height="5" rx="1" fill="#2D1117" />
                  <rect x="16" y="32" width="6" height="4" rx="1" fill="#2D1117" />
                  <rect x="26" y="26" width="12" height="12" rx="2" fill="#5B1B29" />
                  <rect x="42" y="28" width="6" height="8" rx="1" fill="#2D1117" />
                  <rect x="52" y="32" width="6" height="6" rx="1" fill="#2D1117" />
                  <rect x="28" y="44" width="8" height="4" rx="1" fill="#2D1117" />
                  <rect x="40" y="44" width="6" height="14" rx="1" fill="#2D1117" />
                  <rect x="50" y="52" width="8" height="6" rx="1" fill="#2D1117" />
                  <rect x="30" y="52" width="6" height="6" rx="1" fill="#2D1117" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-pane">
          <div className="form-top-bar">
            <span className="switch-prompt">New to UniTrack?</span>
            <button
              type="button"
              className="switch-action-btn"
              onClick={() => {
                if (onNavigateToRegister) {
                  onNavigateToRegister();
                } else {
                  alert('Register Page is scheduled for Milestone 1 / Teammate onboarding. Ready to link!');
                }
              }}
            >
              Create account
            </button>
          </div>

          <div className="form-body">
            <div className="form-header">
              <span className="welcome-tag">&mdash;&mdash; WELCOME BACK</span>
              <h2 className="form-title">Sign in to your account</h2>
              <p className="form-subtitle">
                Use your university email to check in to lectures, see your attendance history, and open your digital ID.
              </p>
            </div>

            <div className="demo-credentials-box">
              <span className="demo-label">Quick Test:</span>
              <button
                type="button"
                className="demo-pill"
                onClick={() => handleQuickFill('student')}
              >
                Student
              </button>
              <button
                type="button"
                className="demo-pill"
                onClick={() => handleQuickFill('instructor')}
              >
                Instructor
              </button>
            </div>

            {loginFeedback && (
              <div className={`feedback-alert ${loginFeedback.type}`}>
                <span className="feedback-icon">
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </span>
                <span>{loginFeedback.message}</span>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className={`input-field-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="university-email" className="field-label">
                  UNIVERSITY EMAIL
                </label>
                <div className="input-control-wrapper">
                  <input
                    id="university-email"
                    type="email"
                    placeholder="you@university.edu"
                    className="text-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) validateField('email');
                    }}
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

              <div className={`input-field-group ${errors.password ? 'has-error' : ''}`}>
                <label htmlFor="user-password" className="field-label">
                  PASSWORD
                </label>
                <div className="input-control-wrapper">
                  <input
                    id="user-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="text-input"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) validateField('password');
                    }}
                    onBlur={() => handleBlur('password')}
                    autoComplete="current-password"
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

              <div className="form-extras-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-text">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={() => {
                    setForgotModalOpen(true);
                    setForgotEmail(email);
                    setForgotSubmitted(false);
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-wrapper">
                    <span className="button-spinner" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <span className="submit-arrow">&rarr;</span>
                  </>
                )}
              </button>

              <div className="or-divider">
                <span className="divider-line" />
                <span className="divider-label">OR CONTINUE WITH</span>
                <span className="divider-line" />
              </div>

              <div className="sso-buttons-group">
                <button
                  type="button"
                  className="sso-btn google-sso"
                  onClick={() => alert('Redirecting to Google University OAuth portal...')}
                >
                  <svg className="sso-icon" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="sso-btn microsoft-sso"
                  onClick={() => alert('Redirecting to Microsoft Azure AD university login...')}
                >
                  <svg className="sso-icon" viewBox="0 0 24 24">
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                  </svg>
                  <span>Microsoft</span>
                </button>
              </div>
            </form>
          </div>

          <footer className="form-footer-note">
            Instructors, students, and staff sign in here.
          </footer>
        </section>
      </div>

      {forgotModalOpen && (
        <div className="modal-backdrop" onClick={() => setForgotModalOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Your Password</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setForgotModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              {forgotSubmitted ? (
                <div className="forgot-success">
                  <div className="success-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4>Password reset email sent</h4>
                  <p>
                    We sent a secure password reset link to <strong>{forgotEmail}</strong>. Please check your university inbox.
                  </p>
                  <button
                    type="button"
                    className="submit-button"
                    style={{ marginTop: '1.25rem' }}
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  <p className="modal-instructions">
                    Enter your university email address and we will send you a verification link to reset your account credentials.
                  </p>
                  <div className="input-field-group" style={{ marginTop: '1rem' }}>
                    <label className="field-label">UNIVERSITY EMAIL</label>
                    <input
                      type="email"
                      className="text-input"
                      placeholder="you@university.edu"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="modal-cancel-btn"
                      onClick={() => setForgotModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="submit-button"
                      onClick={() => {
                        if (!forgotEmail) {
                          alert('Please enter your university email first.');
                          return;
                        }
                        setForgotSubmitted(true);
                      }}
                    >
                      Send Reset Link &rarr;
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
