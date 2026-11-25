import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Fingerprint,
  GraduationCap,
  LockKeyhole,
  Menu,
  QrCode,
  ScanLine,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import './landingpage.css';

const courses = [
  { id: 'cs301', code: 'CS 301', name: 'Web Basics', sessions: 24, rate: '94%' },
  { id: 'cs305', code: 'CS 305', name: 'Data Structures', sessions: 18, rate: '91%' },
  { id: 'cs307', code: 'CS 307', name: 'Database Systems', sessions: 21, rate: '89%' },
];

const portals = [
  {
    title: 'Student portal',
    description: 'Check in with a QR code, review your attendance, and keep your digital student ID close.',
    link: '/student-dashboard',
    action: 'Go to Student Portal',
    icon: GraduationCap,
    tone: 'rose',
  },
  {
    title: 'Instructor portal',
    description: 'Start attendance windows, share expiring QR codes, and follow check-ins as they happen.',
    link: '/instructor-dashboard',
    action: 'Go to Instructor Portal',
    icon: ScanLine,
    tone: 'gold',
  },
  {
    title: 'Admin portal',
    description: 'See department-wide attendance insights, manage courses, and review audit activity.',
    link: '/admin-dashboard',
    action: 'Go to Admin Portal',
    icon: BarChart3,
    tone: 'sage',
  },
];

const features = [
  {
    title: 'Course & session management',
    description: 'Keep lectures, labs, and sections organized in one clear place.',
    icon: BookOpen,
  },
  {
    title: 'Time-limited QR check-in',
    description: 'Rotating attendance codes expire automatically to help prevent remote sharing.',
    icon: Clock3,
  },
  {
    title: 'Duplicate entry blocking',
    description: 'Smart validation makes sure every student checks in only once per session.',
    icon: Fingerprint,
  },
  {
    title: 'Attendance history & analytics',
    description: 'Follow participation in real time and export dependable attendance records.',
    icon: BarChart3,
  },
];

const reviews = [
  {
    quote: 'I was checked in before the lecture even started. No more passing a sheet down the row.',
    name: 'Mariam H.',
    course: 'Computer Science · Year 3',
  },
  {
    quote: 'The digital ID and attendance history make it so easy to keep track of every class.',
    name: 'Omar A.',
    course: 'Mathematics · Year 2',
  },
  {
    quote: 'Quick, simple, and I always know my attendance was actually recorded.',
    name: 'Salma R.',
    course: 'Physics · Year 4',
  },
];

function Brand({ light = false }) {
  return (
    <Link className={`brand${light ? ' brand-light' : ''}`} to="/" aria-label="UniTrack home">
      <span className="brand-mark"><QrCode size={21} strokeWidth={2.2} /></span>
      <span className="brand-copy">
        <strong>UniTrack</strong>
        <small>SMART ATTENDANCE &amp; DIGITAL ID</small>
      </span>
    </Link>
  );
}

function QrPattern() {
  const cells = [
    '11111010110111111',
    '10001001100100001',
    '10101011010101011',
    '10001000100100001',
    '11111010110111111',
    '00000011001000000',
    '10110100101101101',
    '01101111010010110',
    '11010001101101001',
    '00101110010110110',
    '11100101111001011',
    '00000010100111000',
    '11111001101011101',
    '10001011011000110',
    '10101000101110101',
    '10001011000101100',
    '11111001011010011',
  ];

  return (
    <svg className="qr-pattern" viewBox="0 0 17 17" role="img" aria-label="Sample attendance QR code">
      <rect width="17" height="17" fill="#fff" />
      {cells.flatMap((row, y) =>
        [...row].map((cell, x) => (cell === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null))
      )}
    </svg>
  );
}

