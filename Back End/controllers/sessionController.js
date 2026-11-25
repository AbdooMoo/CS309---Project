import Session from '../models/Session.js';

export async function getSessions(req, res) {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    return res.status(200).json(sessions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getSessionById(req, res) {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createSession(req, res) {
  try {
    const { courseCode, courseName, instructorName, date, startTime, qrToken, expiresAt, status } = req.body;

    if (!courseCode || !courseName || !date || !startTime) {
      return res.status(400).json({ message: 'Course code, name, date, and start time are required.' });
    }

    const session = await Session.create({
      courseCode,
      courseName,
      instructorName,
      date,
      startTime,
      qrToken,
      expiresAt,
      status,
    });

    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateSession(req, res) {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteSession(req, res) {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }
    return res.status(200).json({ message: 'Session deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
