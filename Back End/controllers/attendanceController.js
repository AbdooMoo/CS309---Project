import AttendanceRecord from '../models/AttendanceRecord.js';

export async function getRecords(req, res) {
  try {
    const filter = {};
    if (req.query.courseCode) filter.courseCode = req.query.courseCode.toUpperCase();
    if (req.query.sessionId) filter.sessionId = req.query.sessionId;
    if (req.query.studentId) filter.studentId = req.query.studentId;

    const records = await AttendanceRecord.find(filter).sort({ checkedInAt: -1 });
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createRecord(req, res) {
  try {
    const { sessionId, courseCode, studentId, studentName, studentEmail, status, verificationMethod } = req.body;

    if (!sessionId || !courseCode || !studentId || !studentName) {
      return res.status(400).json({ message: 'Session, course code, student ID, and name are required.' });
    }

    const duplicate = await AttendanceRecord.findOne({ sessionId, studentId });
    if (duplicate) {
      return res.status(409).json({ message: 'Student has already checked in to this session.' });
    }

    const record = await AttendanceRecord.create({
      sessionId,
      courseCode,
      studentId,
      studentName,
      studentEmail,
      status,
      verificationMethod,
    });

    return res.status(201).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateRecord(req, res) {
  try {
    const record = await AttendanceRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteRecord(req, res) {
  try {
    const record = await AttendanceRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }
    return res.status(200).json({ message: 'Attendance record deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