function LandingPage() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [previewSeconds, setPreviewSeconds] = useState(15);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSeconds, setDemoSeconds] = useState(60);
  const [checkedIn, setCheckedIn] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPreviewSeconds((current) => (current <= 1 ? 15 : current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!demoOpen) return undefined;
    const timer = window.setInterval(() => {
      setDemoSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [demoOpen]);

  useEffect(() => {
    if (demoSeconds === 0) setDemoOpen(false);
  }, [demoSeconds]);

  const toggleCourse = (id) => {
    setSelectedCourses((current) =>
      current.includes(id) ? current.filter((courseId) => courseId !== id) : [...current, id]
    );
  };

  const startDemo = () => {
    setDemoSeconds(60);
    setCheckedIn(false);
    setShowDuplicate(false);
    setDemoOpen(true);
  };

  const formatTime = (seconds) => `00:${String(seconds).padStart(2, '0')}`;
  const reportState = { selectedCourses };

  return (
    <div className="landing-page">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav${mobileMenuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <a className="nav-report-link" href="#report-builder" onClick={() => setMobileMenuOpen(false)}>
              Report builder
              <span className="cart-count" aria-label={`${selectedCourses.length} selected courses`}>{selectedCourses.length}</span>
            </a>
          </nav>
          <div className="header-actions">
            <Link className="button button-outline button-small" to="/register">Sign up</Link>
            <Link className="button button-primary button-small" to="/login">Sign in <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-inner content-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> FACULTY OF SCIENCE <span className="eyebrow-separator">•</span> SMART ATTENDANCE SYSTEM</div>
              <h1>Attendance,<br /><em>without the paper.</em></h1>
              <p className="hero-description">
                Replace paper attendance sheets with digital class sessions. Instructors open a timed
                attendance window, students check in via dynamic QR codes, and verified records sync
                instantly to course dashboards.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary button-large" to="/register">Get started <ArrowRight size={17} /></Link>
                <a className="button button-quiet button-large" href="#portals">Explore portals <ArrowDown size={16} /></a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span>M</span><span>O</span><span>S</span><span><UsersRound size={15} /></span>
                </div>
                <span>Made for the rhythm of campus life</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Live attendance preview">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="session-preview">
                <div className="preview-topline">
                  <span className="live-status"><span /> SESSION LIVE</span>
                  <span className="secure-label"><LockKeyhole size={12} /> Verified</span>
                </div>
                <div className="preview-course">
                  <div>
                    <span className="preview-course-code">CS 301 · WEB BASICS</span>
                    <h2>Attendance check-in</h2>
                    <p>Dynamic code · refreshes automatically</p>
                  </div>
                  <div className="preview-icon"><ScanLine size={20} /></div>
                </div>
                <div className="preview-checkin">
                  <div className="preview-qr"><QrPattern /></div>
                  <div className="preview-expiry">
                    <span>CODE EXPIRES IN</span>
                    <strong>{formatTime(previewSeconds)}</strong>
                    <div className="expiry-track"><span style={{ width: `${(previewSeconds / 15) * 100}%` }} /></div>
                    <small><ShieldCheck size={13} /> Secure for this class only</small>
                  </div>
                </div>
                <div className="preview-footer"><span><UsersRound size={14} /> 28 checked in</span><span className="preview-live-pulse" /> Updating live</div>
              </div>
              <div className="digital-id-card">
                <div className="id-card-heading"><span>FACULTY OF SCIENCE</span><ShieldCheck size={16} /></div>
                <div className="id-card-body">
                  <div className="student-avatar"><UserRound size={27} /></div>
                  <div><strong>Youssef Adel</strong><span>Computer Science</span></div>
                </div>
                <div className="id-card-number"><span>STUDENT ID</span><strong>2024 · 03184</strong></div>
                <div className="id-verified"><CheckCircle2 size={13} /> VERIFIED STUDENT</div>
              </div>
              <div className="verified-float"><span><Check size={14} /></span> Check-in verified</div>
            </div>
          </div>
          <div className="hero-bottom-rule content-width"><span>SMARTER CLASSROOMS START HERE</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="portals-section section-pad" id="portals">
          <div className="content-width">
            <div className="section-heading heading-centered">
              <span className="section-kicker">ONE CAMPUS, EVERY ROLE</span>
              <h2>Navigate anywhere.</h2>
              <p>Choose your destination and explore UniTrack without signing in first.</p>
            </div>
            <div className="portal-grid">
              {portals.map((portal, index) => (
                <article className={`portal-card portal-${portal.tone}`} key={portal.link}>
                  <div className="portal-card-top"><span className="portal-icon"><portal.icon size={22} /></span><span className="portal-number">0{index + 1}</span></div>
                  <h3>{portal.title}</h3>
                  <p>{portal.description}</p>
                  <Link to={portal.link} className="text-link">{portal.action}<ArrowRight size={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="content-width features-layout">
            <div className="section-heading feature-intro">
              <span className="section-kicker">LESS PAPER. MORE PRESENCE.</span>
              <h2>Everything attendance should be.</h2>
              <p>From the first scan to the final report, every step is designed around the way your faculty teaches.</p>
              <a className="text-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-item" key={feature.title}>
                  <span className="feature-icon"><feature.icon size={20} /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="report-section section-pad" id="report-builder">
          <div className="content-width report-layout">
            <div className="report-intro">
              <span className="section-kicker">THE COURSE REPORT BUILDER</span>
              <h2>All your classes.<br /><em>One clear picture.</em></h2>
              <p>Pick the courses you want to review. UniTrack brings attendance records together in one combined report.</p>
              <div className="report-assurance"><ShieldCheck size={17} /> Clear, exportable, ready to share</div>
            </div>
            <div className="report-builder-card">
              <div className="builder-header">
                <div><span className="builder-overline">FACULTY OF SCIENCE</span><h3>Build a report</h3></div>
                <span className="builder-counter">{selectedCourses.length} selected</span>
              </div>
              <div className="course-list">
                {courses.map((course) => {
                  const selected = selectedCourses.includes(course.id);
                  return (
                    <div className={`course-row${selected ? ' course-selected' : ''}`} key={course.id}>
                      <div className="course-symbol"><BookOpen size={17} /></div>
                      <div className="course-row-copy"><strong>{course.code}</strong><span>{course.name}</span></div>
                      <div className="course-stat"><strong>{course.rate}</strong><span>attendance</span></div>
                      <button
                        type="button"
                        className={`course-toggle${selected ? ' toggle-selected' : ''}`}
                        onClick={() => toggleCourse(course.id)}
                        aria-pressed={selected}
                      >
                        {selected ? <><Check size={14} /> Added</> : 'Add to report'}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="builder-footer">
                <span><span className="builder-dot" /> {selectedCourses.length ? 'Ready to combine your courses' : 'Select courses to get started'}</span>
                <Link
                  className={`button button-primary builder-submit${selectedCourses.length === 0 ? ' button-disabled' : ''}`}
                  to="/reports-builder"
                  state={reportState}
                  aria-disabled={selectedCourses.length === 0}
                  onClick={(event) => {
                    if (selectedCourses.length === 0) event.preventDefault();
                  }}
                >
                  Generate combined report <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section section-pad" id="how-it-works">
          <div className="content-width">
            <div className="section-heading heading-centered">
              <span className="section-kicker">SEE IT IN ACTION</span>
              <h2>From open session to checked in.</h2>
              <p>A little preview of the instructor-to-student flow.</p>
            </div>
            <div className="flow-card">
              <div className="flow-panel instructor-panel">
                <div className="flow-panel-heading"><span className="flow-step">01</span><div><span>INSTRUCTOR VIEW</span><h3>Start the session</h3></div><div className="flow-heading-icon"><QrCode size={19} /></div></div>
                <p>Open a timed window for CS 301. Students can scan while the code is live.</p>
                <div className={`demo-code-area${demoOpen ? ' code-active' : ''}`}>
                  <div className="demo-code-icon">{demoOpen ? <QrPattern /> : <QrCode size={36} />}</div>
                  <div><strong>{demoOpen ? 'CS 301 · SESSION OPEN' : 'No active session'}</strong><span>{demoOpen ? `Code expires in ${formatTime(demoSeconds)}` : 'Your class is ready when you are'}</span></div>
                  {demoOpen && <span className="demo-live-dot" />}
                </div>
                <button className="button button-primary demo-open-button" type="button" onClick={startDemo}>
                  {demoOpen ? 'Restart 60s attendance window' : 'Open 60s attendance window'} <ArrowRight size={16} />
                </button>
              </div>
              <div className="flow-divider"><span><ArrowRight size={16} /></span></div>
              <div className="flow-panel student-panel">
                <div className="flow-panel-heading"><span className="flow-step">02</span><div><span>STUDENT VIEW</span><h3>Scan and you’re in</h3></div><div className="flow-heading-icon"><ScanLine size={19} /></div></div>
                <p>Scan the current class code. Your check-in is verified against your student ID.</p>
                <div className={`student-checkin-preview${checkedIn ? ' checkin-success' : ''}`}>
                  <div className="mini-avatar"><UserRound size={21} /></div>
                  <div className="checkin-student-copy"><strong>Youssef Adel</strong><span>Student · CS 301</span></div>
                  {checkedIn && <span className="checkin-tick"><Check size={14} /></span>}
                </div>
                <button
                  className="button button-outline demo-scan-button"
                  type="button"
                  disabled={!demoOpen}
                  onClick={() => {
                    if (checkedIn) setShowDuplicate(true);
                    else setCheckedIn(true);
                  }}
                >
                  <ScanLine size={16} /> {checkedIn ? 'Simulate another scan' : 'Simulate QR scan & check-in'}
                </button>
                {!demoOpen && <span className="scan-hint">Open an attendance window first</span>}
                {checkedIn && !showDuplicate && <div className="demo-feedback success-feedback"><CheckCircle2 size={16} /> Check-in verified · attendance recorded</div>}
                {showDuplicate && <div className="demo-feedback duplicate-feedback"><ShieldCheck size={16} /> Duplicate entry blocked · already checked in</div>}
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-section section-pad" id="reviews">
          <div className="content-width">
            <div className="review-heading-row">
              <div className="section-heading"><span className="section-kicker">BETTER CLASSROOM ROUTINES</span><h2>Students say it best.</h2></div>
              <div className="review-rating"><span aria-label="5 out of 5 stars">★★★★★</span><strong>4.9 / 5</strong><small>Student experience</small></div>
            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>“{review.quote}”</blockquote>
                  <div className="review-author"><span className="review-avatar">{review.name.charAt(0)}</span><div><strong>{review.name}</strong><span>{review.course}</span></div><CheckCircle2 className="review-verified" size={16} aria-label="Verified student" /></div>
                </article>
              ))}
            </div>
            <p className="review-note">Student feedback from Faculty of Science attendance sessions.</p>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="content-width final-cta">
            <div><span className="section-kicker">YOUR NEXT CLASS, MADE SIMPLE</span><h2>Ready to leave the paper behind?</h2><p>Take a look around UniTrack and see what a smoother class day feels like.</p></div>
            <div className="final-cta-actions"><Link className="button button-light" to="/register">Create an account <ArrowRight size={16} /></Link><Link className="final-signin" to="/login">Already have an account? Sign in</Link></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width footer-main">
          <div className="footer-brand"><Brand light /><p>A smarter attendance experience<br />for the Faculty of Science.</p></div>
          <div className="footer-links">
            <div><span>EXPLORE</span><Link to="/login">Sign in</Link><Link to="/register">Sign up</Link><Link to="/student-dashboard">Student portal</Link></div>
            <div><span>MORE</span><Link to="/instructor-dashboard">Instructor portal</Link><Link to="/admin-dashboard">Admin portal</Link><Link to="/reports-builder" state={reportState}>Report builder</Link></div>
          </div>
        </div>
        <div className="content-width footer-bottom"><span>© {new Date().getFullYear()} UniTrack · Faculty of Science</span><span>Built for a better class day <span className="footer-heart">✦</span></span></div>
      </footer>
    </div>
  );
}

export default LandingPage;
