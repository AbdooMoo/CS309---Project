import React, { useState, useEffect } from 'react';
import { usersApi, coursesApi, sessionsApi, attendanceApi } from '../../services/api';

const EMPTY_USER = {
  fullName: '',
  email: '',
  password: '',
  role: 'student',
  universityId: '',
  department: 'Computer Science',
  status: 'Active',
};

const EMPTY_COURSE = {
  code: '',
  name: '',
  department: 'Computer Science',
  instructorName: '',
  schedule: '',
};

const EMPTY_SESSION = {
  courseCode: '',
  courseName: '',
  instructorName: '',
  date: new Date().toISOString().slice(0, 10),
  startTime: '10:00 AM',
  qrToken: '',
  status: 'Live',
};

const EMPTY_RECORD = {
  sessionId: '',
  courseCode: '',
  studentId: '',
  studentName: '',
  studentEmail: '',
  status: 'Present',
  verificationMethod: 'Instructor update',
};

export default function AdminCrudManager({ onNotify }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [userForm, setUserForm] = useState(EMPTY_USER);
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE);
  const [sessionForm, setSessionForm] = useState(EMPTY_SESSION);
  const [recordForm, setRecordForm] = useState(EMPTY_RECORD);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [u, c, s, r] = await Promise.all([
        usersApi.getAll(),
        coursesApi.getAll(),
        sessionsApi.getAll(),
        attendanceApi.getAll(),
      ]);
      setUsers(u);
      setCourses(c);
      setSessions(s);
      setRecords(r);
    } catch (error) {
      if (onNotify) onNotify('error', error.message || 'Failed to load database records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const resetForms = () => {
    setEditingId(null);
    setShowForm(false);
    setUserForm(EMPTY_USER);
    setCourseForm(EMPTY_COURSE);
    setSessionForm(EMPTY_SESSION);
    setRecordForm(EMPTY_RECORD);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForms();
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await usersApi.update(editingId, userForm);
        setUsers((prev) => prev.map((item) => (item._id === editingId ? updated : item)));
        onNotify('success', `Updated user ${updated.fullName}.`);
      } else {
        const created = await usersApi.create({ ...userForm, isVerified: true });
        setUsers((prev) => [created, ...prev]);
        onNotify('success', `Created user ${created.fullName}.`);
      }
      resetForms();
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleDeleteUser = async (id, name) => {
    try {
      await usersApi.remove(id);
      setUsers((prev) => prev.filter((item) => item._id !== id));
      onNotify('info', `Deleted user ${name}.`);
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await coursesApi.update(editingId, courseForm);
        setCourses((prev) => prev.map((item) => (item._id === editingId ? updated : item)));
        onNotify('success', `Updated course ${updated.code}.`);
      } else {
        const created = await coursesApi.create(courseForm);
        setCourses((prev) => [created, ...prev]);
        onNotify('success', `Created course ${created.code}.`);
      }
      resetForms();
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleDeleteCourse = async (id, code) => {
    try {
      await coursesApi.remove(id);
      setCourses((prev) => prev.filter((item) => item._id !== id));
      onNotify('info', `Deleted course ${code}.`);
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleSaveSession = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await sessionsApi.update(editingId, sessionForm);
        setSessions((prev) => prev.map((item) => (item._id === editingId ? updated : item)));
        onNotify('success', `Updated session for ${updated.courseCode}.`);
      } else {
        const created = await sessionsApi.create(sessionForm);
        setSessions((prev) => [created, ...prev]);
        onNotify('success', `Created session for ${created.courseCode}.`);
      }
      resetForms();
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleDeleteSession = async (id, code) => {
    try {
      await sessionsApi.remove(id);
      setSessions((prev) => prev.filter((item) => item._id !== id));
      onNotify('info', `Deleted session for ${code}.`);
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await attendanceApi.update(editingId, recordForm);
        setRecords((prev) => prev.map((item) => (item._id === editingId ? updated : item)));
        onNotify('success', `Updated attendance record for ${updated.studentName}.`);
      } else {
        const created = await attendanceApi.create(recordForm);
        setRecords((prev) => [created, ...prev]);
        onNotify('success', `Recorded attendance for ${created.studentName}.`);
      }
      resetForms();
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  const handleDeleteRecord = async (id, studentName) => {
    try {
      await attendanceApi.remove(id);
      setRecords((prev) => prev.filter((item) => item._id !== id));
      onNotify('info', `Deleted attendance record for ${studentName}.`);
    } catch (error) {
      onNotify('error', error.message);
    }
  };

  return (
    <section className="profile-card admin-crud-section">
      <div className="card-header-bar admin-crud-header">
        <div>
          <h3 className="card-title">System Database Management (Full CRUD)</h3>
          <p className="card-subtitle">Manage all registered users, courses, sessions, and attendance records in MongoDB Atlas</p>
        </div>
        <div className="admin-crud-top-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={loadAll}>
            Refresh
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              resetForms();
              setShowForm(true);
            }}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="admin-crud-tabs">
        <button
          type="button"
          className={`crud-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          Users ({users.length})
        </button>
        <button
          type="button"
          className={`crud-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => handleTabChange('courses')}
        >
          Courses ({courses.length})
        </button>
        <button
          type="button"
          className={`crud-tab ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => handleTabChange('sessions')}
        >
          Sessions ({sessions.length})
        </button>
        <button
          type="button"
          className={`crud-tab ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => handleTabChange('attendance')}
        >
          Attendance ({records.length})
        </button>
      </div>

      {showForm && activeTab === 'users' && (
        <form className="crud-inline-form" onSubmit={handleSaveUser}>
          <div className="crud-form-grid">
            <input
              type="text"
              placeholder="Full Name"
              value={userForm.fullName}
              onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="University Email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder={editingId ? 'New Password (optional)' : 'Password'}
              value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              required={!editingId}
            />
            <select
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="University ID"
              value={userForm.universityId}
              onChange={(e) => setUserForm({ ...userForm, universityId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              value={userForm.department}
              onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
            />
          </div>
          <div className="crud-form-actions">
            <button type="button" className="btn btn-cancel btn-sm" onClick={resetForms}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? 'Save User' : 'Create User'}
            </button>
          </div>
        </form>
      )}

      {showForm && activeTab === 'courses' && (
        <form className="crud-inline-form" onSubmit={handleSaveCourse}>
          <div className="crud-form-grid">
            <input
              type="text"
              placeholder="Course Code (e.g. CS301)"
              value={courseForm.code}
              onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Course Name"
              value={courseForm.name}
              onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={courseForm.department}
              onChange={(e) => setCourseForm({ ...courseForm, department: e.target.value })}
            />
            <input
              type="text"
              placeholder="Instructor Name"
              value={courseForm.instructorName}
              onChange={(e) => setCourseForm({ ...courseForm, instructorName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Schedule (e.g. Sun 10:00 AM)"
              value={courseForm.schedule}
              onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
            />
          </div>
          <div className="crud-form-actions">
            <button type="button" className="btn btn-cancel btn-sm" onClick={resetForms}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? 'Save Course' : 'Create Course'}
            </button>
          </div>
        </form>
      )}

      {showForm && activeTab === 'sessions' && (
        <form className="crud-inline-form" onSubmit={handleSaveSession}>
          <div className="crud-form-grid">
            <input
              type="text"
              placeholder="Course Code"
              value={sessionForm.courseCode}
              onChange={(e) => setSessionForm({ ...sessionForm, courseCode: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Course Name"
              value={sessionForm.courseName}
              onChange={(e) => setSessionForm({ ...sessionForm, courseName: e.target.value })}
              required
            />
            <input
              type="date"
              value={sessionForm.date}
              onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Start Time"
              value={sessionForm.startTime}
              onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="QR Token"
              value={sessionForm.qrToken}
              onChange={(e) => setSessionForm({ ...sessionForm, qrToken: e.target.value })}
            />
            <select
              value={sessionForm.status}
              onChange={(e) => setSessionForm({ ...sessionForm, status: e.target.value })}
            >
              <option value="Live">Live</option>
              <option value="Closed">Closed</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
          <div className="crud-form-actions">
            <button type="button" className="btn btn-cancel btn-sm" onClick={resetForms}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? 'Save Session' : 'Create Session'}
            </button>
          </div>
        </form>
      )}

      {showForm && activeTab === 'attendance' && (
        <form className="crud-inline-form" onSubmit={handleSaveRecord}>
          <div className="crud-form-grid">
            <select
              value={recordForm.sessionId}
              onChange={(e) => {
                const selected = sessions.find((s) => s._id === e.target.value);
                setRecordForm({
                  ...recordForm,
                  sessionId: e.target.value,
                  courseCode: selected ? selected.courseCode : recordForm.courseCode,
                });
              }}
              required={!editingId}
            >
              <option value="">Select Session</option>
              {sessions.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.courseCode} - {s.date} ({s.startTime})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Course Code"
              value={recordForm.courseCode}
              onChange={(e) => setRecordForm({ ...recordForm, courseCode: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Student ID"
              value={recordForm.studentId}
              onChange={(e) => setRecordForm({ ...recordForm, studentId: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Student Name"
              value={recordForm.studentName}
              onChange={(e) => setRecordForm({ ...recordForm, studentName: e.target.value })}
              required
            />
            <select
              value={recordForm.status}
              onChange={(e) => setRecordForm({ ...recordForm, status: e.target.value })}
            >
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div className="crud-form-actions">
            <button type="button" className="btn btn-cancel btn-sm" onClick={resetForms}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? 'Save Record' : 'Create Record'}
            </button>
          </div>
        </form>
      )}

      <div className="crud-table-wrapper">
        {loading ? (
          <p className="crud-empty-state">Loading database records...</p>
        ) : activeTab === 'users' ? (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>ID</th>
                <th>Department</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.fullName}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`crud-badge role-${u.role}`}>{u.role}</span></td>
                  <td>{u.universityId || '-'}</td>
                  <td>{u.department || '-'}</td>
                  <td>{u.isVerified ? 'Yes' : 'Pending'}</td>
                  <td className="crud-row-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditingId(u._id);
                        setUserForm({
                          fullName: u.fullName || '',
                          email: u.email || '',
                          password: '',
                          role: u.role || 'student',
                          universityId: u.universityId || '',
                          department: u.department || '',
                          status: u.status || 'Active',
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => handleDeleteUser(u._id, u.fullName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : activeTab === 'courses' ? (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Department</th>
                <th>Instructor</th>
                <th>Schedule</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.code}</strong></td>
                  <td>{c.name}</td>
                  <td>{c.department}</td>
                  <td>{c.instructorName || '-'}</td>
                  <td>{c.schedule || '-'}</td>
                  <td className="crud-row-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditingId(c._id);
                        setCourseForm({
                          code: c.code || '',
                          name: c.name || '',
                          department: c.department || '',
                          instructorName: c.instructorName || '',
                          schedule: c.schedule || '',
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => handleDeleteCourse(c._id, c.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : activeTab === 'sessions' ? (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Time</th>
                <th>QR Token</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s._id}>
                  <td><strong>{s.courseCode}</strong> &bull; {s.courseName}</td>
                  <td>{s.date}</td>
                  <td>{s.startTime}</td>
                  <td><code>{s.qrToken || '-'}</code></td>
                  <td><span className="crud-badge">{s.status}</span></td>
                  <td className="crud-row-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditingId(s._id);
                        setSessionForm({
                          courseCode: s.courseCode || '',
                          courseName: s.courseName || '',
                          instructorName: s.instructorName || '',
                          date: s.date || '',
                          startTime: s.startTime || '',
                          qrToken: s.qrToken || '',
                          status: s.status || 'Live',
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => handleDeleteSession(s._id, s.courseCode)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td><strong>{r.courseCode}</strong></td>
                  <td>{r.studentId}</td>
                  <td>{r.studentName}</td>
                  <td><span className="crud-badge">{r.status}</span></td>
                  <td>{r.verificationMethod}</td>
                  <td className="crud-row-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditingId(r._id);
                        setRecordForm({
                          sessionId: r.sessionId || '',
                          courseCode: r.courseCode || '',
                          studentId: r.studentId || '',
                          studentName: r.studentName || '',
                          studentEmail: r.studentEmail || '',
                          status: r.status || 'Present',
                          verificationMethod: r.verificationMethod || 'Instructor update',
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => handleDeleteRecord(r._id, r.studentName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
