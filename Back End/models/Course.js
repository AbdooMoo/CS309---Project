import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: 'Computer Science',
    },
    instructorName: {
      type: String,
      trim: true,
      default: '',
    },
    instructorEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    schedule: {
      type: String,
      trim: true,
      default: '',
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    sessionsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
