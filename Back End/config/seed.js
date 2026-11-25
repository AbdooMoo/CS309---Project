import User from '../models/User.js';
import Course from '../models/Course.js';
import Session from '../models/Session.js';
import AttendanceRecord from '../models/AttendanceRecord.js';

export async function seedInitialData() {
  const defaultUsers = [
    {
      fullName: 'Dr. Tariq Mansour',
      email: 'admin.tariq@science.cu.edu.eg',
      password: 'Admin#2026',
      role: 'admin',
      universityId: 'ADM-2024-8841',
      department: 'Faculty Information Technology Center',
      phone: '+20 100 234 5678',
      jobTitle: 'Senior Systems & Database Administrator',
      status: 'Active',
      isVerified: true,
    },
    {
      fullName: 'Dr. Hany El-Sayed',
      email: 'dr.instructor@science.cu.edu.eg',
      password: 'Faculty#2026',
      role: 'instructor',
      universityId: 'INS-2021-310',
      department: 'Computer Science',
      phone: '+20 101 555 2190',
      jobTitle: 'Associate Professor',
      status: 'Active',
      isVerified: true,
    },
    {
      fullName: 'Mohamed Ahmed',
      email: 'mohamed.ahmed@science.cu.edu.eg',
      password: 'Student#2026',
      role: 'student',
      universityId: '20231187',
      department: 'Computer Science',
      academicYear: '3rd Year (Junior)',
      phone: '+20 123 456 7890',
      status: 'Active',
      isVerified: true,
    },
  ];

  for (const userData of defaultUsers) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      await User.create(userData);
    }
  }

  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    await Course.insertMany([
      {
        code: 'CS301',
        name: 'Web Basics',
        department: 'Computer Science',
        instructorName: 'Dr. Hany El-Sayed',
        instructorEmail: 'dr.instructor@science.cu.edu.eg',
        schedule: 'Sun · 10:00 AM',
        enrolledCount: 48,
        sessionsCount: 24,
      },
      {
        code: 'CS305',
        name: 'Database Systems',
        department: 'Computer Science',
        instructorName: 'Dr. Hany El-Sayed',
        instructorEmail: 'dr.instructor@science.cu.edu.eg',
        schedule: 'Tue · 12:00 PM',
        enrolledCount: 52,
        sessionsCount: 21,
      },
      {
        code: 'CS309',
        name: 'Web Development',
        department: 'Computer Science',
        instructorName: 'Dr. Hany El-Sayed',
        instructorEmail: 'dr.instructor@science.cu.edu.eg',
        schedule: 'Wed · 02:00 PM',
        enrolledCount: 45,
        sessionsCount: 18,
      },
    ]);
  }

  const sessionCount = await Session.countDocuments();
  if (sessionCount === 0) {
    const createdSessions = await Session.insertMany([
      {
        courseCode: 'CS301',
        courseName: 'Web Basics',
        instructorName: 'Dr. Hany El-Sayed',
        date: '2026-11-25',
        startTime: '10:00 AM',
        qrToken: 'UT-CS301-8492',
        status: 'Live',
      },
      {
        courseCode: 'CS305',
        courseName: 'Database Systems',
        instructorName: 'Dr. Hany El-Sayed',
        date: '2026-11-24',
        startTime: '12:00 PM',
        qrToken: 'UT-CS305-3120',
        status: 'Closed',
      },
    ]);

    const recordCount = await AttendanceRecord.countDocuments();
    if (recordCount === 0 && createdSessions.length > 0) {
      await AttendanceRecord.insertMany([
        {
          sessionId: createdSessions[0]._id,
          courseCode: 'CS301',
          studentId: '20231187',
          studentName: 'Mohamed Ahmed',
          studentEmail: 'mohamed.ahmed@science.cu.edu.eg',
          status: 'Present',
          verificationMethod: 'QR Scan',
        },
        {
          sessionId: createdSessions[1]._id,
          courseCode: 'CS305',
          studentId: '20231187',
          studentName: 'Mohamed Ahmed',
          studentEmail: 'mohamed.ahmed@science.cu.edu.eg',
          status: 'Late',
          verificationMethod: 'QR Scan',
        },
      ]);
    }
  }
}
