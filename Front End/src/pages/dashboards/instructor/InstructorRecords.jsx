import React, { useState } from 'react';

const statuses = ['Present', 'Late', 'Excused', 'Absent'];

export default function InstructorRecords({ records, courses, onUpdateRecordStatus }) {
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [query, setQuery] = useState('');
  const visibleRecords = records.filter((record) => {
    const matchesCourse = courseFilter === 'All' || record.courseCode === courseFilter;
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    const matchesQuery = `${record.studentName} ${record.academicId}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCourse && matchesStatus && matchesQuery;
  });

  return (
    <section className="view-section">
      <div className="view-toolbar">
        <p>Attendance entries by student and session</p>
        <div className="toolbar-actions">
          <select
            className="search-input"
            aria-label="Filter records by course"
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
          >
            <option value="All">All courses</option>
            {courses.map((course) => <option key={course.id} value={course.code}>{course.code}</option>)}
          </select>
          <select
            className="search-input"
            aria-label="Filter records by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
          <input
            className="search-input"
            type="search"
            aria-label="Search attendance records"
            placeholder="Student name or ID"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course / session</th>
              <th>Date</th>
              <th>Check-in</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => (
              <tr key={record.id}>
                <td>
                  <strong>{record.studentName}</strong>
                  <small className="table-subtext">{record.academicId}</small>
                </td>
                <td>{record.courseCode} <small className="table-subtext">{record.sessionType}</small></td>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>
                  <select
                    className="status-select"
                    aria-label={`Attendance status for ${record.studentName}`}
                    value={record.status}
                    onChange={(event) => onUpdateRecordStatus(record.id, event.target.value)}
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRecords.length === 0 && <p className="empty-state">No records match those filters.</p>}
      </div>
    </section>
  );
}
