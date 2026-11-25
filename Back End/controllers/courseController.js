import Course from '../models/Course.js';

export async function getCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCourseById(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createCourse(req, res) {
  try {
    const { code, name, department, instructorName, instructorEmail, schedule } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: 'Course code and name are required.' });
    }

    const existing = await Course.findOne({ code: code.toUpperCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Course code already exists.' });
    }

    const course = await Course.create({
      code,
      name,
      department,
      instructorName,
      instructorEmail,
      schedule,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateCourse(req, res) {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    return res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
