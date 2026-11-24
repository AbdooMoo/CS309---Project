import React, { useState } from 'react';

export default function InstructorCourses({ courses, onAddCourse, onStartSession, onViewStudents }) {
  const [query, setQuery] = useState('');
  const filteredCourses = courses.filter((course) => (
    `${course.code} ${course.name}`.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <section className="view-section">
      <div className="view-toolbar">
        <p>{courses.length} courses this semester</p>
        <div className="toolbar-actions">
          <input
            className="search-input"
            type="search"
            aria-label="Search courses"
            placeholder="Search courses"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="button button-secondary" type="button" onClick={onAddCourse}>
            Add course
          </button>
        </div>
      </div>

      <div className="course-list">
        {filteredCourses.map((course) => (
          <article className="course-row" key={course.id}>
            <div className="course-code">{course.code}</div>
            <div className="course-details">
              <h2>{course.name}</h2>
              <p>{course.section} <span>·</span> {course.schedule}</p>
              <p>{course.hall}</p>
            </div>
            <div className="course-enrollment">
              <strong>{course.enrolledCount}</strong>
              <span>students</span>
            </div>
            <div className="row-actions">
              <button type="button" className="text-button" onClick={() => onViewStudents(course.code)}>
                Roster
              </button>
              <button type="button" className="button button-secondary" onClick={() => onStartSession(course.code)}>
                Take attendance
              </button>
            </div>
          </article>
        ))}
        {filteredCourses.length === 0 && <p className="empty-state">No courses match that search.</p>}
      </div>
    </section>
  );
}
