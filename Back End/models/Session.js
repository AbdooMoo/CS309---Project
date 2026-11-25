import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    instructorName: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    qrToken: {
      type: String,
      default: '',
    },
    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Live', 'Closed', 'Scheduled'],
      default: 'Live',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
