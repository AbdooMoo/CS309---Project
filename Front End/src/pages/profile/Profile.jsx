import React, { useState } from 'react';
import './Profile.css';

const COURSES_DATA = [
  {
    code: 'CS309',
    name: 'Web Development',
    attendance: 50,
    totalLectures: 10,
    attended: 5
  },
  {
    code: 'CS301',
    name: 'Data Structures',
    attendance: 80,
    totalLectures: 15,
    attended: 12
  },
  {
    code: 'CS305',
    name: 'Database Systems',
    attendance: 70,
    totalLectures: 10,
    attended: 7
  },
  {
    code: 'CS310',
    name: 'Operating Systems',
    attendance: 90,
    totalLectures: 20,
    attended: 18
  }
];

export default function Profile({ onNavigateHome }) {
  const [activeNav, setActiveNav] = useState('courses');
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setPhotoPreview(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <header className="profile-navbar">
        <div className="profile-nav-container">
          <div className="profile-brand-group">
            <div className="profile-brand-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="profile-brand-titles">
              <span className="profile-brand-name">UniTrack</span>
              <span className="profile-brand-sub">Cairo University &bull; Faculty of Science</span>
            </div>
          </div>

          <nav>
            <ul className="profile-nav-menu">
              <li>
                <button
                  type="button"
                  className={`profile-nav-link ${activeNav === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav('home');
                    if (onNavigateHome) onNavigateHome();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="nav-text">Home</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`profile-nav-link ${activeNav === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveNav('courses')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    <line x1="9" y1="7" x2="15" y2="7"></line>
                    <line x1="9" y1="11" x2="15" y2="11"></line>
                  </svg>
                  <span className="nav-text">My Courses</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`profile-nav-link ${activeNav === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveNav('profile')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="nav-text">Profile</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="profile-main-wrapper">
        <section className="profile-main-card">
          <div className="profile-top-band">
            <div className="profile-top-left">
              <div className="photo-wrapper">
                <label className="photo-placeholder" htmlFor="profileFileInput">
                  <input
                    type="file"
                    id="profileFileInput"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {photoPreview ? (
                    <img src={photoPreview} alt="Student Profile" className="photo-preview" />
                  ) : (
                    <div className="photo-content">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2d1117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span className="photo-label">Add Photo</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="identity-block">
                <span className="faculty-tag">Faculty of Science &bull; Cairo University</span>
                <h1 className="student-name">Sarah Ahmed</h1>
                <p className="student-subtitle">Computer Science Student &bull; Level 3 (Class of 2026)</p>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <div className="info-icon-square">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Student ID</span>
                <span className="info-value">20210145</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-square">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">University Email</span>
                <span className="info-value">s.ahmed@science.cu.edu.eg</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-square">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16"></path>
                  <path d="M2 11h20"></path>
                  <path d="M12 2 2 7h20L12 2z"></path>
                  <path d="M6 11v11"></path>
                  <path d="M10 11v11"></path>
                  <path d="M14 11v11"></path>
                  <path d="M18 11v11"></path>
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Faculty</span>
                <span className="info-value">Faculty of Science</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-square">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Department</span>
                <span className="info-value">Computer Science</span>
              </div>
            </div>
          </div>

          <div className="digital-id-strip">
            <div className="qr-container">
              <svg className="qr-svg" viewBox="0 0 25 25" shape-rendering="crispEdges">
                <rect x="0" y="0" width="7" height="7" fill="#2d1117" />
                <rect x="1" y="1" width="5" height="5" fill="#FFFFFF" />
                <rect x="2" y="2" width="3" height="3" fill="#2d1117" />

                <rect x="18" y="0" width="7" height="7" fill="#2d1117" />
                <rect x="19" y="1" width="5" height="5" fill="#FFFFFF" />
                <rect x="20" y="2" width="3" height="3" fill="#2d1117" />

                <rect x="0" y="18" width="7" height="7" fill="#2d1117" />
                <rect x="1" y="19" width="5" height="5" fill="#FFFFFF" />
                <rect x="2" y="20" width="3" height="3" fill="#2d1117" />

                <rect x="8" y="6" width="1" height="1" fill="#2d1117" />
                <rect x="10" y="6" width="1" height="1" fill="#2d1117" />
                <rect x="12" y="6" width="1" height="1" fill="#2d1117" />
                <rect x="14" y="6" width="1" height="1" fill="#2d1117" />
                <rect x="16" y="6" width="1" height="1" fill="#2d1117" />

                <rect x="6" y="8" width="1" height="1" fill="#2d1117" />
                <rect x="6" y="10" width="1" height="1" fill="#2d1117" />
                <rect x="6" y="12" width="1" height="1" fill="#2d1117" />
                <rect x="6" y="14" width="1" height="1" fill="#2d1117" />
                <rect x="6" y="16" width="1" height="1" fill="#2d1117" />

                <path fill="#2d1117" d="M8,1h1v1h-1z M10,1h2v1h-2z M13,1h1v1h-1z M15,1h2v1h-2z M8,3h2v1h-2z M12,3h1v1h-1z M14,3h2v1h-2z M9,4h3v1h-3z M13,4h1v1h-1z M15,4h1v1h-1z M8,8h2v2h-2z M11,8h1v1h-1z M13,8h2v1h-2z M16,8h1v2h-1z M19,8h2v1h-2z M22,8h2v1h-2z M8,10h1v1h-1z M10,10h2v1h-2z M13,10h1v2h-1z M17,10h2v1h-2z M21,10h1v1h-1z M23,10h1v1h-1z M9,12h2v1h-2z M12,12h2v1h-2z M16,12h1v1h-1z M18,12h2v2h-2z M21,12h3v1h-3z M8,14h1v2h-1z M10,14h2v1h-2z M13,14h1v1h-1z M15,14h2v1h-2z M22,14h2v1h-2z M9,16h3v1h-3z M14,16h2v1h-2z M18,16h1v1h-1z M20,16h2v2h-2z M23,16h1v1h-1z M8,18h2v1h-2z M11,18h1v2h-1z M14,18h1v1h-1z M17,18h2v1h-2z M21,18h1v1h-1z M8,20h1v1h-1z M10,20h2v1h-2z M13,20h2v1h-2z M17,20h1v2h-1z M19,20h2v1h-2z M23,20h1v2h-1z M9,22h1v2h-1z M11,22h3v1h-3z M15,22h1v1h-1z M18,22h2v1h-2z M21,22h2v1h-2z M10,24h2v1h-2z M13,24h1v1h-1z M16,24h3v1h-3z M20,24h1v1h-1z M23,24h1v1h-1z" />
              </svg>
            </div>
            <div className="digital-id-content">
              <span className="digital-id-tag">Official University Digital ID</span>
              <h2 className="digital-id-title">Digital Student ID Card</h2>
              <p className="digital-id-desc">Scan this dynamic encrypted QR code at Cairo University campus gates or inside lecture halls to register attendance instantly.</p>
            </div>
          </div>
        </section>

        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">My Courses & Attendance</h2>
            <div className="section-divider"></div>
          </div>
          <span className="semester-badge">Spring Semester 2026</span>
        </div>

        <section className="courses-grid">
          {COURSES_DATA.map((course) => (
            <article key={course.code} className="course-card">
              <header className="course-header">
                <div className="course-identity">
                  <span className="course-code">{course.code}</span>
                  <span className="course-name">{course.name}</span>
                </div>
                <span className="attendance-pill">{course.attendance}%</span>
              </header>
              <div className="course-body">
                <div className="progress-header">
                  <span className="progress-label">Semester Attendance Rate</span>
                  <span className="progress-ratio">{course.attended} / {course.totalLectures} Lectures</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.attendance}%` }}
                  ></div>
                </div>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-label">Total Lectures</span>
                    <span className="stat-value">{course.totalLectures}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Attended</span>
                    <span className="stat-value">{course.attended}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
