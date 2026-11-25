import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Present', 'Late', 'Absent'],
      default: 'Present',
    },
    verificationMethod: {
      type: String,
      default: 'QR Scan',
    },
    checkedInAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AttendanceRecord', attendanceRecordSchema);
