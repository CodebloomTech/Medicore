const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: Date,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  qualifications: [String],
  specialties: [String],
  yearsOfExperience: Number,
  biography: String,
  photo: String, // URL or base64
  availability: {
    days: [String], // e.g., ["Monday", "Wednesday"]
    startTime: String,
    endTime: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
