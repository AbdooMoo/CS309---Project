import React, { useState } from 'react';

export default function InstructorStudents({ students, courses, initialCourseFilter, onSelectStudent }) {
  const [courseFilter, setCourseFilter] = useState(initialCourseFilter);
  const [query, setQuery] = useState('');
  const visibleStudents = students.filter((student) => {
    const matchesCourse = courseFilter === 'All' || student.coursesEnrolled.includes(courseFilter);
    const matchesQuery = `${student.name} ${student.academicId} ${student.email}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCourse && matchesQuery;
  });

  return (
    <section className="view-section">
      <div className="view-toolbar">
        <p>{visibleStudents.length} students</p>
        <div className="toolbar-actions">
          <select
            className="search-input"
            aria-label="Filter students by course"
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
          >
            <option value="All">All courses</option>
            {courses.map((course) => <option key={course.id} value={course.code}>{course.code}</option>)}
          </select>
          <input
            className="search-input"
            type="search"
            aria-label="Search students"
            placeholder="Name, ID or email"
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
              <th>Academic ID</th>
              <th>Courses</th>
              <th>Attendance</th>
              <th>Sessions attended</th>
              <th><span className="sr-only">Details</span></th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <strong>{student.name}</strong>
                  <small className="table-subtext">{student.email}</small>
                </td>
                <td>{student.academicId}</td>
                <td>{student.coursesEnrolled.join(', ')}</td>
                <td>{student.overallAttendance}%</td>
                <td>{student.attendedSessions} / {student.totalSessions}</td>
                <td>
                  <button className="text-button" type="button" onClick={() => onSelectStudent(student)}>
                    View record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleStudents.length === 0 && <p className="empty-state">No students match those filters.</p>}
      </div>
    </section>
  );
}
